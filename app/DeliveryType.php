<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DeliveryType extends Model
{
    protected $fillable = [
        'value'
    ];

    protected $table = 'delivery_type';
}
