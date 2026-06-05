<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\HasUuidV7;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
/**
 * PledgeRuleSet model for pledge calculation rule configuration.
 * 
 * Defines rule sets that determine how pledges are calculated (fees, interest, storage).
 * Different rule sets can be applied per compliance type or branch. Contains parameters
 * referenced during pledge creation to compute financial terms.
 * 
 * @property string $id UUID primary key
 * @property string $name Rule set name (e.g., "Standard ArRahnu", "Conventional Premium")
 * @property string $compliance_type Compliance type ("arrahnu" or "conventional")
 * @property string|null $description Rule set description and application context
 * @property bool $is_active Whether rule set is available for new pledges
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon|null $deleted_at
 * 
 * @relationship parameters() HasMany PledgeRuleSetParam
 */use Illuminate\Database\Eloquent\SoftDeletes;

class PledgeRuleSet extends Model
{
    use HasUuidV7, SoftDeletes;

    protected $fillable = [
        'branch_id',
        'name',
        'calculation_model',
        'effective_from',
        'effective_to',
        'is_active',
    ];

    protected $casts = [
        'effective_from' => 'date',
        'effective_to'   => 'date',
        'is_active'      => 'boolean',
    ];

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public function params(): HasMany
    {
        return $this->hasMany(PledgeRuleSetParam::class, 'rule_set_id');
    }

    public function tiers(): HasMany
    {
        return $this->hasMany(InterestTier::class, 'rule_set_id');
    }

    public function feeConfigs(): HasMany
    {
        return $this->hasMany(BranchFeeConfig::class, 'rule_set_id');
    }

    public function pledges(): HasMany
    {
        return $this->hasMany(Pledge::class, 'rule_set_id');
    }
}
