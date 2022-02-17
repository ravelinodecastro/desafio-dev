import { DateTime } from 'luxon'
import {
    BaseModel, column, hasMany,
    HasMany
} from '@ioc:Adonis/Lucid/Orm'
import Transaction from 'App/Models/Transaction'


export default class Recipient extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public cpf: string

    @column()
    public card: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @hasMany(() => Transaction)
    public transactions: HasMany<typeof Transaction>
}
