<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;

class BookingController extends Controller
{
    public function show()
    {
        $bookings = Booking::all(); //all là lấy ra tất cả booking , còn nhiều cái khác nữa, where, find,...
        return response()->json($bookings);
    }
}
