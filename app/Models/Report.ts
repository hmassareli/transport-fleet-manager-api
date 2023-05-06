import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Contract from './Contract'
import Pilot from './Pilot'

export default class Report extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public type: string

  @column()
  public contractId: number

  @belongsTo(() => Contract)
  public contract: BelongsTo<typeof Contract>

  @belongsTo(() => Pilot)
  public pilot: BelongsTo<typeof Pilot>

  @column()
  public pilotId: number

  @column()
  public value: number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
