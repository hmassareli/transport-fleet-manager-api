import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contract from 'App/Models/Contract'

export enum Planets {
  Andvari = 'Andvari',
  Demeter = 'Demeter',
  Aqua = 'Aqua',
  Calas = 'Calas',
}
export enum Resources {
  minerals = 'minerals',
  water = 'water',
  food = 'food',
}
export default class ContractsController {
  public async index({}: HttpContextContract) {
    return await Contract.findBy('status', 'idle')
  }

  public async create({}: HttpContextContract) {}

  public async store(ctx: HttpContextContract) {
    const { payload: resourcesData, ...contractData } = ctx.request.body()
    if (Planets[contractData.originPlanet] === undefined) {
      throw new Error('Invalid origin planet')
    }
    if (Planets[contractData.destinationPlanet] === undefined) {
      throw new Error('Invalid destination planet')
    }
    resourcesData.map((resource) => {
      if (Resources[resource.name.toLowerCase()] === undefined) {
        throw new Error('Invalid resource')
      }
    })
    const contract = await Contract.create(contractData)
    await contract.related('payload').createMany(resourcesData)
    await contract.load('payload')
    return { message: 'Contract created', data: contract }
  }

  public async show({ params }: HttpContextContract) {
    const contract = await Contract.findOrFail(params.id)

    return { data: contract }
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
