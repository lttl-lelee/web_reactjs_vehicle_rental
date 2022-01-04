<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;
    protected $fillable = [
        'delivery_enable',
        'delivery_fee',
        'delivery_radius',
        'delivery_radius_free' ,
        'description' ,
        'discount_enable' ,
        'fuel_consumption' ,
        'fuel_type' ,
        'license_plates' ,
        'limit_distance' ,
        'month_discount' ,
        'now_price' ,
        'origin_price' ,
        'out_limit_fee' ,
        'week_discount',
        'yom' ,
        'category_id' ,
        'location_id',
        'user_id' ,
        'mainImg',
        'type',
    ];
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

    public function location_one()
    {
        return $this->belongsTo(location::class, 'location_id');
    }
}