<?php

use Illuminate\Database\Seeder;
use App\Contracts\Repositories\RoleRepositoryInterface;
use App\Eloquent\Models\Role;

class RolesSeeder extends Seeder
{
    protected $roleRepository;

    public function __construct(RoleRepositoryInterface $roleRepository)
    {
        $this->roleRepository = $roleRepository;
    }

    public function run ()
    {
        $this->roleRepository->create([
            "name" => Role::ROLE_NAME_CUSTOMER
        ]);

        $this->roleRepository->create([
            "name" => Role::ROLE_NAME_ADMIN
        ]);

        $this->roleRepository->create([
            "name" => Role::ROLE_NAME_SERVICE_PROVIDER
        ]);
    }
}
