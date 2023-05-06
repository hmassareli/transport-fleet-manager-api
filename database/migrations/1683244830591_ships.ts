import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'ships'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('fuel_capacity').notNullable()
      table.integer('fuel_level').notNullable()
      table.integer('weight_capacity').notNullable()
      table.integer('pilot_id').unsigned().references('id').inTable('pilots')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
