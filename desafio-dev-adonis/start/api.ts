import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {

    Route.get('transactions', "TransactionController.index");
    Route.post("transactions/upload", "TransactionController.upload");

}).prefix("api").namespace('App/Controllers/Http/Api')