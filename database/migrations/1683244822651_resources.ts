import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'resources'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.integer('weight')
      table
        .integer('contract_id')
        .unsigned()
        .references('id')
        .inTable('contracts')
        .onDelete('CASCADE')

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
