<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\User;
use App\Models\Role;
use App\Models\Branch;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Authentication & Authorization Feature Tests
 * 
 * Tests the complete auth flow:
 * - Login with different users
 * - Token creation and storage
 * - Branch isolation
 * - Portal access control
 */
class AuthorizationFeatureTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Seed roles and branches
        $this->seed(\Database\Seeders\RolesSeeder::class);
        $this->seed(\Database\Seeders\BranchesSeeder::class);
        $this->seed(\Database\Seeders\UsersSeeder::class);
    }

    // ============================================================
    // LOGIN TESTS
    // ============================================================

    public function test_super_admin_can_login(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'username' => 'super_admin',
            'password' => 'password',
        ]);

        $response->assertStatus(200);
        $response->assertJsonPath('data.token', fn($token) => is_string($token) && strlen($token) > 10);
        $response->assertJsonPath('data.user.name', 'super_admin');
        $response->assertJsonPath('data.user.can_access_admin', true);
        $response->assertJsonPath('data.user.can_access_store', true);
        $response->assertJsonPath('data.user.can_access_analytics', true);
    }

    public function test_branch_admin_can_login(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'username' => 'arrahnu_admin',
            'password' => 'password',
        ]);

        $response->assertStatus(200);
        $response->assertJsonPath('data.user.name', 'arrahnu_admin');
        $response->assertJsonPath('data.user.can_access_admin', true);
        $response->assertJsonPath('data.user.can_access_store', true);
    }

    public function test_branch_staff_can_login(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'username' => 'arrahnu_staff_1',
            'password' => 'password',
        ]);

        $response->assertStatus(200);
        $response->assertJsonPath('data.user.name', 'arrahnu_staff_1');
        $response->assertJsonPath('data.user.can_access_store', true);
        $response->assertJsonPath('data.user.can_access_admin', false);
    }

    public function test_login_with_invalid_username(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'username' => 'nonexistent',
            'password' => 'password',
        ]);

        $response->assertStatus(422);
        $response->assertJsonPath('errors.username.0', 'The provided credentials are incorrect.');
    }

    public function test_login_with_wrong_password(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'username' => 'super_admin',
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(422);
        $response->assertJsonPath('errors.username.0', 'The provided credentials are incorrect.');
    }

    public function test_inactive_user_cannot_login(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'username' => 'pajak_staff_2_inactive',
            'password' => 'password',
        ]);

        $response->assertStatus(422);
        $response->assertJsonPath('errors.username.0', 'This account has been deactivated.');
    }

    // ============================================================
    // TOKEN TESTS
    // ============================================================

    public function test_token_created_in_database(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'username' => 'super_admin',
            'password' => 'password',
        ]);

        $user = User::where('name', 'super_admin')->first();
        
        // Check token exists in database
        $tokenCount = $user->tokens()->count();
        $this->assertGreaterThan(0, $tokenCount);
    }

    public function test_logout_deletes_token(): void
    {
        // Login
        $response = $this->postJson('/api/auth/login', [
            'username' => 'super_admin',
            'password' => 'password',
        ]);

        $user = User::where('name', 'super_admin')->first();
        $tokensBefore = $user->tokens()->count();

        // Logout with token
        $token = $response->json('data.token');
        $this->postJson('/api/auth/logout', [], [
            'Authorization' => "Bearer $token",
        ])->assertStatus(200);

        // Token should be deleted
        $tokensAfter = $user->tokens()->count();
        $this->assertEquals(0, $tokensAfter);
        $this->assertGreaterThan($tokensAfter, $tokensBefore);
    }

    // ============================================================
    // BRANCH ISOLATION TESTS
    // ============================================================

    public function test_arrahnu_staff_sees_only_arrahnu_branch(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'username' => 'arrahnu_staff_1',
            'password' => 'password',
        ]);

        $branch = $response->json('data.user.branch');
        $this->assertNotNull($branch);
        $this->assertEquals('ARRAHNU_KDE', $branch['code']);
    }

    public function test_pajak_staff_sees_only_pajak_branch(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'username' => 'pajak_staff_1',
            'password' => 'password',
        ]);

        $branch = $response->json('data.user.branch');
        $this->assertNotNull($branch);
        $this->assertEquals('PAJAK_MAIN', $branch['code']);
    }

    public function test_super_admin_has_no_branch_scope(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'username' => 'super_admin',
            'password' => 'password',
        ]);

        $branch = $response->json('data.user.branch');
        $this->assertNull($branch);
    }

    public function test_auditor_has_no_branch_scope(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'username' => 'auditor',
            'password' => 'password',
        ]);

        $branch = $response->json('data.user.branch');
        $this->assertNull($branch);
    }

    // ============================================================
    // PORTAL ACCESS TESTS
    // ============================================================

    public function test_super_admin_can_access_all_portals(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'username' => 'super_admin',
            'password' => 'password',
        ]);

        $user = $response->json('data.user');
        $this->assertTrue($user['can_access_store']);
        $this->assertTrue($user['can_access_admin']);
        $this->assertTrue($user['can_access_analytics']);
    }

    public function test_branch_admin_can_access_store_and_admin(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'username' => 'arrahnu_admin',
            'password' => 'password',
        ]);

        $user = $response->json('data.user');
        $this->assertTrue($user['can_access_store']);
        $this->assertTrue($user['can_access_admin']);
        $this->assertTrue($user['can_access_analytics']);
    }

    public function test_branch_staff_can_only_access_store(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'username' => 'arrahnu_staff_1',
            'password' => 'password',
        ]);

        $user = $response->json('data.user');
        $this->assertTrue($user['can_access_store']);
        $this->assertFalse($user['can_access_admin']);
        $this->assertFalse($user['can_access_analytics']);
    }

    public function test_viewer_can_only_access_analytics(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'username' => 'auditor',
            'password' => 'password',
        ]);

        $user = $response->json('data.user');
        $this->assertFalse($user['can_access_store']);
        $this->assertFalse($user['can_access_admin']);
        $this->assertTrue($user['can_access_analytics']);
    }

    public function test_multi_role_user_has_combined_access(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'username' => 'arrahnu_staff_2',
            'password' => 'password',
        ]);

        $user = $response->json('data.user');
        // Staff + Viewer roles
        $this->assertTrue($user['can_access_store']);
        $this->assertTrue($user['can_access_analytics']);
        $this->assertFalse($user['can_access_admin']);
    }

    // ============================================================
    // ME ENDPOINT TESTS
    // ============================================================

    public function test_me_endpoint_returns_user_with_roles(): void
    {
        $loginResponse = $this->postJson('/api/auth/login', [
            'username' => 'arrahnu_admin',
            'password' => 'password',
        ]);

        $token = $loginResponse->json('data.token');

        $response = $this->getJson('/api/auth/me', [
            'Authorization' => "Bearer $token",
        ]);

        $response->assertStatus(200);
        $response->assertJsonPath('data.name', 'arrahnu_admin');
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'email',
                'branch_id',
                'roles' => [
                    '*' => ['id', 'name', 'display_name'],
                ],
            ],
        ]);
    }

    public function test_me_endpoint_requires_auth(): void
    {
        $response = $this->getJson('/api/auth/me');
        $response->assertStatus(401);
    }

    public function test_me_endpoint_with_invalid_token(): void
    {
        $response = $this->getJson('/api/auth/me', [
            'Authorization' => 'Bearer invalid_token_here',
        ]);

        $response->assertStatus(401);
    }

    // ============================================================
    // ROLE TESTS
    // ============================================================

    public function test_user_has_correct_roles(): void
    {
        $superAdmin = User::where('name', 'super_admin')->first();
        $this->assertTrue($superAdmin->roles->contains('name', 'super_admin'));

        $arrahnu_admin = User::where('name', 'arrahnu_admin')->first();
        $this->assertTrue($arrahnu_admin->roles->contains('name', 'branch_admin'));

        $arrahnu_staff_1 = User::where('name', 'arrahnu_staff_1')->first();
        $this->assertTrue($arrahnu_staff_1->roles->contains('name', 'branch_staff'));
    }

    public function test_multi_role_user_has_both_roles(): void
    {
        $user = User::where('name', 'arrahnu_staff_2')->first();
        
        $roleNames = $user->roles->pluck('name')->toArray();
        $this->assertContains('branch_staff', $roleNames);
        $this->assertContains('viewer', $roleNames);
    }
}
