<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\HasUuidV7;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
/**
 * Branch model for multi-branch support.
 * 
 * Represents physical or logical business branches. Central to branch isolation pattern where
 * users and data are scoped to specific branches. Each pledge, customer, and user is associated
 * with a branch for data isolation and reporting.
 * 
 * @property string $id UUID primary key
 * @property string $branch_code Branch code (e.g., "KDE", "PNG", "JHR") for pledge numbering
 * @property string $name Branch name (e.g., "Kuala Lumpur", "Penang")
 * @property string $city Branch city/location
 * @property string|null $state State/province
 * @property string|null $phone Branch phone number
 * @property string|null $email Branch email address
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon|null $deleted_at
 * 
 * @relationship users() HasMany User
 * @relationship customers() HasMany Customer
 * @relationship pledges() HasMany Pledge
 * @relationship configs() HasMany BranchConfig
 * @relationship feeConfigs() HasMany BranchFeeConfig
 */use Illuminate\Database\Eloquent\SoftDeletes;

class Branch extends Model
{
    use HasUuidV7, SoftDeletes;

    protected $fillable = [
        'name',
        'code',
        'compliance_type',
        'pledge_prefix',
        'registration_no',
        'address',
        'phone',

    ];

    protected $casts = [

    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function pledgeRuleSets(): HasMany
    {
        return $this->hasMany(PledgeRuleSet::class);
    }

    public function activePledgeRuleSet(): HasOne
    {
        return $this->hasOne(PledgeRuleSet::class)
            ->where('is_active', true)
            ->whereNull('effective_to');
    }

    public function configs(): HasMany
    {
        return $this->hasMany(BranchConfig::class);
    }

    public function pledgeSequence(): HasOne
    {
        return $this->hasOne(PledgeSequence::class);
    }

    public function goldRates(): HasMany
    {
        return $this->hasMany(GoldRate::class);
    }

    public function feeConfigs(): HasMany
    {
        return $this->hasMany(BranchFeeConfig::class);
    }

    public function pledges(): HasMany
    {
        return $this->hasMany(Pledge::class);
    }
}
