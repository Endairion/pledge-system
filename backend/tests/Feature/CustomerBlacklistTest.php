<?php

namespace Tests\Feature;

use App\Models\Customer;
use App\Models\Branch;
use App\Models\User;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CustomerBlacklistTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private Branch $branch;
    private Customer $customer;

    protected function setUp(): void
    {
        parent::setUp();

        $this->branch = Branch::factory()->create();
        $this->user = User::factory()->create(['branch_id' => $this->branch->id]);
        $this->customer = Customer::factory()->create(['branch_id' => $this->branch->id]);
    }

    /**
     * Test blacklisting a customer with reason
     */
    public function test_can_blacklist_customer()
    {
        $response = $this->actingAs($this->user)
            ->putJson("/api/customers/{$this->customer->id}", [
                'is_blacklisted' => true,
                'blacklisted_reason' => 'Suspicious transactions detected',
            ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('customers', [
            'id' => $this->customer->id,
            'is_blacklisted' => true,
            'blacklisted_reason' => 'Suspicious transactions detected',
        ]);
    }

    /**
     * Test blacklist reason is required when blacklisting
     */
    public function test_blacklist_reason_included_in_response()
    {
        $reason = 'Customer requested account suspension';
        $response = $this->actingAs($this->user)
            ->putJson("/api/customers/{$this->customer->id}", [
                'is_blacklisted' => true,
                'blacklisted_reason' => $reason,
            ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.is_blacklisted', true)
            ->assertJsonPath('data.blacklisted_reason', $reason);
    }

    /**
     * Test updating other fields while blacklisting
     */
    public function test_can_update_fields_while_blacklisting()
    {
        $response = $this->actingAs($this->user)
            ->putJson("/api/customers/{$this->customer->id}", [
                'phone' => '0198765432',
                'email' => 'newemail@example.com',
                'is_blacklisted' => true,
                'blacklisted_reason' => 'Account compromised',
            ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('customers', [
            'id' => $this->customer->id,
            'phone' => '0198765432',
            'email' => 'newemail@example.com',
            'is_blacklisted' => true,
            'blacklisted_reason' => 'Account compromised',
        ]);
    }

    /**
     * Test blacklisted customer is returned in API responses
     */
    public function test_blacklist_status_visible_in_list()
    {
        $this->customer->update([
            'is_blacklisted' => true,
            'blacklisted_reason' => 'Test blacklist',
        ]);

        $response = $this->actingAs($this->user)
            ->getJson('/api/customers');

        $response->assertStatus(200)
            ->assertJsonFragment([
                'is_blacklisted' => true,
                'blacklisted_reason' => 'Test blacklist',
            ]);
    }

    /**
     * Test retrieving single blacklisted customer
     */
    public function test_can_retrieve_blacklisted_customer()
    {
        $reason = 'High-risk customer';
        $this->customer->update([
            'is_blacklisted' => true,
            'blacklisted_reason' => $reason,
        ]);

        $response = $this->actingAs($this->user)
            ->getJson("/api/customers/{$this->customer->id}");

        $response->assertStatus(200)
            ->assertJsonPath('data.is_blacklisted', true)
            ->assertJsonPath('data.blacklisted_reason', $reason);
    }
}
