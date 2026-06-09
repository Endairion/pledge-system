<?php

namespace Tests\Feature;

use App\Models\Customer;
use App\Models\Branch;
use App\Models\User;
use App\Models\CustomerTitle;
use App\Models\Religion;
use App\Models\Nationality;
use App\Models\Race;
use App\Models\SourceOfGoldType;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CustomerUpdateTest extends TestCase
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
     * Test updating customer basic fields
     */
    public function test_can_update_customer_basic_fields()
    {
        $response = $this->actingAs($this->user)
            ->putJson("/api/customers/{$this->customer->id}", [
                'full_name' => 'Updated Name',
                'phone' => '0112345678',
                'email' => 'updated@example.com',
                'address' => 'New Address, Kuala Lumpur',
            ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('customers', [
            'id' => $this->customer->id,
            'full_name' => 'Updated Name',
            'phone' => '0112345678',
            'email' => 'updated@example.com',
            'address' => 'New Address, Kuala Lumpur',
        ]);
    }

    /**
     * Test updating customer with optional fields
     */
    public function test_can_update_customer_optional_fields()
    {
        $title = CustomerTitle::factory()->create();
        $race = Race::factory()->create();
        $religion = Religion::factory()->create();
        $nationality = Nationality::factory()->create();
        $sourceOfGold = SourceOfGoldType::factory()->create();

        $response = $this->actingAs($this->user)
            ->putJson("/api/customers/{$this->customer->id}", [
                'title_id' => $title->id,
                'race_id' => $race->id,
                'religion_id' => $religion->id,
                'nationality_id' => $nationality->id,
                'source_of_gold_id' => $sourceOfGold->id,
                'occupation_type' => 'Engineer',
                'occupation_field' => 'Technology',
                'purpose_of_transaction' => 'Personal investment',
            ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('customers', [
            'id' => $this->customer->id,
            'title_id' => $title->id,
            'race_id' => $race->id,
            'religion_id' => $religion->id,
            'nationality_id' => $nationality->id,
            'source_of_gold_id' => $sourceOfGold->id,
            'occupation_type' => 'Engineer',
            'occupation_field' => 'Technology',
            'purpose_of_transaction' => 'Personal investment',
        ]);
    }

    /**
     * Test update response includes all customer fields
     */
    public function test_update_response_includes_all_fields()
    {
        $response = $this->actingAs($this->user)
            ->putJson("/api/customers/{$this->customer->id}", [
                'full_name' => 'Updated Name',
                'phone' => '0112345678',
            ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'customer_no',
                    'full_name',
                    'id_number',
                    'gender',
                    'phone',
                    'email',
                    'address',
                    'is_blacklisted',
                    'blacklisted_reason',
                    'created_at',
                ],
                'message',
            ]);
    }

    /**
     * Test updating non-existent customer returns 404
     */
    public function test_update_nonexistent_customer_returns_404()
    {
        $response = $this->actingAs($this->user)
            ->putJson('/api/customers/invalid-id', [
                'full_name' => 'Test Name',
            ]);

        $response->assertStatus(404);
    }

    /**
     * Test partial update (only some fields)
     */
    public function test_partial_update_preserves_other_fields()
    {
        $originalEmail = $this->customer->email;
        $originalPhone = $this->customer->phone;

        $response = $this->actingAs($this->user)
            ->putJson("/api/customers/{$this->customer->id}", [
                'full_name' => 'New Name',
            ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('customers', [
            'id' => $this->customer->id,
            'full_name' => 'New Name',
            'email' => $originalEmail,
            'phone' => $originalPhone,
        ]);
    }

    /**
     * Test updating with empty optional fields (null values)
     */
    public function test_can_clear_optional_fields()
    {
        $this->customer->update([
            'phone' => '0123456789',
            'address' => 'Old Address',
        ]);

        $response = $this->actingAs($this->user)
            ->putJson("/api/customers/{$this->customer->id}", [
                'phone' => null,
                'address' => null,
            ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('customers', [
            'id' => $this->customer->id,
            'phone' => null,
            'address' => null,
        ]);
    }
}
