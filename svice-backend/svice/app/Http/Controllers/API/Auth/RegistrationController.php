<?php

namespace App\Http\Controllers\API\Auth;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class RegistrationController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Registration Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    /**
     * Validate user details upon registration and save to database
     * 
     * @param Request $request
     * @return Response
     */
    public function register(Request $request) : Response 
    {
        // Validate user's credentials
        $validatedData = $request->validate([
            'first_name' => 'required',
            'middle_name' => '',
            'last_name' => 'required', 
            'email' => 'email|required|unique:users',
            'password' => 'required|confirmed'
        ]);

        // Hash user's password
        $validatedData['password'] = Hash::make($request->password);

        // Save to database
        $user = User::create($validatedData);

        return response(['user' => $user]);
    }
}
