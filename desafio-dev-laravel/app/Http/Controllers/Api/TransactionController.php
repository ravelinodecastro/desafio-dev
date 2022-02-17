<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Http\Resources\TransactionCollection;
use App\Models\Store;
use App\Models\Recipient;
use Validator;
class TransactionController extends Controller
{

    public function index(Request $request)
    {
        $transactions = Transaction::with(['recipient','store'])->paginate(10);
        return new TransactionCollection($transactions);
        return response()->json(
            $transactions->paginate(10)
        );
    }
    public function upload(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'file'=> 'required|mimes:txt|max:1000'
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        $content =  file_get_contents($request->file('file'));
        $data = explode("\r\n",$content);
        $formatedData = [];
        for ($i=0; $i < count($data); $i++) { 
            $element = $data[$i];
            if (strlen($element) != 0){
                $year = substr($element,1, 4);
                $month = substr($element,5, 2);
                $day = substr($element,7, 2);
                $hour = substr($element,42, 2);
                $min = substr($element,44, 2);
                $sec = substr($element,46, 2);

                $recipientValues = [
                    "cpf"=>substr($element,19, 11),
                    "card"=>substr($element,30, 12)
                ];

                $storeValues = [
                    "owner_name"=> trim(str_replace('/ +(?= )/g', '',substr($element,48, 14))),
                    "name" => trim(str_replace('/ +(?= )/g', '',substr($element,62, 19)))
                ];

                $recipient = Recipient::firstOrCreate($recipientValues, $recipientValues);
                $store = Store::firstOrCreate($storeValues, $storeValues);

                $date = "$year-$month-$day $hour:$min:$sec";

                $transactionValues = [
                    'store_id'=> $store->id,
                    'recipient_id'=> $recipient->id,
                    'type'=> substr($element,0, 1),
                    'processed_at'=> $date,
                    'amount'=> $this->getNature(substr($element,9, 10) / 100.00, substr($element,0, 1)),
                ];
                array_push($formatedData, $transactionValues);

                $transaction = Transaction::create($transactionValues);
                $store->amount += $transaction->amount;
                $store->save();

            }
        }
        return ['message'=>"Loaded"];
       
    }
    private function getNature($amount, $type) {
        
        if (in_array($type, ['1', '4', '5', '6', '7', '8']) || $amount == 0) {
            return $amount;
        }
        else {
            return $amount * -1;
        }

    }
}
