<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vehicle;
use App\Models\Bike;

class VehicleController extends Controller
{
    public function show()
    {
        $vehicles = Vehicle::all();
        return response()->json($vehicles);
    }

    public function show_bikes()
    {
        $bikes = Bike::all();
        return response()->json($bikes);
    }
}
