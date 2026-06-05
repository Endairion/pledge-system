<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\HasUuidV7;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Pledge model for pledge management lifecycle.
 * 
 * Represents gold pledges created by customers. Central to the system, tracking loan details,
 * item values, fees, and status throughout pledge lifecycle (created → active → renewed/redeemed/auctioned).
 * Supports multiple items per pledge and various pledge states managed by PledgeRenew, PledgeRedeem,
 * and PledgeAuction models.
 * 
 * @property string $id UUID primary key
 * @property string $pledge_no Unique pledge number (e.g., \"KDE-2024-001\")
 * @property string $branch_id Branch UUID where pledge originated
 * @property string $customer_id Customer UUID who owns the pledge
 * @property string|null $parent_pledge_id UUID of parent pledge if this is a renewal
 * @property string|null $rule_set_id Pledge rule set applied (determines calculation rules)
 * @property string|null $staff_id User UUID of staff member who created pledge
 * @property decimal $loan_amount Total loan amount (bank + cash)
 * @property decimal $item_value Assessed value of all items
 * @property decimal $fee_per_month Monthly fee amount\n * @property decimal $fee_paid_cumulative Total fees paid so far\n * @property decimal $gross_weight Total weight of all items\n * @property int $total_qty Total quantity of items\n * @property decimal $total_assessed_value Total assessed value calculated\n * @property decimal $cash_amount Cash portion of loan\n * @property decimal $bank_amount Bank loan portion\n * @property string|null $bank_reference Bank transaction reference\n * @property string|null $notes Additional notes\n * @property string $status Pledge status (\"active\", \"renewed\", \"redeemed\", \"auctioned\", \"forfeited\")\n * @property \\Carbon\\Carbon $pledged_at When pledge was created\n * @property \\Carbon\\Carbon|null $expires_at When pledge expires/matures\n * @property \\Carbon\\Carbon|null $renewed_at Last renewal timestamp\n * @property \\Carbon\\Carbon|null $redeemed_at When pledge was redeemed\n * @property \\Carbon\\Carbon $created_at\n * @property \\Carbon\\Carbon $updated_at\n * @property \\Carbon\\Carbon|null $deleted_at\n * \n * @relationship branch() BelongsTo Branch\n * @relationship customer() BelongsTo Customer\n * @relationship items() HasMany PledgeItem\n * @relationship renewals() HasMany PledgeRenew\n * @relationship redeems() HasMany PledgeRedeem\n * @relationship auctions() HasMany PledgeAuction\n * @relationship parent() BelongsTo Pledge\n * @relationship ruleSet() BelongsTo PledgeRuleSet\n */

class Pledge extends Model
{
    use HasUuidV7, SoftDeletes;

    protected $fillable = [
        'pledge_no',
        'branch_id',
        'customer_id',
        'parent_pledge_id',
        'rule_set_id',
        'staff_id',
        'loan_amount',
        'item_value',
        'fee_per_month',
        'fee_paid_cumulative',
        'gross_weight',
        'total_qty',
        'total_assessed_value',
        'cash_amount',
        'bank_amount',
        'bank_reference',
        'notes',
        'status',
        'pledged_at',
        'expires_at',
        'renewed_at',
        'redeemed_at',
        'auctioned_at',
    ];

    protected $casts = [
        'loan_amount'          => 'decimal:2',
        'item_value'           => 'decimal:2',
        'fee_per_month'        => 'decimal:2',
        'fee_paid_cumulative'  => 'decimal:2',
        'gross_weight'         => 'decimal:3',
        'total_assessed_value' => 'decimal:2',
        'cash_amount'          => 'decimal:2',
        'bank_amount'          => 'decimal:2',
        'pledged_at'           => 'datetime',
        'expires_at'           => 'date',
        'renewed_at'           => 'datetime',
        'redeemed_at'          => 'datetime',
        'auctioned_at'         => 'datetime',
    ];

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function ruleSet(): BelongsTo
    {
        return $this->belongsTo(PledgeRuleSet::class, 'rule_set_id');
    }

    public function staff(): BelongsTo
    {
        return $this->belongsTo(User::class, 'staff_id');
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Pledge::class, 'parent_pledge_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Pledge::class, 'parent_pledge_id');
    }

    public function items(): HasMany
    {
        return $this->hasMany(PledgeItem::class);
    }

    public function renewals(): HasMany
    {
        return $this->hasMany(PledgeRenew::class);
    }

    public function redeem(): HasOne
    {
        return $this->hasOne(PledgeRedeem::class);
    }

    public function auction(): HasOne
    {
        return $this->hasOne(PledgeAuction::class);
    }
}
