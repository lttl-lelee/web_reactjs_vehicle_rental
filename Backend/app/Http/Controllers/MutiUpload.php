<?php
namespace App\Http\Controllers; 

use Illuminate\Http\Request;
use App\Models\Booking;
use Illuminate\Support\Facades\Auth;

class MutiUpload extends Controller
{

    function saveImage(Request $request)
    {
        $desc = $request->input('desc');
        $filepath = $request->file('file')->store('products');

        DB::table('image_gallary')->insert([
            'img_path' =>$filepath,
            'description' => $desc
        ]);
        function dataList()
        {
            $res = DB::table('image_gallary')->get();
            return Response::json($res);

        }
    }
}