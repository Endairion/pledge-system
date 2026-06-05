<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Branch;
use App\Models\Customer;
use App\Models\Pledge;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Test Pledge API Endpoints
 * 
 * Tests HTTP requests/responses for CRUD operations
 */
class PledgeApiTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;
    protected Branch $branch;
    protected Customer $customer;
    protected string $token;

    protected function setUp(): void
    {
        parent::setUp();

        $this->branch = Branch::factory()->create();
        $this->user = User::factory()->create(['branch_id' => $this->branch->id]);
        $this->customer = Customer::factory()->create(['branch_id' => $this->branch->id]);

        // Create auth token
        $this->token = $this->user->createToken('test-token')->plainTextToken;
    }

    /**
     * Test: GET /api/pledges returns all pledges
     */
    public function test_get_pledges_returns_all(): void
    {
        Pledge::factory(3)->create(['branch_id' => $this->branch->id]);

        $response = $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
            ->getJson('/api/pledges');

        $response->assertStatus(200);
        $response->assertJsonStructure(['data' => ['*' => ['id', 'pledge_no', 'status']]]);
        $this->assertCount(3, $response->json('data'));
    }

    /**
     * Test: GET /api/pledges/id returns single pledge
     */
    public function test_get_pledge_returns_single(): void
    {
        $pledge = Pledge::factory()->create(['branch_id' => $this->branch->id]);

        $response = $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
            ->getJson("/api/pledges/{$pledge->id}");

        $response->assertStatus(200);
        $response->assertJson([
            'data' => [
                'id' => $pledge->id,
                'pledge_no' => $pledge->pledge_no,
                'branch_id' => $this->branch->id,
                'customer_id' => $pledge->customer_id,
            ],
        ]);
    }

    /**
     * Test: POST /api/pledges creates new pledge
     */
    public function test_post_create_pledge(): void
    {
        $data = [
            'customer_id' => $this->customer->id,
            'loan_amount' => 5000,
            'item_value' => 10000,
            'duration_months' => 12,
        ];

        $response = $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
            ->postJson('/api/pledges', $data);

        $response->assertStatus(201);
        $response->assertJsonStructure(['data' => ['id', 'pledge_no', 'branch_id', 'status']]);
        $this->assertDatabaseHas('pledges', ['customer_id' => $this->customer->id]);
    }

    /**
     * Test: POST /api/pledges validates required fields
     */
    public function test_post_pledge_validates_required_fields(): void
    {
        $data = [
            // Missing customer_id, loan_amount, etc.
        ];

        $response = $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
            ->postJson('/api/pledges', $data);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['customer_id', 'loan_amount']);
    }

    /**
     * Test: PUT /api/pledges/id updates pledge
     */
    public function test_put_update_pledge(): void
    {
        $pledge = Pledge::factory()->create(['branch_id' => $this->branch->id, 'status' => 'active']);

        $response = $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
            ->putJson("/api/pledges/{$pledge->id}", ['status' => 'redeemed']);

        $response->assertStatus(200);
        $this->assertEquals('redeemed', $pledge->fresh()->status);
    }

    /**
     * Test: DELETE /api/pledges/id deletes pledge
     */
    public function test_delete_pledge(): void
    {
        $pledge = Pledge::factory()->create(['branch_id' => $this->branch->id]);
        $pledgeId = $pledge->id;

        $response = $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
            ->deleteJson("/api/pledges/{$pledgeId}");

        $response->assertStatus(204);
        $this->assertSoftDeleted('pledges', ['id' => $pledgeId]);
    }

    /**
     * Test: Unauthorized request returns 401
     */
    public function test_unauthorized_returns_401(): void
    {
        $response = $this->getJson('/api/pledges');

        $response->assertStatus(401);
    }

    /**
     * Test: Invalid token returns 401
     */
    public function test_invalid_token_returns_401(): void
    {
        $response = $this->withHeaders(['Authorization' => 'Bearer invalid-token'])
            ->getJson('/api/pledges');

        $response->assertStatus(401);
    }

    /**
     * Test: GET /api/pledges/id returns 404 for other branch
     */
    public function test_get_pledge_from_other_branch_returns_404(): void
    {
        $otherBranch = Branch::factory()->create();
        $pledge = Pledge::factory()->create(['branch_id' => $otherBranch->id]);

        $response = $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
            ->getJson("/api/pledges/{$pledge->id}");

        $response->assertStatus(404);
    }

    /**
     * Test: Response wraps data correctly
     */
    public function test_response_wraps_data_correctly(): void
    {
        $pledge = Pledge::factory()->create(['branch_id' => $this->branch->id]);

        $response = $this->withHeaders(['Authorization' => "Bearer {$this->token}"])
            ->getJson("/api/pledges/{$pledge->id}");

        $this->assertArrayHasKey('data', $response->json());
        $this->assertIsArray($response->json('data'));
    }
}
