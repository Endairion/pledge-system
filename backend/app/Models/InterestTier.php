<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\HasUuidV7;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
/**
 * InterestTier model for interest rate tiering by loan amount.
 * 
 * Defines interest rate tiers based on loan amount ranges. Allows different interest rates
 * for small vs large loans. Used during pledge creation for interest rate calculation.
 * 
 * @property string $id UUID primary key
 * @property decimal $min_amount Minimum loan amount for this tier
 * @property decimal $max_amount Maximum loan amount for this tier (null for unlimited)
 * @property decimal $interest_rate Interest rate percentage for this tier
 * @property bool $is_active Whether tier is available for new pledges
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon|null $deleted_at
 */use Illuminate\Database\Eloquent\SoftDeletes;

class InterestTier extends Model
{
    use HasUuidV7, SoftDeletes;

    protected $fillable = [
        'rule_set_id',
        'min_amount',
        'max_amount',
        'rate_percentage',
        'sort_order',
    ];

    protected $casts = [
        'min_amount'      => 'decimal:2',
        'max_amount'      => 'decimal:2',
        'rate_percentage' => 'decimal:4',
        'sort_order'      => 'integer',
    ];

    public function ruleSet(): BelongsTo
    {
        return $this->belongsTo(PledgeRuleSet::class, 'rule_set_id');
    }
}
