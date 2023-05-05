import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Ship from './Ship'

export default class Pilot extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public certification: string

  @column()
  public age: number

  @column()
  public credits: number

  @column()
  public location: string

  @belongsTo(() => Ship)
  public ship: BelongsTo<typeof Ship>

  @column()
  public shipId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
