<?php

namespace App\Http\Controllers\API;

use App\Contracts\Repositories\RoleRepositoryInterface;
use App\Contracts\Repositories\UserRepositoryInterface;
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

    const VALIDATION_RULES_USER_NEW = [
        'first_name' => 'required',
        'last_name' => 'required',
        'email' => 'email|required|unique:users',
        'password' => 'required|confirmed',
    ];

    /**
     * Parameter names that are ignored
     */
    const IGNORE_PARAMETERS = [
        "id",
        "email_verified_at",
        "created_at",
        "updated_at",
        "role_id",
        "deleted_at"
    ];

    public function __construct(
        UserRepositoryInterface $userRepository,
        RoleRepositoryInterface $roleRepository
    ) {
        $this->userRepository = $userRepository;
        $this->roleRepository = $roleRepository;
    }

    public function index(Request $request)
    {
        return new UserResources($this->userRepository->all());
    }

    /**
     * @param Request $request
     * @return UserResources
     */
    public function findAllAdmin(Request $request)
    {
        return new UserResources($this->userRepository->findAllAdmin());
    }

    /**
     * @param Request $request
     * @return UserResources
     */
    public function findAllCustomer(Request $request)
    {
        return new UserResources($this->userRepository->findAllCustomer());
    }

    /**
     * @param Request $request
     * @param int $userId
     * @return UserResource
     */
    public function show(Request $request, int $userId)
    {
        return new UserResource($this->userRepository->find($userId));
    }

    /**
     * @param Request $request
     * @param int $userId
     * @return UserResource
     */
    public function update(Request $request, int $userId)
    {
        $input = $this->ignoringParameters($request->validate(self::VALIDATION_RULES_USER_NEW));
        $input['password'] = Hash::make("password");

        $user = $this->userRepository->findAndUpdate($userId, $input);
        return new UserResource($user);
    }

    /**
     * @param Request $request
     * @param int $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $request, int $userId)
    {
        $this->userRepository->findAndDelete($userId);
        return response()->json(["message" => 'Successfully deleted'], HttpResponse::HTTP_OK);
    }

    /**
     * @param Request $request
     * @return UserResource
     */
    public function store(Request $request)
    {
        $input = $this->ignoringParameters($request->validate(self::VALIDATION_RULES_USER_NEW));
        $input['password'] = Hash::make("password");

        return new UserResource($this->userRepository->create($input));
    }

    protected function ignoringParameters($param)
    {
        foreach (self::IGNORE_PARAMETERS as $name) {
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
    public function assignRole(Request $request, $userId, $roleName)
    {
        $role = $this->roleRepository->findByName(strtoupper($roleName));

        return new UserResource($this->userRepository->assignRole($userId, $role));
    }
}
