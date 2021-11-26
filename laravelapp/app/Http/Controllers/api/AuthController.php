<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request){
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);
            if ($validator->fails()) {
                return response()->json(['message' => $validator->errors(), 'status_code' => 401], 401);
            }

            $credentials = request(['email', 'password']);

            if (!Auth::attempt($credentials)){
                return response()->json([
                    'status_code' => 401,
                    'message' => 'Unauthorized!',
                ], 401);
            }

            $user = User::where('email', $request->email)->first();
            $token =  $user->createToken("api")->plainTextToken;
   
            return response()->json([
                'status_code' => 200,
                'message' => "Login success",
                'access_token' => $token,
                'token_type' => 'Bearer',
            ], 200);
        } catch (Exception $error) {
            return response()->json([
                'status_code' => 401,
                'message' => 'Error in Login',
                'error' => $error,
            ], 401);
        
        }
    }

    // http://127.0.0.1:8000/api/signup  đăng ký tài khoản
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fullName' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed',
        ]);
        // Hiểu đơn giản: required là bắt buộc phải có, string là chỉ cho phép kiểu chuỗi, 
        // 'required(bắt buộc có,  ko cho phép rỗng, trống)|string(kiểu chuỗi " " )|email(phải đúng định dạng email)|unique:users(1 tài khoản chỉ 1 email, kiểu như 1 người 1 số CMNN, ko cho phép trùng)
        //'required(bắt buộc có, ko cho phép rỗng, trống)|string|confirmed(để xác nhận lại pass, có giống với password đã nhập ko)
        // nó so sánh password và password_confirmation

        if ($validator->fails()) {
            // nếu name, email hoặc pass ko đúng yêu cầu, thì báo lỗi về cho client biết
            return response()->json(['message' => $validator->errors(), 'status_code' => 401]);
        }

        $data = $request->only('fullName', 'email', 'password');
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);
        return response()->json([
            'status_code' => 200,
            'message' => 'Created succsess'
        ], 201);
    }

    // http://127.0.0.1:8000/api/logout  để logout ở server
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logout Success'], 200);
    }

    // cái này lúc get  http://127.0.0.1:8000/api/show, thì nó sẽ hiển thị thông tin user đang đăng nhập
    public function show(Request $request)
    {
        $user = $request->user();
        return response()->json($user);
    }
}
