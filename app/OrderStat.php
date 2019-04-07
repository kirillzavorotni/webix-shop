<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderStat extends Model
{
    //

    protected $fillable = [
        'value'
    ];

    protected $table = 'order_status';
}
