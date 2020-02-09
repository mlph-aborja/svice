<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Role;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Delete all in users table
        User::truncate();

        $adminRole = Role::where('name', 'ADMIN')->first();

        $admin = User::create([
            'email' => 'admin@ideyatech.com',
            'first_name' => 'System',
            'last_name' => 'Administrator',
            'password' => Hash::make('password')
        ]);

        $admin->roles()->attach($adminRole);
    }
}
