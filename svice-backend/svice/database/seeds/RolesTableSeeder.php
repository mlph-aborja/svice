<?php

use Illuminate\Database\Seeder;
use App\Role;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Delete all roles in the table
        Role::truncate();

        Role::create([
            'name' => 'ADMIN'
        ]);

        Role::create([
            'name' => 'CUSTOMER'
        ]);
    }
}
