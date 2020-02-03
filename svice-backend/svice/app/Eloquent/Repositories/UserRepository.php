<?php


namespace App\Eloquent\Repositories;

use App\Contracts\Repositories\UserRepositoryInterface;
use App\Eloquent\Models\Role;
use App\Eloquent\User;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    public function __construct()
    {
        parent::__construct(User::class);
    }

    /**
     * @inheritDoc
     */
    public function assignRole($id, Role $role): void
    {
        $this->model = $this->find($id);
        $this->model->role_id = $role->getPrimaryKey();
        $this->model->saveOrFail();
    }

    /**
     * @inheritDoc
     */
    public function removeRole($id, Role $role): void
    {
        // TODO: Implement removeRole() method.
    }
}
