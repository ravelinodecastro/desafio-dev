// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from '@ioc:Adonis/Lucid/Database';
import Transaction from 'App/Models/Transaction'
import Recipient from 'App/Models/Recipient';
import Store from 'App/Models/Store';
import { DateTime } from 'luxon';
const fs = require('fs');
export default class TransactionController {

    async index({ request }) {
        const page = request.input('page', 1)
        const limit = 20
        const transactions = await Database.from('transactions').paginate(page, limit)
        return transactions.toJSON()
    }
    async loadFile(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf8', function (err, data) {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }


    async upload({ request }) {
   
        const file = request.file('file', { extnames: ['txt'] });
        if (!file.isValid) {
            return file.errors
        }
        const content: any = await this.loadFile(file.tmpPath)
        const data = content.split("\r\n")
        let formatedData: any = []
        for (let index = 0; index < data.length; index++) {

            const element = data[index];
            if (element.length) {
                let year = element.substr(1, 4),
                    month = element.substr(5, 2),
                    day = element.substr(7, 2),
                    hour = element.substr(42, 2),
                    min = element.substr(44, 2),
                    sec = element.substr(46, 2);


                const recipientValues = {
                    cpf: element.substr(19, 11),
                    card: element.substr(30, 12),
                }
                const storeValues = {
                    owner_name: element.substr(48, 14).replace(/ +(?= )/g, '').trim(),
                    name: element.substr(62, 19).replace(/ +(?= )/g, '').trim()
                }

                const recipient = await Recipient.firstOrCreate(recipientValues, recipientValues)

                const store = await Store.firstOrCreate(storeValues, { ...storeValues, amount: 0 })

                // let date = `${year}/${month}/${day} ${hour}:${min}:${sec}`


                const transactionValues = {
                    store_id: store.id,
                    recipient_id: recipient.id,
                    type: element.substr(0, 1),
                    processed_at: DateTime.fromJSDate(new Date(year, month - 1, day, hour, min, sec)),
                    amount: this.getNature(element.substr(9, 10) / 100.00, element.substr(0, 1)),
                }
                formatedData.push(transactionValues)
                const transaction = await Transaction.create(transactionValues)
                store.amount += transaction.amount;
                await store.save()
            }

        }

        return { message: "Loaded" };
    }

    getNature(amount, type: any) {
        if (['1', '4', '5', '6', '7', '8'].includes(type) || amount == 0) {
            return amount
        }
        else {
            return amount * -1
        }

    }
    getDescription(code){
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
