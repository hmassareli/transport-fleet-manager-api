import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Pilot from 'App/Models/Pilot'
import Ship from 'App/Models/Ship'

export default class PilotsController {
  public async index({}: HttpContextContract) {
    return Pilot.all()
  }

  public async store(ctx: HttpContextContract) {
    const pilotSchema = schema.create({
      name: schema.string({ trim: true }),
      age: schema.number([rules.range(18, 150)]),
      credits: schema.number(),
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

    const { ship: shipData, ...pilotData } = payload
    const ship = await Ship.create(shipData)
    const pilot = await ship.related('pilot').create(pilotData)
    await pilot.load('ship')

    return pilot
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
