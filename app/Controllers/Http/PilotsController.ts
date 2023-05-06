import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Pilot from 'App/Models/Pilot'
import { Planets } from './ContractsController'

export default class PilotsController {
  public async index({}: HttpContextContract) {
    return Pilot.all()
  }

  public async store(ctx: HttpContextContract) {
    const pilotSchema = schema.create({
      name: schema.string({ trim: true }),
      age: schema.number([rules.range(18, 150)]),
      credits: schema.number(),
      certification: schema.string({ trim: true }),
      location: schema.string({ trim: true }),
      ships: schema.array().members(
        schema.object().members({
          fuelCapacity: schema.number(),
          fuelLevel: schema.number(),
          weightCapacity: schema.number(),
        })
      ),
    })

    /**
     * Validate request body against the schema
     */

    const payload = await ctx.request.validate({ schema: pilotSchema })
    payload.ships.map((ship) => {
      if (ship.fuelLevel < 0 || ship.fuelLevel > ship.fuelCapacity) {
        throw new Error('Fuel level cannot be negative or greater than fuel capacity')
      }
    })

    if (Planets[payload.location] === undefined) {
      throw new Error('Invalid location, it should be a planet')
    }

    const { ships: shipData, ...pilotData } = payload

    const pilot = await Pilot.create(pilotData)
    const ship = await pilot.related('ships').createMany(shipData)
    await pilot.load('ships')

    return pilot
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
