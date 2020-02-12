<?php

namespace App\Http\Controllers\API\Auth;

use App\Contracts\Repositories\UserRepositoryInterface;
use App\Exceptions\UnauthorizedException;
use App\Http\Resources\UserResource;
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
    |  This controller handles authenticating users for the application
    |
    */

    protected $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Validate login credentials and create access token.
     *
     * @param Request $request
     * @return Response
     */
    public function login(Request $request) : Response
    {
        // Check login credentials
        $credentials = $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);

        // Check if user has invalid credentials
        if (!Auth::attempt($credentials))
        {
            throw UnauthorizedException::invalidCredentials();
        }

        // Get Authenticated User
        $user = $this->userRepository->findByEmail($credentials['email']);

        // Create access token
        $accessToken = $user->createToken('authToken')->accessToken;
        return response([
            'user' => $user,
            'access_token' => $accessToken
        ]);
    }

    /*
     * Logout
     */
    public function logout (Request $request)
    {
        Auth::logout();
    }

    /**
     * Get Authenticated User's Details
     *
     * @return
     */
    public function getAuthenticatedUserDetails()
    {
        return new UserResource(Auth::user());
    }
}
