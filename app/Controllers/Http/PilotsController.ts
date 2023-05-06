import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Pilot from 'App/Models/Pilot'
import Ship from 'App/Models/Ship'
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
      ship: schema.object().members({
        fuelCapacity: schema.number(),
        fuelLevel: schema.number(),
        weightCapacity: schema.number(),
      }),
    })

    /**
     * Validate request body against the schema
     */

    const payload = await ctx.request.validate({ schema: pilotSchema })
    if (payload.ship.fuelLevel < 0 || payload.ship.fuelLevel > payload.ship.fuelCapacity) {
      throw new Error('Fuel level cannot be negative or greater than fuel capacity')
    }

    if (Planets[payload.location] === undefined) {
      throw new Error('Invalid location, it should be a planet')
    }

    const { ship: shipData, ...pilotData } = payload
    const ship = await Ship.create(shipData)
    const pilot = await ship.related('pilot').create(pilotData)
    await pilot.load('ship')

    return pilot
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
