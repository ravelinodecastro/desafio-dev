<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{

    protected $fillable = ['type','amount','recipient_id','store_id','processed_at' ];

    protected $casts = [
        'processed_at' => 'datetime',
    ];

    public function store(){
        return $this->belongsTo('App\Models\Store');
    }

    public function recipient(){
        return $this->belongsTo('App\Models\Recipient');
    }
    protected $appends = ['description'];
    public function getDescriptionAttribute()
    {
        return $this->getDescription($this->attributes['type']);
    }
    private function getDescription($code) {
        $descriptions = [
            1=>'Débito',
            2=>'Boleto',
            3=>'Financiamento',
            4=>'Crédito',
            5=>'Recebimento Empréstimo',
            6=>'Vendas',
            7=>'Recebimento TED',
            8=>'Recebimento DOC',
            9=>'Aluguel'
        ];
        return $descriptions[$code];
    }

}