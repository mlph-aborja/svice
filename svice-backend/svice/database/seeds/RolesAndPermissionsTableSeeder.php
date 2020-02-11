<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Delete all roles and permissions
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Role::truncate();
        Permission::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Create permission
        $viewAdminPage = Permission::create(['name' => 'VIEW_ADMIN_PAGE']);
        $viewCustomerPage = Permission::create(['name' => 'VIEW_CUSTOMER_PAGE']);

        // Create role
        $adminRole = Role::create(['name' => 'ADMIN']);
        $customerRole = Role::create(['name' => 'CUSTOMER']);

        // Assign permission to role
        $adminRole->givePermissionTo($viewAdminPage);
        $customerRole->givePermissionTo($viewCustomerPage);
    }
}
