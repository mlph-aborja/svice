<?php

namespace App\Http\Controllers\API\Auth;

use App\Contracts\Repositories\RoleRepositoryInterface;
use App\Contracts\Repositories\UserRepositoryInterface;
use App\Eloquent\Models\User;
use App\Eloquent\Models\Role;
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

    protected $userRepository;

    protected $roleRepository;

    public function __construct( UserRepositoryInterface $userRepository,
                                 RoleRepositoryInterface $roleRepository )
    {
        $this->userRepository = $userRepository;
        $this->roleRepository = $roleRepository;
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
     * Validate user details upon registration and save to database
     *
     * @param Request $request
     * @param Role $role
     * @return Response
     */
    protected function register(Request $request, Role $role) : Response
    {
        $data = $this->validateParameters($request);
        $data['password'] = Hash::make($request->password);
        $data['role_id'] = $role->id;
        $user = $this->userRepository->create($data);
        return response(['user' => $user]); // TODO: Make a template for response format
    }

    protected function validateParameters (Request $request) {
        return $request->validate([
            'first_name' => 'required',
            'middle_name' => '',
            'last_name' => 'required',
            'email' => 'email|required|unique:users',
            'password' => 'required|confirmed'
        ]);
    }
}
