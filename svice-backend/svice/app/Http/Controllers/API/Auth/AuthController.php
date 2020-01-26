<?php

namespace App\Http\Controllers\API\Auth;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Auth Controller
    |--------------------------------------------------------------------------
    |
    | This controller gets authenticated user's details for the application.
    |
    */

    /**
     * Get Authenticated User's Details
     * 
     * @return Response
     */
    public function getAuthenticatedUserDetails() : Response
    {
        $user = Auth::user();

        return response(['authenticated_user' => $user]);
    }
}
