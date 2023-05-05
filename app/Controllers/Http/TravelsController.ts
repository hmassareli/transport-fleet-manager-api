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
const checkIfRouteIsValid = async (from: string, to: string) => {
  return travelOptions[from][to].isPossible
}
//Andvari	Demeter	Aqua	Calas are the possible planets
export default class TravelsController {
  public async handle({ request, params }: HttpContextContract) {
    const pilotId = params.id
    const payload = await request.validate({
      schema: schema.create({
        from: schema.string([rules.regex(/^(Andvari|Demeter|Aqua|Calas)$/)]),
        to: schema.string([rules.regex(/^(Andvari|Demeter|Aqua|Calas)$/)]),
        shipId: schema.number(),
      }),
    })
    if (await !checkIfRouteIsValid(payload.from, payload.to)) {
      return { message: 'This route is invalid!' }
    }
    const pilot = await Pilot.findOrFail(pilotId)
    const ship = await Ship.findOrFail(payload.shipId)

    if (ship.fuelLevel < travelOptions[payload.from][payload.to].fuelCost) {
      return { message: 'Not enough fuel!' }
    }
    pilot.location = payload.to
    ship.fuelLevel -= travelOptions[payload.from][payload.to].fuelCost
    await pilot.save()
    await ship.save()

    await pilot.load('ship')

    return {
      message: 'Travel completed!',
      data: {
        pilot,
      },
    }
  }
}
