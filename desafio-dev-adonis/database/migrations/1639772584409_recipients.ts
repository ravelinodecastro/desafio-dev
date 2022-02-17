import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Recipients extends BaseSchema {
  protected tableName = 'recipients'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('cpf')
      table.string('card')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
