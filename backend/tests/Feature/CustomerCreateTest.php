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

class CustomerCreateTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private Branch $branch;

    protected function setUp(): void
    {
        parent::setUp();

        // Create a branch
        $this->branch = Branch::factory()->create();

        // Create a user with the branch
        $this->user = User::factory()->create([
            'branch_id' => $this->branch->id,
            'role_id' => 1,
        ]);
    }

    /**
     * Test creating a customer with required fields only
     */
    public function test_can_create_customer_with_required_fields()
    {
        $response = $this->actingAs($this->user)
            ->postJson('/api/customers', [
                'full_name' => 'Ahmad bin Ali',
                'id_type' => 'IC',
                'id_number' => '900101-01-1234',
                'gender' => 'M',
                'email' => 'ahmad@email.com',
            ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'customer_no',
                    'full_name',
                    'id_type',
                    'id_number',
                    'gender',
                    'email',
                    'branch_id',
                    'created_at',
                ],
                'message',
            ]);

        $this->assertDatabaseHas('customers', [
            'full_name' => 'Ahmad bin Ali',
            'id_number' => '900101-01-1234',
            'email' => 'ahmad@email.com',
            'gender' => 'M',
            'branch_id' => $this->branch->id,
        ]);
    }

    /**
     * Test creating a customer with all optional fields
     */
    public function test_can_create_customer_with_all_fields()
    {
        $title = CustomerTitle::factory()->create();
        $religion = Religion::factory()->create();
        $nationality = Nationality::factory()->create();
        $race = Race::factory()->create();
        $sourceOfGold = SourceOfGoldType::factory()->create();

        $response = $this->actingAs($this->user)
            ->postJson('/api/customers', [
                'title_id' => $title->id,
                'full_name' => 'Ahmad bin Ali',
                'id_type' => 'IC',
                'id_number' => '900101-01-1234',
                'date_of_birth' => '1990-01-01',
                'gender' => 'M',
                'race_id' => $race->id,
                'religion_id' => $religion->id,
                'nationality_id' => $nationality->id,
                'phone' => '0123456789',
                'email' => 'ahmad@email.com',
                'address' => '123 Main St, Kuala Lumpur',
                'occupation_type' => 'Salaried',
                'occupation_field' => 'Finance',
                'purpose_of_transaction' => 'Short-term personal financing',
                'source_of_gold_id' => $sourceOfGold->id,
            ]);

        $response->assertStatus(201)
            ->assertJsonPath('data.full_name', 'Ahmad bin Ali')
            ->assertJsonPath('data.phone', '0123456789')
            ->assertJsonPath('data.occupation_type', 'Salaried');

        $this->assertDatabaseHas('customers', [
            'title_id' => $title->id,
            'race_id' => $race->id,
            'religion_id' => $religion->id,
            'nationality_id' => $nationality->id,
            'source_of_gold_id' => $sourceOfGold->id,
        ]);
    }

    /**
     * Test validation errors for required fields
     */
    public function test_validation_fails_when_required_fields_missing()
    {
        // Missing full_name
        $response = $this->actingAs($this->user)
            ->postJson('/api/customers', [
                'id_type' => 'IC',
                'id_number' => '900101-01-1234',
                'gender' => 'M',
                'email' => 'ahmad@email.com',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors('full_name');

        // Missing gender
        $response = $this->actingAs($this->user)
            ->postJson('/api/customers', [
                'full_name' => 'Ahmad bin Ali',
                'id_type' => 'IC',
                'id_number' => '900101-01-1234',
                'email' => 'ahmad@email.com',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors('gender');

        // Missing email
        $response = $this->actingAs($this->user)
            ->postJson('/api/customers', [
                'full_name' => 'Ahmad bin Ali',
                'id_type' => 'IC',
                'id_number' => '900101-01-1234',
                'gender' => 'M',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors('email');
    }

    /**
     * Test unique validation for id_number and email
     */
    public function test_validation_fails_for_duplicate_id_number()
    {
        $customer = Customer::factory()->create([
            'id_number' => '900101-01-1234',
        ]);

        $response = $this->actingAs($this->user)
            ->postJson('/api/customers', [
                'full_name' => 'Ahmad bin Ali',
                'id_type' => 'IC',
                'id_number' => '900101-01-1234',
                'gender' => 'M',
                'email' => 'different@email.com',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors('id_number');
    }

    /**
     * Test unique validation for email
     */
    public function test_validation_fails_for_duplicate_email()
    {
        $customer = Customer::factory()->create([
            'email' => 'ahmad@email.com',
        ]);

        $response = $this->actingAs($this->user)
            ->postJson('/api/customers', [
                'full_name' => 'Ahmad bin Ali',
                'id_type' => 'IC',
                'id_number' => '900101-01-1235',
                'gender' => 'M',
                'email' => 'ahmad@email.com',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors('email');
    }

    /**
     * Test invalid id_type validation
     */
    public function test_validation_fails_for_invalid_id_type()
    {
        $response = $this->actingAs($this->user)
            ->postJson('/api/customers', [
                'full_name' => 'Ahmad bin Ali',
                'id_type' => 'InvalidType',
                'id_number' => '900101-01-1234',
                'gender' => 'M',
                'email' => 'ahmad@email.com',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors('id_type');
    }

    /**
     * Test invalid gender validation
     */
    public function test_validation_fails_for_invalid_gender()
    {
        $response = $this->actingAs($this->user)
            ->postJson('/api/customers', [
                'full_name' => 'Ahmad bin Ali',
                'id_type' => 'IC',
                'id_number' => '900101-01-1234',
                'gender' => 'X',
                'email' => 'ahmad@email.com',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors('gender');
    }

    /**
     * Test UUID validation for foreign keys
     */
    public function test_validation_fails_for_invalid_foreign_key_ids()
    {
        $response = $this->actingAs($this->user)
            ->postJson('/api/customers', [
                'full_name' => 'Ahmad bin Ali',
                'id_type' => 'IC',
                'id_number' => '900101-01-1234',
                'gender' => 'M',
                'email' => 'ahmad@email.com',
                'title_id' => 'invalid-uuid',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors('title_id');
    }

    /**
     * Test that customer is assigned to user's branch
     */
    public function test_customer_assigned_to_user_branch()
    {
        $response = $this->actingAs($this->user)
            ->postJson('/api/customers', [
                'full_name' => 'Ahmad bin Ali',
                'id_type' => 'IC',
                'id_number' => '900101-01-1234',
                'gender' => 'M',
                'email' => 'ahmad@email.com',
            ]);

        $response->assertStatus(201);

        $customer = Customer::where('email', 'ahmad@email.com')->first();
        $this->assertEquals($this->branch->id, $customer->branch_id);
    }

    /**
     * Test retrieving customer list with pagination
     */
    public function test_can_retrieve_customer_list()
    {
        Customer::factory()->count(20)->create([
            'branch_id' => $this->branch->id,
        ]);

        $response = $this->actingAs($this->user)
            ->getJson('/api/customers');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'data' => [
                        '*' => [
                            'id',
                            'full_name',
                            'email',
                            'branch',
                        ],
                    ],
                    'pagination',
                ],
            ]);
    }

    /**
     * Test customer relationships are loaded
     */
    public function test_customer_relationships_are_loaded()
    {
        $title = CustomerTitle::factory()->create();
        $religion = Religion::factory()->create();
        $nationality = Nationality::factory()->create();
        $race = Race::factory()->create();

        $response = $this->actingAs($this->user)
            ->postJson('/api/customers', [
                'title_id' => $title->id,
                'full_name' => 'Ahmad bin Ali',
                'id_type' => 'IC',
                'id_number' => '900101-01-1234',
                'gender' => 'M',
                'race_id' => $race->id,
                'religion_id' => $religion->id,
                'nationality_id' => $nationality->id,
                'email' => 'ahmad@email.com',
            ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'data' => [
                    'title',
                    'race',
                    'religion',
                    'nationality',
                    'branch',
                ],
            ]);
    }

    /**
     * Test unauthenticated request fails
     */
    public function test_unauthenticated_request_fails()
    {
        $response = $this->postJson('/api/customers', [
            'full_name' => 'Ahmad bin Ali',
            'id_type' => 'IC',
            'id_number' => '900101-01-1234',
            'gender' => 'M',
            'email' => 'ahmad@email.com',
        ]);

        $response->assertStatus(401);
    }
}
