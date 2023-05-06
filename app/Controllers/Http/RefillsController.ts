import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Pilot from 'App/Models/Pilot'
import Report from 'App/Models/Report'
import Ship from 'App/Models/Ship'
export default class RefillsController {
  public async index({}: HttpContextContract) {}

  public async handle({ request }: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        pilotId: schema.number([rules.exists({ table: 'pilots', column: 'id' })]),
        shipId: schema.number([rules.exists({ table: 'ships', column: 'id' })]),
        refills: schema.number(),
      }),
    })

    const pilot = await Pilot.findOrFail(payload.pilotId)
    const ship = await Ship.findOrFail(payload.shipId)

    if (pilot.credits < payload.refills * 7) {
      throw new Error('Not enough credits')
    }

    pilot.credits -= payload.refills * 7
    await pilot.save()
    ship.fuelLevel += payload.refills
    await ship.save()

    await Report.create({
      type: 'refill_bought',
      value: payload.refills * 7,
      pilotId: pilot.id,
    })

    return { message: 'Refill successful' }
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
