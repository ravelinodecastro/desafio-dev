<?php

use Illuminate\Support\Facades\Route;
use App\Models\Transaction;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $transactions = Transaction::with(['recipient','store'])->get();
    return view('welcome', compact('transactions'));
});
