<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\HasUuidV7;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * BranchConfig model for branch-specific configuration settings.
 * 
 * Stores branch-level configuration parameters (operational hours, max loan amount, etc.).
 * Each branch can customize settings affecting pledge calculations and operations.
 * 
 * @property string $id UUID primary key
 * @property string $branch_id Branch UUID reference
 * @property string $key Configuration key (e.g., "max_loan_amount", "operational_hours")
 * @property mixed $value Configuration value (typed based on key)
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon|null $deleted_at
 * 
 * @relationship branch() BelongsTo Branch
 */

class BranchConfig extends Model
{
    use HasUuidV7, SoftDeletes;

    protected $fillable = ['branch_id', 'config_key', 'config_value'];

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }
}
