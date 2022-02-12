<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;
    public function users()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    public function location()
    {
        return $this->hasOne(Location::class, 'id');
    }

    public function category()
    {
        //cái này để khi lấy ra, $booking->user thì sẽ lấy được ra ai đã boooing luôn,
        return $this->belongsTo(category::class, 'category_id');
    }
}