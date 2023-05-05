import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
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

  @hasOne(() => Pilot)
  public pilot: HasOne<typeof Pilot>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
