<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recipient extends Model
{

    protected $fillable = ['cpf','card'];

    public function transactions(){
        return $this->hasMany('App\Models\Transaction');
    }

}