<?php

namespace App\Http\Controllers\API\Auth;

use App\Eloquent\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Exceptions\BadRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use App\Exceptions\UnauthorizedException;
use App\Contracts\Repositories\RoleRepositoryInterface;
use App\Contracts\Repositories\UserRepositoryInterface;

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
    protected $roleRepository;

    public function __construct(UserRepositoryInterface $userRepository,
                                RoleRepositoryInterface $roleRepository)
    {
        $this->userRepository = $userRepository;
        $this->roleRepository = $roleRepository;
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

        // Get Role
        $role = $this->roleRepository->findByName($request['role']);

        // Get Authenticated User
        $user = $this->userRepository->findByEmail($credentials['email']);

        if (!$user->hasAnyRole($role->name)) {
            throw BadRequest::invalidRole($role->name);
        }

        // Create access token
        $accessToken = $user->createToken('authToken')->accessToken;
        
        return response([
            'user' => $user,
            'roles' => [$role->name], 
            'access_token' => $accessToken
        ]);
    }

    /*
     * Logout
     * 
     */
    public function logout (Request $request)
    {
        Auth::logout();
    }

    /**
     * Get Authenticated User's Details
     *
     * @return UserResource
     */
    public function getAuthenticatedUserDetails()
    {
        return new UserResource(Auth::user());
    }
    
}
