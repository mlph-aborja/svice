<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Resources\ServiceResource;
use App\Http\Resources\ServiceResources;
use App\Contracts\Repositories\ServiceRepositoryInterface;
use Symfony\Component\HttpFoundation\Response as HttpResponse;
use App\Http\Controllers\Controller;

class ServiceController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Service Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the service CRUD operations
    |
    */

    const VALIDATION_RULES_SERVICE = [
        'name' => 'required',
    ];

    /**
     * Parameter names that are ignored
     */
    const IGNORE_PARAMETERS = [
        "id",
        "created_at",
        "updated_at",
        "deleted_at"
    ];

    protected $serviceRepository;

    public function __construct(
        ServiceRepositoryInterface $serviceRepository
    ) {
        $this->serviceRepository = $serviceRepository;
    }

    /**
     * @param Request $request
     * @return ServiceResources
     */
    public function index(Request $request)
    {
        return new ServiceResources($this->serviceRepository->all());
    }

    /**
     * @param Request $request
     * @param int $serviceId
     * @return ServiceResource
     */
    public function show(Request $request, int $serviceId)
    {
        return new ServiceResource($this->serviceRepository->find($serviceId));
    }

    /**
     * @param Request $request
     * @param int $serviceId
     * @return ServiceResource
     */
    public function update(Request $request, int $serviceId)
    {
        $input = $this->ignoringParameters($request->validate(self::VALIDATION_RULES_SERVICE));
        $user = $this->serviceRepository->findAndUpdate($serviceId, $input);
        return new ServiceResource($user);
    }

    /**
     * @param Request $request
     * @param int $serviceId
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $request, int $serviceId)
    {
        $this->serviceRepository->findAndDelete($serviceId);
        return response()->json(["message" => 'Successfully deleted'], HttpResponse::HTTP_OK);
    }

    /**
     * @param Request $request
     * @return ServiceResource
     */
    public function store(Request $request)
    {
        $input = $this->ignoringParameters($request->validate(self::VALIDATION_RULES_SERVICE));
        return new ServiceResource($this->serviceRepository->create($input));
    }

    protected function ignoringParameters($param)
    {
        foreach (self::IGNORE_PARAMETERS as $name) {
            unset($param[$name]);
        }
        return $param;
    }
}
