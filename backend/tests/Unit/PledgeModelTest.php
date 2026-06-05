<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Models\Branch;
use App\Models\Customer;
use App\Models\Pledge;
use App\Models\PledgeItem;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Test Pledge Model
 * 
 * Tests model relationships, attributes, and business logic
 */
class PledgeModelTest extends TestCase
{
    use RefreshDatabase;

    protected Pledge $pledge;
    protected Branch $branch;
    protected Customer $customer;

    protected function setUp(): void
    {
        parent::setUp();

        // Create test data
        $this->branch = Branch::factory()->create();
        $this->customer = Customer::factory()->create(['branch_id' => $this->branch->id]);
        $this->pledge = Pledge::factory()->create([
            'branch_id' => $this->branch->id,
            'customer_id' => $this->customer->id,
        ]);
    }

    /**
     * Test: Pledge can be created with required attributes
     */
    public function test_pledge_can_be_created(): void
    {
        $this->assertNotNull($this->pledge->id);
        $this->assertEquals($this->branch->id, $this->pledge->branch_id);
        $this->assertEquals($this->customer->id, $this->pledge->customer_id);
        $this->assertIn($this->pledge->status, ['active', 'renewed', 'redeemed', 'auctioned', 'forfeited']);
    }

    /**
     * Test: Pledge belongs to Branch
     */
    public function test_pledge_belongs_to_branch(): void
    {
        $this->assertInstanceOf(Branch::class, $this->pledge->branch);
        $this->assertEquals($this->branch->id, $this->pledge->branch->id);
    }

    /**
     * Test: Pledge belongs to Customer
     */
    public function test_pledge_belongs_to_customer(): void
    {
        $this->assertInstanceOf(Customer::class, $this->pledge->customer);
        $this->assertEquals($this->customer->id, $this->pledge->customer->id);
    }

    /**
     * Test: Pledge has many Items
     */
    public function test_pledge_has_many_items(): void
    {
        $items = PledgeItem::factory(3)->create(['pledge_id' => $this->pledge->id]);

        $this->assertCount(3, $this->pledge->items);
        $this->assertInstanceOf(PledgeItem::class, $this->pledge->items->first());
    }

    /**
     * Test: Pledge pledge_no is unique
     */
    public function test_pledge_no_is_unique(): void
    {
        $this->expectException(\Exception::class);

        Pledge::factory()->create([
            'pledge_no' => $this->pledge->pledge_no,
            'branch_id' => $this->branch->id,
        ]);
    }

    /**
     * Test: Pledge status can be set to valid values
     */
    public function test_pledge_status_values(): void
    {
        $statuses = ['active', 'renewed', 'redeemed', 'auctioned', 'forfeited'];

        foreach ($statuses as $status) {
            $this->pledge->status = $status;
            $this->pledge->save();
            $this->assertEquals($status, $this->pledge->fresh()->status);
        }
    }

    /**
     * Test: Pledge soft deletes
     */
    public function test_pledge_soft_deletes(): void
    {
        $pledgeId = $this->pledge->id;

        $this->pledge->delete();

        $this->assertNull(Pledge::find($pledgeId));
        $this->assertNotNull(Pledge::withTrashed()->find($pledgeId));
    }

    /**
     * Test: Pledge casts attributes correctly
     */
    public function test_pledge_attribute_casting(): void
    {
        $this->assertIsFloat($this->pledge->loan_amount);
        $this->assertIsFloat($this->pledge->item_value);
        $this->assertInstanceOf(\Carbon\Carbon::class, $this->pledge->pledged_at);
    }

    /**
     * Test: Pledge is scoped to branch
     */
    public function test_pledge_scope_by_branch(): void
    {
        $otherBranch = Branch::factory()->create();
        Pledge::factory()->create(['branch_id' => $otherBranch->id]);

        $pledges = Pledge::where('branch_id', $this->branch->id)->get();

        $this->assertCount(1, $pledges);
        $this->assertEquals($this->pledge->id, $pledges->first()->id);
    }
}
