<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'user_id', 'post', 'file_name', 'comment_id', 'created_at', 'updated_at'];

    // protected function asDateTime($value)
    // {
    //     return parent::asDateTime($value)->format('d/m/y H:m');
    // }
}
