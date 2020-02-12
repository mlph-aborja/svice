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
    public function assignRole($id, Role $role): User
    {
        $this->model = $this->find($id);
        $role->users()->save($this->model);
        return $this->model;
    }

    /**
     * @inheritDoc
     */
    public function removeRole($id, Role $role): User
    {
        $this->model = $this->find($id);
        $role->users()->delete($this->model);
        return $this->model;
    }

    /**
     * @inheritDoc
     */
    public function findByEmail(string $email): User
    {
        return $this->type::where('email', $email)->first();
    }
}
