<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    protected $fillable = [
        'md5', 'file_name'
    ];

    protected $table = 'photos';
}
