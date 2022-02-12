<?php

namespace App\Http\Controllers; 

use Illuminate\Http\Request;
use App\Models\Booking;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();
        $bookings = Booking::with(['vehicle','vehicle.category'])->where('id', $user->id)->get();
        return response()->json($bookings);
    }

    public function GetBooking(Request $request, $id)
    {
        // $user = $request->user();
        $bookings = Booking::with(['vehicle','vehicle.category'])->where('id', $id)->get();
        return response()->json($bookings);
    }
}
