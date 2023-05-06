import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'reports'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enum('type', ['transportation_completed', 'refill_bought'])
      table.integer('value')
      table
        .integer('pilot_id')
        .unsigned()
        .references('id')
        .inTable('pilots')
        .onDelete('CASCADE')
        .nullable()
      table
        .integer('contract_id')
        .unsigned()
        .references('id')
        .inTable('contracts')
        .onDelete('CASCADE')
        .nullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
