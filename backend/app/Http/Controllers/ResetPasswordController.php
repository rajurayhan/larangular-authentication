<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPassword;
use DB;
use Carbon\Carbon;

class ResetPasswordController extends Controller
{
    public function resetPassword(Request $request)
    {
        if(!$this->validateEmail($request->email)){
            return $this->failedResponse();
        }

        $this->sendResetLink($request->email);
        return $this->successResponse();
    }

    public function validateEmail($email)
    {
        return !!User::where('email', $email)->first();
    }

    public function failedResponse()
    {
        $response = [
            'error' => 'User not found'
        ];

        return response()->json($response, Response::HTTP_NOT_FOUND);
    }

    public function successResponse()
    {
        $response = [
            'data' => 'Password Reset Link was sent to Email'
        ];

        return response()->json($response, Response::HTTP_OK);
    }

    public function sendResetLink($email)
    {
        $token = $this->createToken($email);
        Mail::to($email)->send(new ResetPassword($token));
    }

    public function createToken($email)
    {
        $oldToken = DB::table('password_resets')->where('email', $email)->first();
        if($oldToken){
            return $oldToken;
        }
        $token = str_random(60);
        $this->saveToken($token, $email);
        return $token;
    }

    public function saveToken($token, $email)
    {
        DB::table('password_resets')->insert(
            [
                'email' => $email,
                'token' => $token,
                'created_at' => Carbon::now()
            ]
        );
    }
}
