import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Pilot from './Pilot'

export default class Ship extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fuelCapacity: number

  @column()
  public fuelLevel: number

  @column()
  public weightCapacity: number

  @belongsTo(() => Pilot)
  public pilot: BelongsTo<typeof Pilot>

  @column()
  public pilotId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
