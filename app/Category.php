<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name', 'parent_id'
    ];

    protected $table = 'category';

    // public function product() {
    //     return $this->belongTo('App\Product', 'id', 'categ_id');
    // }

    // public function products() {
    //     return $this->hasMany('App\Product', 'categ_id', 'id');
    // }
}
