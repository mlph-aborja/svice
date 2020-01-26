<?php

namespace App\Http\Controllers\API\Auth;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    /**
     * Validate login credentials and create access token.
     *
     * @param Request $request
     * @return Response
     */
    public function login(Request $request) : Response
    {
        // Check login credentials
        $loginData = $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);

        // Check if user has valid credentials
        if ($this->hasValidLoginCredentials($loginData)) 
        {
            return response(['message' => 'Invalid Credentials']);
        }
        
        // Get Authenticated User
        $user = User::where('email', $loginData['email'])->first();

        // Create access token
        $accessToken = $user->createToken('authToken')->accessToken;

        return response([
            'user' => $user,
            'access_token' => $accessToken
        ]);
    }

    /**
     * Validate login credentials
     * 
     * @param $loginData
     * @return bool
     */
    private function hasValidLoginCredentials($loginData) : bool 
    {
        return !auth()->attempt($loginData);
    }
}
