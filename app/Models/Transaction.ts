import { DateTime } from 'luxon'
import {
    BaseModel, column, belongsTo, BelongsTo, computed
} from '@ioc:Adonis/Lucid/Orm'

import Store from 'App/Models/Store'
import Recipient from 'App/Models/Recipient'


export default class Transaction extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public amount: number

    @column()
    public type: string

    @column()
    public store_id: number

    @column()
    public recipient_id: number


    @column.dateTime({ autoCreate: false })
    public processed_at: DateTime

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime


    @belongsTo(() => Store,{
        foreignKey: 'store_id',
    })
    public store: BelongsTo<typeof Store>

    @belongsTo(() => Recipient,{
        foreignKey: 'recipient_id',
    })
    public recipient: BelongsTo<typeof Recipient>

    @computed()
    public get description() {
        return this.getDescription(this.type)
    }

    getDescription(code) {
        const descriptions = {
            1: 'Débito',
            2: 'Boleto',
            3: 'Financiamento',
            4: 'Crédito',
            5: 'Recebimento Empréstimo',
            6: 'Vendas',
            7: 'Recebimento TED',
            8: 'Recebimento DOC',
            9: 'Aluguel'
        }
        return descriptions[code]
    }

}
