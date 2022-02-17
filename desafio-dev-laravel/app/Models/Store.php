<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Store extends Model
{

    protected $fillable = ['name','owner_name', 'amount'];

    public function transactions(){
        return $this->hasMany('App\Models\Transaction');
    }
  

}