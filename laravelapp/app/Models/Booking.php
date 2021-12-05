<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    public function user()
    {
        //cái này để khi lấy ra, $booking->user thì sẽ lấy được ra ai đã boooing luôn,
        return $this->belongsTo(User::class,'user_id');
    }
}
