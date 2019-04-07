<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'count', 'email', 'phone', 'name', 'address', 'delivery_id', 'payment_id', 'order_date', 'status_id'
    ];

    protected $table = 'orders';
}
