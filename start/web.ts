import Route from '@ioc:Adonis/Core/Route'
import Transaction from 'App/Models/Transaction'


Route.group(() => {

    Route.get('/', async ({ view }) => {

        const transactions = await Transaction
        .query()
        .preload('recipient')
        .preload('store')
        .orderBy('createdAt', 'desc').exec();

        console.log(transactions)
        return view.render('welcome', { transactions })
    })

}).namespace('App/Controllers/Http')