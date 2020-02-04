<?php


namespace App\Eloquent\Repositories;


use App\Contracts\Repositories\RoleRepositoryInterface;
use App\Eloquent\Models\Role;

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
}
