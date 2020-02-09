<?php


namespace App\Eloquent\Repositories;

use App\Contracts\Repositories\RoleRepositoryInterface;
use App\Eloquent\Models\Role;
use App\Eloquent\Models\Permission;

class RoleRepository extends BaseRepository implements RoleRepositoryInterface
{
    public function __construct()
    {
        parent::__construct(Role::class);
    }

    public function adminRole(): Role
    {
        return Role::where('name', Role::ROLE_NAME_ADMIN)->first();
    }

    public function customerRole(): Role
    {
        return Role::where('name', Role::ROLE_NAME_CUSTOMER)->first();
    }

    public function serviceProviderRole(): Role
    {
        return Role::where('name', Role::ROLE_NAME_SERVICE_PROVIDER)->first();
    }

    /**
     * @param $id
     * @param Permission $permission
     * @throws \Throwable
     */
    public function assignPermission($id, Permission $permission)
    {
        $this->model = $this->find($id);
        $this->model->permissions()->attach($permission->getPrimaryKey());
        $this->model->saveOrFail();
    }

    /**
     * @param $id
     * @param Permission $permission
     * @throws \Throwable
     */
    public function removePermission($id, Permission $permission)
    {
        $this->model = $this->find($id);
        $this->model->permissions()->detach($permission->getPrimaryKey());
        $this->model->saveOrFail();
    }

    /**
     * @param string $name
     * @return Role
     */
    public function findByName(string $name): ?Role
    {
         return $this->type::where([ "name" => $name ])->first();
    }
}
