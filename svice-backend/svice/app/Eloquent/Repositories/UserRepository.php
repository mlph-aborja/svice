<?php


namespace App\Eloquent\Repositories;

use App\Eloquent\User;
use App\Eloquent\Models\Role;
use App\Exceptions\BadRequest;
use App\Contracts\Repositories\UserRepositoryInterface;

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

    /**
     * @inheritDoc
     */
    public function findByRoleAndEmail(Role $role, string $email): User
    {
        $this->model = $this->type::where('email', $email)->where('role_id', $role->id)->first();
        if ($this->model == null)
        {
            throw BadRequest::invalidRole($role->name);
        }
        return $this->model;
    }
}
