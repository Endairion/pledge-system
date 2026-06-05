<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Models\Branch;
use App\Models\Customer;
use App\Models\Pledge;
use App\Models\User;
use App\Services\PledgeService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Test PledgeService
 * 
 * Tests business logic: CRUD, calculations, branch isolation
 */
class PledgeServiceTest extends TestCase
{
    use RefreshDatabase;

    protected PledgeService $service;
    protected User $user;
    protected Branch $branch;
    protected Customer $customer;

    protected function setUp(): void
    {
        parent::setUp();

        $this->service = app(PledgeService::class);
        $this->branch = Branch::factory()->create();
        $this->user = User::factory()->create(['branch_id' => $this->branch->id]);
        $this->customer = Customer::factory()->create(['branch_id' => $this->branch->id]);
    }

    /**
     * Test: getPledges returns only user's branch pledges
     */
    public function test_get_pledges_filters_by_branch(): void
    {
        // Create pledges in user's branch
        Pledge::factory(3)->create(['branch_id' => $this->branch->id]);

        // Create pledges in other branch
        $otherBranch = Branch::factory()->create();
        Pledge::factory(2)->create(['branch_id' => $otherBranch->id]);

        $pledges = $this->service->getPledges($this->user);

        $this->assertCount(3, $pledges);
        $pledges->each(fn ($pledge) => $this->assertEquals($this->branch->id, $pledge->branch_id));
    }

    /**
     * Test: getPledge returns single pledge by ID
     */
    public function test_get_pledge_returns_by_id(): void
    {
        $pledge = Pledge::factory()->create(['branch_id' => $this->branch->id]);

        $retrieved = $this->service->getPledge($this->user, $pledge->id);

        $this->assertEquals($pledge->id, $retrieved->id);
        $this->assertEquals($pledge->pledge_no, $retrieved->pledge_no);
    }

    /**
     * Test: getPledge throws exception for other branch's pledge
     */
    public function test_get_pledge_throws_for_other_branch(): void
    {
        $otherBranch = Branch::factory()->create();
        $pledge = Pledge::factory()->create(['branch_id' => $otherBranch->id]);

        $this->expectException(\Exception::class);
        $this->service->getPledge($this->user, $pledge->id);
    }

    /**
     * Test: createPledge validates loan_amount
     */
    public function test_create_pledge_validates_loan_amount(): void
    {
        $data = [
            'customer_id' => $this->customer->id,
            'loan_amount' => -100, // Invalid: negative
            'item_value' => 5000,
            'duration_months' => 12,
        ];

        $this->expectException(\Illuminate\Validation\ValidationException::class);
        $this->service->createPledge($this->user, $data);
    }

    /**
     * Test: createPledge generates unique pledge_no
     */
    public function test_create_pledge_generates_pledge_no(): void
    {
        $data = [
            'customer_id' => $this->customer->id,
            'loan_amount' => 5000,
            'item_value' => 10000,
            'duration_months' => 12,
        ];

        $pledge1 = $this->service->createPledge($this->user, $data);
        $pledge2 = $this->service->createPledge($this->user, $data);

        $this->assertNotEmpty($pledge1->pledge_no);
        $this->assertNotEmpty($pledge2->pledge_no);
        $this->assertNotEquals($pledge1->pledge_no, $pledge2->pledge_no);
    }

    /**
     * Test: createPledge sets branch_id from user
     */
    public function test_create_pledge_sets_branch(): void
    {
        $data = [
            'customer_id' => $this->customer->id,
            'loan_amount' => 5000,
            'item_value' => 10000,
            'duration_months' => 12,
        ];

        $pledge = $this->service->createPledge($this->user, $data);

        $this->assertEquals($this->branch->id, $pledge->branch_id);
    }

    /**
     * Test: updatePledge modifies pledge
     */
    public function test_update_pledge_modifies_status(): void
    {
        $pledge = Pledge::factory()->create(['branch_id' => $this->branch->id, 'status' => 'active']);

        $updated = $this->service->updatePledge($this->user, $pledge->id, ['status' => 'redeemed']);

        $this->assertEquals('redeemed', $updated->status);
        $this->assertEquals('redeemed', $updated->fresh()->status);
    }

    /**
     * Test: updatePledge respects branch isolation
     */
    public function test_update_pledge_respects_branch_isolation(): void
    {
        $otherBranch = Branch::factory()->create();
        $pledge = Pledge::factory()->create(['branch_id' => $otherBranch->id]);

        $this->expectException(\Exception::class);
        $this->service->updatePledge($this->user, $pledge->id, ['status' => 'redeemed']);
    }

    /**
     * Test: deletePledge soft deletes pledge
     */
    public function test_delete_pledge_soft_deletes(): void
    {
        $pledge = Pledge::factory()->create(['branch_id' => $this->branch->id]);
        $pledgeId = $pledge->id;

        $this->service->deletePledge($this->user, $pledgeId);

        $this->assertNull(Pledge::find($pledgeId));
        $this->assertNotNull(Pledge::withTrashed()->find($pledgeId));
    }

    /**
     * Test: deletePledge respects branch isolation
     */
    public function test_delete_pledge_respects_branch_isolation(): void
    {
        $otherBranch = Branch::factory()->create();
        $pledge = Pledge::factory()->create(['branch_id' => $otherBranch->id]);

        $this->expectException(\Exception::class);
        $this->service->deletePledge($this->user, $pledge->id);
    }

    /**
     * Test: generatePledgeNo creates unique sequential numbers
     */
    public function test_generate_pledge_no_is_unique(): void
    {
        $no1 = $this->service->generatePledgeNo($this->branch);
        $no2 = $this->service->generatePledgeNo($this->branch);

        $this->assertNotEmpty($no1);
        $this->assertNotEmpty($no2);
        $this->assertNotEquals($no1, $no2);
    }
}
