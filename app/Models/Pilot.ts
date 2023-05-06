import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Contract from './Contract'
import Ship from './Ship'

export default class Pilot extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @hasMany(() => Contract)
  public contracts: HasMany<typeof Contract>

  @column()
  public certification: string

  @column()
  public age: number

  @column()
  public credits: number

  @column()
  public location: string

  @hasMany(() => Ship)
  public ships: HasMany<typeof Ship>

  @column()
  public shipId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
