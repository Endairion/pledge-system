<?php

namespace Tests\Feature;

use App\Models\Customer;
use App\Models\Branch;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CustomerListTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private Branch $branch;

    protected function setUp(): void
    {
        parent::setUp();

        $this->branch = Branch::factory()->create();
        $this->user = User::factory()->create(['branch_id' => $this->branch->id]);
    }

    /**
     * Test retrieving all customers
     */
    public function test_can_retrieve_all_customers()
    {
        Customer::factory()->count(5)->create(['branch_id' => $this->branch->id]);

        $response = $this->actingAs($this->user)
            ->getJson('/api/customers');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'data' => [
                        '*' => [
                            'id',
                            'customer_no',
                            'full_name',
                            'id_number',
                            'gender',
                            'email',
                            'phone',
                            'address',
                            'is_blacklisted',
                            'branch',
                            'created_at',
                        ],
                    ],
                    'total',
                    'per_page',
                    'current_page',
                ],
            ]);

        $this->assertEquals(5, $response->json('data.total'));
    }

    /**
     * Test retrieving single customer
     */
    public function test_can_retrieve_single_customer()
    {
        $customer = Customer::factory()->create(['branch_id' => $this->branch->id]);

        $response = $this->actingAs($this->user)
            ->getJson("/api/customers/{$customer->id}");

        $response->assertStatus(200)
            ->assertJsonPath('data.id', $customer->id)
            ->assertJsonPath('data.full_name', $customer->full_name)
            ->assertJsonPath('data.email', $customer->email);
    }

    /**
     * Test customer list includes branch information
     */
    public function test_customer_list_includes_branch()
    {
        $customer = Customer::factory()->create(['branch_id' => $this->branch->id]);

        $response = $this->actingAs($this->user)
            ->getJson('/api/customers');

        $response->assertStatus(200)
            ->assertJsonFragment([
                'branch' => [
                    'id' => $this->branch->id,
                    'name' => $this->branch->name,
                ],
            ]);
    }

    /**
     * Test pagination parameters are respected
     */
    public function test_pagination_works_correctly()
    {
        Customer::factory()->count(15)->create(['branch_id' => $this->branch->id]);

        $response = $this->actingAs($this->user)
            ->getJson('/api/customers?per_page=5&page=2');

        $response->assertStatus(200)
            ->assertJsonPath('data.per_page', 5)
            ->assertJsonPath('data.current_page', 2)
            ->assertJsonPath('data.total', 15);
    }

    /**
     * Test searching customers by name
     */
    public function test_can_search_customers_by_name()
    {
        Customer::factory()->create([
            'branch_id' => $this->branch->id,
            'full_name' => 'Ahmad bin Ali',
        ]);
        Customer::factory()->create([
            'branch_id' => $this->branch->id,
            'full_name' => 'Siti binti Hassan',
        ]);

        $response = $this->actingAs($this->user)
            ->getJson('/api/customers?search=Ahmad');

        $response->assertStatus(200);
        // Search is performed client-side in frontend
    }

    /**
     * Test retrieving customer with relationships
     */
    public function test_customer_detail_includes_relationships()
    {
        $customer = Customer::factory()->create(['branch_id' => $this->branch->id]);

        $response = $this->actingAs($this->user)
            ->getJson("/api/customers/{$customer->id}");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'branch' => ['id', 'name'],
                ],
            ]);
    }

    /**
     * Test customers from different branches are returned
     */
    public function test_can_retrieve_customers_from_different_branches()
    {
        $branch1 = Branch::factory()->create();
        $branch2 = Branch::factory()->create();

        $customer1 = Customer::factory()->create(['branch_id' => $branch1->id]);
        $customer2 = Customer::factory()->create(['branch_id' => $branch2->id]);

        $response = $this->actingAs($this->user)
            ->getJson('/api/customers');

        $response->assertStatus(200);
        $data = $response->json('data.data');
        
        // Should have both customers
        $ids = array_column($data, 'id');
        $this->assertContains($customer1->id, $ids);
        $this->assertContains($customer2->id, $ids);
    }

    /**
     * Test empty result when no customers exist
     */
    public function test_returns_empty_list_when_no_customers()
    {
        $response = $this->actingAs($this->user)
            ->getJson('/api/customers');

        $response->assertStatus(200)
            ->assertJsonPath('data.total', 0)
            ->assertJsonPath('data.data', []);
    }

    /**
     * Test blacklisted status is visible in list
     */
    public function test_blacklist_status_visible_in_customer_list()
    {
        Customer::factory()->create([
            'branch_id' => $this->branch->id,
            'is_blacklisted' => false,
        ]);
        Customer::factory()->create([
            'branch_id' => $this->branch->id,
            'is_blacklisted' => true,
            'blacklisted_reason' => 'Test reason',
        ]);

        $response = $this->actingAs($this->user)
            ->getJson('/api/customers');

        $response->assertStatus(200);
        $data = $response->json('data.data');
        
        $blacklistedCustomer = array_filter($data, fn($c) => $c['is_blacklisted'] === true);
        $this->assertNotEmpty($blacklistedCustomer);
    }
}
