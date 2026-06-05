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
                'name'                 => 'super_admin',
                'display_name'         => 'Super Admin',
                'can_access_store'     => true,
                'can_access_admin'     => true,
                'can_access_analytics' => true,
                'default_redirect'     => '/admin',
                'priority'             => 100,
            ],
            [
                'name'                 => 'branch_admin',
                'display_name'         => 'Branch Admin',
                'can_access_store'     => true,
                'can_access_admin'     => true,
                'can_access_analytics' => true,
                'default_redirect'     => '/admin',
                'priority'             => 80,
            ],
            [
                'name'                 => 'branch_staff',
                'display_name'         => 'Branch Staff',
                'can_access_store'     => true,
                'can_access_admin'     => false,
                'can_access_analytics' => false,
                'default_redirect'     => '/store',
                'priority'             => 50,
            ],
            [
                'name'                 => 'viewer',
                'display_name'         => 'Viewer',
                'can_access_store'     => false,
                'can_access_admin'     => false,
                'can_access_analytics' => true,
                'default_redirect'     => '/analytics',
                'priority'             => 10,
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
