import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pilot from 'App/Models/Pilot'
import Report from 'App/Models/Report'

export default class ReportsController {
  public async index({}: HttpContextContract) {
    const reports = await Report.query().orderBy('created_at', 'desc')
    const pilotName = (await Pilot.find(reports[0].pilotId))?.name
    const reportsArray = reports.reduce((acc, report) => {
      if (report.type === 'transportation_completed') {
        return [...acc, `Contract ${report.contractId} Description paid: -₭${report.value}`]
      }
      return [...acc, `${pilotName} bought fuel: +₭${report.value}`]
    }, [])
    return { data: reportsArray }
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
