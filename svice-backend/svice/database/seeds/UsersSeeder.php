<?php

use Illuminate\Database\Seeder;
use App\Contracts\Repositories\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;
use \App\Contracts\Repositories\RoleRepositoryInterface;
class UsersSeeder extends Seeder
{
    protected $userRepository;

    protected $roleRepository;

    public function __construct(UserRepositoryInterface $userRepository,
                                RoleRepositoryInterface $roleRepository)
    {
        $this->userRepository = $userRepository;
        $this->roleRepository = $roleRepository;
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->createAdminUser();
    }

    protected function createAdminUser ()
    {
        $adminRole = $this->roleRepository->adminRole();
        $this->userRepository->create(
            [
                'first_name' => "Admin",
                'last_name' => "Admin",
                'email' => "admin@svice.com",
                'role_id' => $adminRole->id,
                'email_verified_at' => now(),
                'password' => Hash::make("password")
            ]
        );
    }

    protected function createCustomerUser ()
    {
        $customerRole = $this->roleRepository->customerRole();
        $this->userRepository->create(
            [
                'first_name' => "Customer",
                'last_name' => "Customer",
                'email' => "customer@mail.com",
                'role_id' => $customerRole->id,
                'email_verified_at' => now(),
                'password' => Hash::make("password")
            ]
        );
    }

}
