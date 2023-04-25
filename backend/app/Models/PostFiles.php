<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostFiles extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'file_name', 'id_post'];
}
