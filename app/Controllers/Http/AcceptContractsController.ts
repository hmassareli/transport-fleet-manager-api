import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Contract from 'App/Models/Contract'
import Pilot from 'App/Models/Pilot'
import Resource from 'App/Models/Resource'
import Ship from 'App/Models/Ship'

//Andvari	Demeter	Aqua	Calas are the possible planets
export default class AcceptContractsController {
  public async handle({ request }: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        contractId: schema.number([rules.exists({ table: 'contracts', column: 'id' })]),
        pilotId: schema.number([rules.exists({ table: 'pilots', column: 'id' })]),
        shipId: schema.number([rules.exists({ table: 'ships', column: 'id' })]),
      }),
    })
    const contract = await Contract.findOrFail(payload.contractId)
    const pilot = await Pilot.findOrFail(payload.pilotId)
    const ship = await Ship.findOrFail(payload.shipId)

    const resources = await Resource.query().where('contractId', contract.id)

    const resourcesWeight = resources.reduce((acc, resource) => {
      return acc + resource.weight
    }, 0)

    if (ship.weightCapacity < resourcesWeight) {
      throw new Error('Your ship cannot carry these resources')
    }
    if (contract.status !== 'idle') {
      throw new Error('Contract already accepted')
    }
    contract.pilotId = payload.pilotId
    contract.status = pilot.location === contract.originPlanet ? 'in_progress' : 'accepted'
    await contract.save()

    return { message: 'Contract accepted', data: contract }
  }
}
