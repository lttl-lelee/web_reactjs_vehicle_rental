<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vehicle;
use App\Models\Bike;
use App\Models\Location;
use App\Models\Booking;
use App\Models\User;

class VehicleController extends Controller
{
    public function show()
    {
        $vehicles = Vehicle::with('location')->get();
        return response()->json($vehicles);
    }

    public function show_bikes()
    {
        $bikes = Bike::all();
        return response()->json($bikes);
    }

}
