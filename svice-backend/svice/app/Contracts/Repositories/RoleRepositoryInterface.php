<?php


namespace App\Contracts\Repositories;

use App\Eloquent\Models\Permission;
use App\Eloquent\Models\Role;

interface RoleRepositoryInterface extends BaseRepositoryInterface
{
    public function adminRole (): Role;

    public function customerRole (): Role;

    public function serviceProviderRole (): Role;

    public function assignPermission($id, Permission $permission);

    public function removePermission($id, Permission $permission);

    public function findByName (string $name): ?Role;
}
