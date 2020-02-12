<?php

namespace App\Http\Controllers\API\Auth;

use Illuminate\Http\Request;
use App\Eloquent\Models\Role;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use App\Contracts\Repositories\RoleRepositoryInterface;
use App\Contracts\Repositories\UserRepositoryInterface;

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

    protected $userRepository;

    protected $roleRepository;

    const VALIDATION_RULES_USER_REGISTER = [
        'first_name' => 'required',
        'middle_name' => '',
        'last_name' => 'required',
        'email' => 'email|required|unique:users',
        'password' => 'required|confirmed'
    ];

    public function __construct( UserRepositoryInterface $userRepository,
                                 RoleRepositoryInterface $roleRepository )
    {
        $this->userRepository = $userRepository;
        $this->roleRepository = $roleRepository;
    }

    /**
     * Registers customer
     * @param Request $request
     * @return Response
     */
    public function registerCustomer (Request $request): Response
    {
        return $this->register($request, $this->roleRepository->customerRole());
    }

    /**
     * Registers service provider
     * @param Request $request
     * @return Response
     */
    public function registerServiceProvider (Request $request): Response
    {
        return $this->register($request, $this->roleRepository->serviceProviderRole());
    }

    /**
     * @param Request $request
     * @return Response
     */
    public function registerAdmin (Request $request): Response
    {
        return $this->register($request, $this->roleRepository->adminRole());
    }

    /**
     * Validate user details upon registration and save to database
     *
     * @param Request $request
     * @param Role $role
     * @return Response
     */
    protected function register(Request $request, Role $role): Response
    {
        $data = $request->validate(self::VALIDATION_RULES_USER_REGISTER);
        $data['password'] = Hash::make($request->password);
        $user = $this->userRepository->create($data);
        $role->users()->save($user);
        return response(new UserResource($user));
    }
}
