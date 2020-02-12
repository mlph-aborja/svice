<?php


namespace App\Eloquent\Repositories;

use App\Eloquent\User;
use App\Eloquent\Models\Role;
use App\Contracts\Repositories\UserRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

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
    public function findAllAdmin(): Collection
    {
        $role = Role::where('name', Role::ROLE_NAME_ADMIN)->first();
        return $this->type::where('role_id', $role->id)->get();
    }

    /**
     * @inheritDoc
     */
    public function findAllCustomer(): Collection
    {
        $role = Role::where('name', Role::ROLE_NAME_CUSTOMER)->first();
        return $this->type::where('role_id', $role->id)->get();
    }
}
