import { DateTime } from 'luxon'
import {
    BaseModel, column, hasMany,
    HasMany
} from '@ioc:Adonis/Lucid/Orm'
import Transaction from 'App/Models/Transaction'


export default class Store extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column()
    public owner_name: string

    @column()
    public amount: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @hasMany(() => Transaction)
    public transactions: HasMany<typeof Transaction>
}
