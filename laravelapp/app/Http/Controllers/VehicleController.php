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
use Illuminate\Support\Str;
use App\Models\Image;

class VehicleController extends Controller
{
    public function car(Request $request)
    {
        $vehicles = Vehicle::with(['location', 'category', 'images'])->where('type', 'car')->get();
        return response()->json($vehicles);
    }

    public function bike(Request $request)
    {
        $vehicles = Vehicle::with(['location', 'category', 'images'])->where('type', 'bike')->get();
        return response()->json($vehicles);
    }

    public function driver(Request $request)
    {
        $vehicles = Vehicle::with(['location', 'category', 'images'])->where('type', 'driver')->get();
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

            $vehicle = new Vehicle();
            $vehicle->delivery_enable = $request->deliveryEnable;
            $vehicle->delivery_fee = $request->deliveryFee;
            $vehicle->delivery_radius = $request->deliveryRadius;
            $vehicle->delivery_radius_free =  $request->deliveryRadiusFree;
            $vehicle->description = $request->description ?: "null";
            $vehicle->discount_enable = $request->discountEnable;
            $vehicle->fuel_consumption =  $request->fuelConsumption;
            $vehicle->fuel_type = $request->fuelType;
            $vehicle->license_plates =  $request->licensePlates;
            $vehicle->limit_distance = $request->limitDistance;
            $vehicle->month_discount =  0;
            $vehicle->now_price =  0;
            $vehicle->origin_price = $request->originPrice;
            $vehicle->out_limit_fee = $request->outLimitFee;
            $vehicle->week_discount = 0;
            $vehicle->yom =  $request->yom;
            $vehicle->category_id =  $request->model['id'];
            $vehicle->location_id =  $location->id;
            $vehicle->user_id =  $user_id;
            // $vehicle->mainImg =  $request->mainImg;

            $vehicle->type =    $type;
            if($request->hasFile('mainImg')) {
                $file = $request->file('mainImg');
                $extension = $file->getClientOriginalExtension();
                $filename = Str::random(11) . '.' . $extension;
                $file->move('uploads/images/', $filename);
                $vehicle->mainImg = 'uploads/images/' . $filename;
            } else {
                echo "No file uploaded";
            }

            $vehicle->save();

            DB::commit();
            return response()->json([
                'status' => true,
                'vehicle' => $vehicle,
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
                'latitude' => '16.0868744650959',
                'longitude' => '108.21359295181',
                'province_code' => 0,
                'str_address' => $request->location['strAddress'],
                'street' => '',
                'ward_code' => 0,
                'user_id' => $user_id,
                'default_address' => '0',
                'name' => '',
            ]);

            $vehicle = new Vehicle();
            $vehicle->delivery_enable = $request->deliveryEnable;
            $vehicle->delivery_fee = $request->deliveryFee;
            $vehicle->delivery_radius = $request->deliveryRadius;
            $vehicle->delivery_radius_free =  $request->deliveryRadiusFree;
            $vehicle->description = $request->description ?: "null";
            $vehicle->discount_enable = $request->discountEnable;
            $vehicle->fuel_consumption =  $request->fuelConsumption;
            $vehicle->fuel_type = $request->fuelType;
            $vehicle->license_plates =  $request->licensePlates;
            $vehicle->limit_distance = $request->limitDistance;
            $vehicle->month_discount =  0;
            $vehicle->now_price =  0;
            $vehicle->origin_price = $request->originPrice;
            $vehicle->out_limit_fee = $request->outLimitFee;
            $vehicle->week_discount = 0;
            $vehicle->yom =  $request->yom;
            $vehicle->category_id =  $request->model['id'];
            $vehicle->location_id =  $location->id;
            $vehicle->user_id =  $user_id;
            $vehicle->mainImg =  $request->mainImg;
            $vehicle->type =    $type;
            $vehicle->save();

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
        $vehicles = Vehicle::with(['location', 'category', 'images'])->where('user_id', $user_id)->get();
        return response()->json($vehicles);
    }
    public function getVehicle(Request $request)
    {
        $id = $request->id;
        $vehicles = Vehicle::with(['users', 'location', 'category', 'images'])->where('id', $id)->get();
        if($vehicles){
            return response()->json($vehicles);
        }
        return response()->json(false);
    }

}
