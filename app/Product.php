<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 'category_id', 'image', 'rating', 'price'
    ];

    protected $table = 'product';

    // public function category() {
    //     return $this->hasOne('App\Category', 'id', 'categ_id');
    // }

    // public function manufacturer() {
    //     return $this->hasOne('App\Manufacturer', 'id', 'manuf_id');
    // }
}
