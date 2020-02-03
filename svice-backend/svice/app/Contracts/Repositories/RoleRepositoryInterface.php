<?php


namespace App\Contracts\Repositories;

use App\Eloquent\Models\Role;

interface RoleRepositoryInterface extends BaseRepositoryInterface
{
    public function adminRole (): Role;

    public function customerRole (): Role;
}
