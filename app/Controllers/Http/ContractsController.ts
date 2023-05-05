import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contract from 'App/Models/Contract'

export default class ContractsController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store(ctx: HttpContextContract) {
    const { payload: resourcesData, ...contractData } = ctx.request.body()
    const contract = await Contract.create(contractData)
    await contract.related('payload').createMany(resourcesData)
    await contract.load('payload')
    return contract
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
