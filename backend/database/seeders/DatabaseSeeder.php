<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            LookupTablesSeeder::class,
            RolesSeeder::class,
            BranchesSeeder::class,  // Must run BEFORE UsersSeeder
            UsersSeeder::class,
        ]);
    }
}
