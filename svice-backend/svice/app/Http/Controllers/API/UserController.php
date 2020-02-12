<?php

namespace App\Http\Controllers\API;

use App\Contracts\Repositories\RoleRepositoryInterface;
use App\Contracts\Repositories\UserRepositoryInterface;
use App\Exceptions\BadRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserResources;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class UserController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | User Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the user CRUD operations
    | Should be available only for admin users
    |
    */

    protected $userRepository;

    protected $roleRepository;

    const DEFAULT_PASSWORD = "password";

    const VALIDATION_RULES_USER_NEW = [
        'first_name' => 'required',
        'last_name' => 'required',
        'email' => 'email|required|unique:users'
    ];

    const VALIDATION_RULES_USER_EXISTING = [
        'email' => 'email|unique:users'
    ];

    /**
     * Parameter names that are ignored
     */
    const IGNORE_PARAMETERS = [
        "password",
        "password_confirmation",
        "id",
        "email_verified_at",
        "created_at",
        "updated_at",
        "role_id",
        "deleted_at"
    ];

    public function __construct(UserRepositoryInterface $userRepository,
                                RoleRepositoryInterface $roleRepository)
    {
        $this->userRepository = $userRepository;
        $this->roleRepository = $roleRepository;
    }

    public function index (Request $request)
    {
        return new UserResources($this->userRepository->all());
    }

    /**
     * @param Request $request
     * @param int $userId
     * @return UserResource
     */
    public function show (Request $request, int $userId)
    {
        return new UserResource($this->userRepository->find($userId));
    }

    /**
     * @param Request $request
     * @param int $userId
     * @return UserResource
     */
    public function update (Request $request, int $userId)
    {
        $input = $this->ignoringParameters($request->validate(self::VALIDATION_RULES_USER_EXISTING));
        $user = $this->userRepository->findAndUpdate($userId, $input);
        return new UserResource($user);
    }

    /**
     * @param Request $request
     * @param int $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy (Request $request, int $userId)
    {
        $this->userRepository->findAndDelete($userId);
        return response()->json(["message" => 'DELETED USER'], HttpResponse::HTTP_NO_CONTENT);
    }

    /**
     * @param Request $request
     * @return UserResource
     */
    public function store (Request $request)
    {
        $input = $this->ignoringParameters($request->validate(self::VALIDATION_RULES_USER_NEW));
        $input['password'] = Hash::make(self::DEFAULT_PASSWORD);

        // TODO: Create an EMAIL NOTIFICATION Event to reset password
        return new UserResource($this->userRepository->create($input));
    }

    protected function ignoringParameters ($param)
    {
        foreach (self::IGNORE_PARAMETERS as $name)
        {
            unset($param[$name]);
        }
        return $param;
    }

    /**
     * Assign role to user
     * @param Request $request
     * @param $userId
     * @param $roleName
     * @return \Illuminate\Http\JsonResponse
     */
    public function assignRole (Request $request, $userId, $roleName)
    {
        $role = $this->roleRepository->findByName(strtoupper($roleName));
        if (!$role) throw BadRequest::invalidRole($roleName);
        return new UserResource($this->userRepository->assignRole($userId, $role));
    }
}
