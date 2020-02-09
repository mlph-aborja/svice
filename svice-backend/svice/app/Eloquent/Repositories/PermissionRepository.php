<?php


namespace App\Eloquent\Repositories;

use App\Contracts\Repositories\PermissionRepositoryInterface;
use App\Eloquent\Models\Permission;

class PermissionRepository extends BaseRepository implements PermissionRepositoryInterface
{
    public function __construct()
    {
        parent::__construct(Permission::class);
    }
    /**
     * @param string $route
     * @param string $method
     * @return bool
     */
    public function isExist(string $route, string $method): bool
    {
        $permission = $this->type::where([
            "route" => $route,
            "method" => $method
        ])->get();
        return $permission->count() > 0;
    }
}
