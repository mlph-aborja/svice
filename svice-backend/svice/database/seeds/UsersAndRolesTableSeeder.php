<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\User;
use Illuminate\Support\Facades\Hash;

class UsersAndRolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Delete all user
        User::truncate();

        $adminUser = User::create([
            'email' => 'admin@ideyatech.com',
            'first_name' => 'System',
            'last_name' => 'Administrator',
            'password' => Hash::make('password')
        ]);

        $adminUser->assignRole(Role::findByName('ADMIN'));
    }
}
