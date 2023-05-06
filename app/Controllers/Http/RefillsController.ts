import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Pilot from 'App/Models/Pilot'
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
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
