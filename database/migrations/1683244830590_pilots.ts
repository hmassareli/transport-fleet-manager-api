import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'pilots'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.integer('age')
      table.integer('credits')
      table.enum('location', ['Andvari', 'Demeter', 'Aqua', 'Calas']).defaultTo('Andvari')
      table.string('certification')
      table.integer('ship_id').unsigned().references('id').inTable('ships')

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
