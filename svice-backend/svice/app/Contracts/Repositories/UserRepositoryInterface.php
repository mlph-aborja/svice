<?php

namespace App\Contracts\Repositories;

use App\Contracts\Repositories\BaseRepositoryInterface;
use App\Eloquent\Models\Role;
use App\Eloquent\User;

interface UserRepositoryInterface extends BaseRepositoryInterface
{
    /**
     * @param $id
     * @param Role $role
     */
    public function assignRole ($id, Role $role): void;

    /**
     * @param $id
     * @param Role $role
     */
    public function removeRole ($id, Role $role): void;
}
