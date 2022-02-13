<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ImageController;
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
    Route::get('/getMyBooking', [BookingController::class,'show']);
    Route::get('/getMyRequestBooking', [BookingController::class,'show']);
    //cần login mới cho xem, thì để trong này, ví dụ: xem profile, edit,..

    Route::post('/register/car', [VehicleController::class,'register_car']);
    Route::get('/MyVehicles', [VehicleController::class,'MyVehicles']);
    Route::post('/register/bike', [VehicleController::class,'register_bike']);
    // Upload Multiple Images
    Route::post('uploadMultipleFiles', [ImageController::class, 'uploadImages']);

    Route::get('/getVehicle', [VehicleController::class, 'getVehicle']);
});
Route::get('/getBooking/{id}', [BookingController::class, 'GetBooking']);
Route::get('/getVehicle', [VehicleController::class, 'getVehicle']);

Route::post('login', [AuthController::class,'login']);
Route::post('signup', [AuthController::class,'register']);

Route::get('/CarSelfDriver', [VehicleController::class,'car']);
Route::get('/CarsDriver', [VehicleController::class,'driver']);
// Route::get('/getBooking', [BookingController::class,'show']);
Route::get('/Bikes', [VehicleController::class,'bike']);

Route::get('/getNoti', function () {
    return  response()->json("");
});

Route::get('/getBrands', [VehicleController::class, 'getBrands']);




