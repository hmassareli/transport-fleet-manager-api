import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Resource from './Resource'

export default class Contract extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

  @column()
  public status: string

  @column()
  public pilotId: number

  @hasMany(() => Resource)
  public payload: HasMany<typeof Resource>

  @column()
  public originPlanet: string

  @column()
  public destinationPlanet: string

  @column()
  public value: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
