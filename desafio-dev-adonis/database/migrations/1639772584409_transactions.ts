import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Transactions extends BaseSchema {
  protected tableName = 'transactions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enum('type', ['1', '2', '3', '4', '5', '6', '7', '8', '9'])
      table.float('amount')
      table
        .integer('recipient_id')
        .unsigned()
        .references('recipients.id')
        .onDelete('CASCADE')
      table
        .integer('store_id')
        .unsigned()
        .references('stores.id')
        .onDelete('CASCADE')
      table.timestamp('processed_at', { useTz: true })
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
