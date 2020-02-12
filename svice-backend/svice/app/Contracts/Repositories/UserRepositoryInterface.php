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
    public function assignRole ($id, Role $role): User;

    /**
     * @param $id
     * @param Role $role
     */
    public function removeRole ($id, Role $role): User;

    /**
     * @param $email
     * @return User
     */
    public function findByEmail(string $email): User;

    /**
     * @param $role
     * @param $email
     * @return User
     */
    public function findByRoleAndEmail(Role $role, string $email): User;
}
