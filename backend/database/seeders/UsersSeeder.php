<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

/**
 * Enhanced Users Seeder with multiple roles, branches, and compliance types
 * 
 * Creates comprehensive test users for development:
 * - Super Admin (all access, no branch scope)
 * - Branch Admins (per branch: arrahnu_kde, pajak)
 * - Branch Staff (per branch, store-only access)
 * - Viewers (analytics-only, multi-branch)
 * 
 * All users have password: "password"
 */
class UsersSeeder extends Seeder
{
    public function run(): void
    {
        // Get seeded roles
        $superAdminRole = Role::where('name', 'super_admin')->first();
        $branchAdminRole = Role::where('name', 'branch_admin')->first();
        $branchStaffRole = Role::where('name', 'branch_staff')->first();
        $viewerRole = Role::where('name', 'viewer')->first();

        // Get seeded branches
        $kde = Branch::where('code', 'KDE')->first();
        $pg = Branch::where('code', 'PG')->first();

        // ============================================================
        // 1. SUPER ADMIN (no branch scope, all access)
        // ============================================================
        $superAdmin = User::create([
            'name' => 'super_admin',
            'email' => 'super@system.local',
            'password' => Hash::make('password'),
            'branch_id' => null, // No branch scope
            'is_active' => true,
        ]);
        $superAdmin->roles()->attach($superAdminRole->id);

        // ============================================================
        // 2. ARRAHNU KDE BRANCH USERS
        // ============================================================

        // Branch Admin for KDE
        $kde_admin = User::create([
            'name' => 'kde_admin',
            'email' => 'admin@kde.local',
            'password' => Hash::make('password'),
            'branch_id' => $kde->id,
            'is_active' => true,
        ]);
        $kde_admin->roles()->attach($branchAdminRole->id);

        // Branch Staff 1 for KDE
        $kde_staff1 = User::create([
            'name' => 'kde_staff_1',
            'email' => 'staff1@kde.local',
            'password' => Hash::make('password'),
            'branch_id' => $kde->id,
            'is_active' => true,
        ]);
        $kde_staff1->roles()->attach($branchStaffRole->id);

        // Branch Staff 2 for KDE (with multiple roles)
        $kde_staff2 = User::create([
            'name' => 'kde_staff_2',
            'email' => 'staff2@kde.local',
            'password' => Hash::make('password'),
            'branch_id' => $kde->id,
            'is_active' => true,
        ]);
        // Multi-role: staff + viewer (can access store + analytics)
        $kde_staff2->roles()->attach([$branchStaffRole->id, $viewerRole->id]);

        // ============================================================
        // 3. PG BRANCH USERS
        // ============================================================

        // Branch Admin for PG
        $pg_admin = User::create([
            'name' => 'pg_admin',
            'email' => 'admin@pg.local',
            'password' => Hash::make('password'),
            'branch_id' => $pg->id,
            'is_active' => true,
        ]);
        $pg_admin->roles()->attach($branchAdminRole->id);

        // Branch Staff 1 for PG
        $pg_staff1 = User::create([
            'name' => 'pg_staff_1',
            'email' => 'staff1@pg.local',
            'password' => Hash::make('password'),
            'branch_id' => $pg->id,
            'is_active' => true,
        ]);
        $pg_staff1->roles()->attach($branchStaffRole->id);

        // Branch Staff 2 for PG (inactive - for testing deactivation)
        $pg_staff2 = User::create([
            'name' => 'pg_staff_2_inactive',
            'email' => 'staff2_inactive@pg.local',
            'password' => Hash::make('password'),
            'branch_id' => $pg->id,
            'is_active' => false, // Deactivated account
        ]);
        $pg_staff2->roles()->attach($branchStaffRole->id);

        // ============================================================
        // 4. CROSS-BRANCH USERS
        // ============================================================

        // Viewer with access to both branches (analytics-only)
        $auditor = User::create([
            'name' => 'auditor',
            'email' => 'auditor@system.local',
            'password' => Hash::make('password'),
            'branch_id' => null, // Not scoped to a branch
            'is_active' => true,
        ]);
        $auditor->roles()->attach($viewerRole->id);

        // Multi-branch manager (branch admin for kde)
        $multi_manager = User::create([
            'name' => 'multi_manager',
            'email' => 'manager@system.local',
            'password' => Hash::make('password'),
            'branch_id' => $kde->id, // Primary branch
            'is_active' => true,
        ]);
        $multi_manager->roles()->attach($branchAdminRole->id);

        // ============================================================
        // 5. DEV/TEST USERS
        // ============================================================

        // Generic test staff user
        $test_user = User::create([
            'name' => 'test_user',
            'email' => 'test@system.local',
            'password' => Hash::make('password'),
            'branch_id' => $kde->id,
            'is_active' => true,
        ]);
        $test_user->roles()->attach($branchStaffRole->id);
    }
}
