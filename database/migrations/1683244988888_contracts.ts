import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'contracts'

  //Andvari	Demeter	Aqua	Calas are the possible planets
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enum('status', ['idle', 'accepted', 'in_progress', 'completed']).defaultTo('idle')
      table.string('description')
      table.enum('origin_planet', ['Andvari', 'Demeter', 'Aqua', 'Calas'])
      table.string('destination_planet')
      table.integer('value')
      table
        .integer('pilot_id')
        .unsigned()
        .references('id')
        .inTable('pilots')
        .onDelete('CASCADE')
        .nullable()

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
