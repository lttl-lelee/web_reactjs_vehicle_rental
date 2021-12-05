<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\VehicleController; 
use App\Http\Controllers\BookingController; 
//đâ
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// api sẽ viết ở đây

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/getInfo', [AuthController::class,'show']);
    //cần login mới cho xem, thì để trong này, ví dụ: xem profile, edit,.. 
});


Route::post('login', [AuthController::class,'login']);
Route::post('signup', [AuthController::class,'register']);

Route::get('/getVehicle', [VehicleController::class,'show']);
Route::get('/getBooking', [BookingController::class,'show']);
Route::get('/Bikes', [VehicleController::class,'show_bikes']);
//xài ké controler của nhau thoải mái.

Route::get('/getNoti', function () {
    return  response()->json("");
});