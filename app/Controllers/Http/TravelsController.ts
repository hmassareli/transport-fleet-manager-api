import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Pilot from 'App/Models/Pilot'
import Ship from 'App/Models/Ship'

const travelOptions = {
  Andvari: {
    Andvari: {
      isPossible: false,
    },
    Demeter: {
      isPossible: false,
    },
    Aqua: {
      isPossible: true,
      fuelCost: 13,
    },
    Calas: {
      isPossible: true,
      fuelCost: 23,
    },
  },
  Demeter: {
    Andvari: {
      isPossible: false,
    },
    Demeter: {
      isPossible: false,
    },
    Aqua: {
      isPossible: true,
      fuelCost: 22,
    },
    Calas: {
      isPossible: true,
      fuelCost: 25,
    },
  },
  Aqua: {
    Andvari: {
      isPossible: false,
    },
    Demeter: {
      isPossible: true,
      fuelCost: 30,
    },
    Aqua: {
      isPossible: false,
    },
    Calas: {
      isPossible: true,
      fuelCost: 12,
    },
  },
  Calas: {
    Andvari: {
      isPossible: true,
      fuelCost: 20,
    },
    Demeter: {
      isPossible: true,
      fuelCost: 25,
    },
    Aqua: {
      isPossible: true,
      fuelCost: 15,
    },
    Calas: {
      isPossible: false,
    },
  },
}
const checkIfRouteIsValid = (from: string, to: string) => {
  return travelOptions[from][to].isPossible
}
//Andvari	Demeter	Aqua	Calas are the possible planets
export default class TravelsController {
  public async handle({ request, params }: HttpContextContract) {
    const pilotId = params.id
    const payload = await request.validate({
      schema: schema.create({
        to: schema.string([rules.regex(/^(Andvari|Demeter|Aqua|Calas)$/)]),
        shipId: schema.number(),
      }),
    })

    const pilot = await Pilot.findOrFail(pilotId)
    const ship = await Ship.findOrFail(payload.shipId)

    if (!checkIfRouteIsValid(pilot.location, payload.to)) {
      throw new Error('Invalid route')
    }
    if (ship.fuelLevel < travelOptions[pilot.location][payload.to].fuelCost) {
      throw new Error('Not enough fuel')
    }
    ship.fuelLevel = ship.fuelLevel - travelOptions[pilot.location][payload.to].fuelCost
    await ship.save()

    console.log(ship.fuelLevel, travelOptions[pilot.location][payload.to].fuelCost)

    await pilot
      .related('contracts')
      .query()
      .where('status', 'accepted')
      .where('origin_planet', payload.to)
      .update({ status: 'in_progress' })

    const inProgressContractsFromPilot = await pilot
      .related('contracts')
      .query()
      .where('status', 'in_progress')
      .where('destination_planet', payload.to)

    if (inProgressContractsFromPilot.length > 0) {
      const valueToAdd = inProgressContractsFromPilot.reduce((acc, curr) => {
        acc += curr.value
        return acc
      }, 0)
      pilot.credits += valueToAdd
      await pilot
        .related('contracts')
        .query()
        .where('status', 'in_progress')
        .where('destination_planet', payload.to)
        .update({ status: 'completed' })
    }
    console.log(ship.fuelLevel, travelOptions[pilot.location][payload.to].fuelCost)

    pilot.location = payload.to

    await pilot.save()

    await pilot.load('ship')

    return {
      message: 'Travel completed!',
      data: {
        pilot,
      },
    }
  }
}
