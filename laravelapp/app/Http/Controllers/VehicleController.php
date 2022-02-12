<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Vehicle;
use App\Models\Bike;
use App\Models\Location;
use App\Models\Booking;
use App\Models\User;
use App\Models\Brand;

class VehicleController extends Controller
{
    public function car(Request $request)
    {
        $vehicles = Vehicle::with(['location', 'category'])->where('type', 'car')->get();
        return response()->json($vehicles);
    }

    public function bike(Request $request)
    {
        $vehicles = Vehicle::with(['location', 'category'])->where('type', 'bike')->get();
        return response()->json($vehicles);
    }

    public function driver(Request $request)
    {
        $vehicles = Vehicle::with(['location', 'category'])->where('type', 'driver')->get();
        return response()->json($vehicles);
    }

    public function show_bikes()
    {
        $bikes = Bike::all();
        return response()->json($bikes);
    }

    public function getBrands()
    {
        $brands = Brand::with(['category'])->get();
        return  response()->json($brands);
    }

    public function register_car(Request $request)
    {
        $user_id = $request->user()->id;
        $type = "";
        if($request->carType == '1'){
            $type = 'car';
        }else{
            $type = 'bike';
        }
        DB::beginTransaction();
        try {
            $location = Location::create([
                'district_code' => 5555,
                'latitude' => '16.086874465095917',
                'longitude' => '108.21359295181608',
                'province_code' => 0,
                'str_address' =>$request->location['strAddress'],
                'street' => '',
                'ward_code' => 0,
                'user_id' => $user_id,
                'default_address' => '0',
                'name' => '',
            ]);

            $vehicle = Vehicle::create([
                'delivery_enable' =>  $request->deliveryEnable,
                'delivery_fee' => $request->deliveryFee,
                'delivery_radius' => $request->deliveryRadius,
                'delivery_radius_free' => $request->deliveryRadiusFree,
                'description' => $request->description ?: "null",
                'discount_enable' => $request->discountEnable,
                'fuel_consumption' => $request->fuelConsumption,
                'fuel_type' => $request->fuelType,
                'license_plates' => $request->licensePlates,
                'limit_distance' => $request->limitDistance,
                'month_discount' => 0,
                'now_price' => 0,
                'origin_price' => $request->originPrice,
                'out_limit_fee' => $request->outLimitFee,
                'week_discount' => 0,
                'yom' => $request->yom,
                'category_id' => $request->model['id'],
                'location_id' => $location->id,
                'user_id' => $user_id,
                'mainImg' => $request->mainImg,
                'type' => $type,
            ]);
            DB::commit();
            return response()->json([
                'status' => true,
                'message' => 'Thành công!',
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ]);
        }
        // $car = Car::create([
        //     'driver' => $request->driver,
        //     'Car_type' => $request->carType,
        // ]);

        return response()->json([
            'status' => false,
            'message' => 'Không thành công!',
        ]);
    }
    public function register_bike(Request $request)
    {
        $user_id = $request->user()->id;
        $type = "";
        if($request->carType == '1'){
            $type = 'car';
        }else{
            $type = 'bike';
        }
        DB::beginTransaction();
        try {
            $location = Location::create([
                'district_code' => 5555,
                'latitude' => '16.086874465095917',
                'longitude' => '108.21359295181608',
                'province_code' => 0,
                'str_address' =>$request->location['strAddress'],
                'street' => '',
                'ward_code' => 0,
                'user_id' => $user_id,
                'default_address' => '0',
                'name' => '',
            ]);

            $vehicle = Vehicle::create([
                'delivery_enable' =>  $request->deliveryEnable,
                'delivery_fee' => $request->deliveryFee,
                'delivery_radius' => $request->deliveryRadius,
                'delivery_radius_free' => $request->deliveryRadiusFree,
                'description' => $request->description ?: "null",
                'discount_enable' => $request->discountEnable,
                'fuel_consumption' => $request->fuelConsumption,
                'fuel_type' => $request->fuelType,
                'license_plates' => $request->licensePlates,
                'limit_distance' => $request->limitDistance,
                'month_discount' => 0,
                'now_price' => 0,
                'origin_price' => $request->originPrice,
                'out_limit_fee' => $request->outLimitFee,
                'week_discount' => 0,
                'yom' => $request->yom,
                'category_id' => $request->model['id'],
                'location_id' => $location->id,
                'user_id' => $user_id,
                'mainImg' => $request->mainImg,
                'type' => $type,
            ]);
            DB::commit();
            return response()->json([
                'status' => true,
                'message' => 'Thành công!',
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ]);
        }
        // $car = Car::create([
        //     'driver' => $request->driver,
        //     'Car_type' => $request->carType,
        // ]);

        return response()->json([
            'status' => false,
            'message' => 'Không thành công!',
        ]);
    }

    public function MyVehicles(Request $request)
    {
        $user_id = $request->user()->id;
        $vehicles = Vehicle::with(['location', 'category'])->where('user_id', $user_id)->get();
        return response()->json($vehicles);
    }
    public function getVehicle(Request $request)
    {
        $id = $request->id;
        $vehicles = Vehicle::with(['users', 'location', 'category'])->where('id', $id)->get();
        if($vehicles){
            return response()->json($vehicles);
        }
        return response()->json(false);
    }

}
