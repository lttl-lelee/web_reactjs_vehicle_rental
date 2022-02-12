<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $fillable = [
        'district_code',
        'latitude',
        'longitude',
        'province_code',
        'str_address',
        'street',
        'ward_code',
        'user_id',
        'default_address',
        'name',
    ];
    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }
}