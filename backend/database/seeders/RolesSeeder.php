<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            [
                'name'        => 'super_admin',
                'description' => 'Super Administrator with full access',
                'is_admin'    => true,
                'is_store'    => true,
                'is_analytics' => true,
            ],
            [
                'name'        => 'branch_admin',
                'description' => 'Branch Administrator',
                'is_admin'    => true,
                'is_store'    => true,
                'is_analytics' => true,
            ],
            [
                'name'        => 'branch_staff',
                'description' => 'Branch Staff Member',
                'is_admin'    => false,
                'is_store'    => true,
                'is_analytics' => false,
            ],
            [
                'name'        => 'viewer',
                'description' => 'Analytics Viewer',
                'is_admin'    => false,
                'is_store'    => false,
                'is_analytics' => true,
            ],
        ];

        foreach ($roles as $role) {
            Role::updateOrCreate(
                ['name' => $role['name']], 
                $role
            );
        }
    }
}
