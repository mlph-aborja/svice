<?php

use Illuminate\Database\Seeder;
use App\Contracts\Repositories\RoleRepositoryInterface;
use App\Contracts\Repositories\PermissionRepositoryInterface;

class PermissionsTableSeeder extends Seeder
{
    protected $roleRepository;

    protected $permissionRepository;

    public function __construct(RoleRepositoryInterface $roleRepository,
                                PermissionRepositoryInterface $permissionRepository)
    {
        $this->roleRepository = $roleRepository;
        $this->permissionRepository = $permissionRepository;
    }

    /**
     * Set permission to
     *
     * @return void
     */
    public function run()
    {
        $routes = collect(\Route::getRoutes())->filter(function ($route) {
            return $route->getAction()["prefix"] == "api";
        });
        $permission_ids = [];
        foreach ($routes as $key => $route)
        {
            foreach ($route->methods() as $method)
            {
                if(!$this->permissionRepository->isExist($route->uri(), $method))
                {
                    $permission = $this->permissionRepository->create([
                        "route" => $route->uri(),
                        "method" => $method
                    ]);
                    $permission_ids[] = $permission->id;
                }
            }
        }
        // scope
        $admin = $this->roleRepository->adminRole();
        $admin->permissions()->sync($permission_ids);
    }
}
