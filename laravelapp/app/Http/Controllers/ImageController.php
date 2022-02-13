<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use DB;
class ImageController extends Controller
{
    public function uploadImages(Request $request)
    {
        if ($request->hasFile('files')) {
            try {
                $user_id = $request->user()->id;
                $vehicle = DB::table('vehicles')->latest('created_at')->where('user_id', $user_id)->first();
                foreach($request->file('files') as $image_file) {
                    $images = new Image();
                    $file = $image_file;
                    $extension = $file->getClientOriginalExtension();
                    $fileName = Str::random(4) . date('H_i_s') .'.'. $extension;
                    $file->move(public_path('uploads/images/'), $fileName);
                    $images->main_img = 0;
                    $images->link = 'uploads/images/' . $fileName;
                    $images->vehicle_id = $vehicle->id;
                    $images->save();
                }
                return response()->json([
                    'status' => true,
                    'message' => 'Thành công!',
                ]);
            } catch (Exception $e) {
                return response()->json([
                    'status' => false,
                    'message' => $e->getMessage(),
                ]);
            }
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thành công!',
            ]);
        }
    }
}
