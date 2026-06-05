<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\HasUuidV7;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * BranchFeeConfig model for branch-specific fee configuration.
 * 
 * Defines fees applicable to a branch (fixed and percentage-based fees per compliance type).
 * Branch can customize pledge charge fee, storage fee rate, interest rates, etc.
 * 
 * @property string $id UUID primary key
 * @property string $branch_id Branch UUID reference
 * @property string $compliance_type Compliance type ("arrahnu" or "conventional")
 * @property string $fee_type Fee type identifier ("pledge_charge", "storage", "interest")
 * @property decimal $amount Fee amount (fixed) or percentage (for percentage-based fees)
 * @property bool $is_percentage Whether amount is a percentage (true) or fixed amount (false)
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon|null $deleted_at
 * 
 * @relationship branch() BelongsTo Branch
 */

class BranchFeeConfig extends Model
{
    use HasUuidV7, SoftDeletes;

    protected $fillable = [
        'branch_id',
        'rule_set_id',
        'fee_type_id',
        'calculation_type',
        'amount',
        'applies_to',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
    ];

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public function ruleSet(): BelongsTo
    {
        return $this->belongsTo(PledgeRuleSet::class, 'rule_set_id');
    }

    public function feeType(): BelongsTo
    {
        return $this->belongsTo(FeeType::class);
    }
}
