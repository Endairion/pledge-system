<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\HasUuidV7;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * PledgeRuleSetParam model for individual rule set parameters.
 * 
 * Stores individual parameters within a rule set. Each parameter is a key-value pair that
 * affects pledge calculations (fee rates, interest rates, maximum loan amounts, etc.).
 * Allows flexible configuration without modifying core calculation logic.
 * 
 * @property string $id UUID primary key
 * @property string $rule_set_id Rule set UUID this parameter belongs to
 * @property string $param_key Configuration parameter key (e.g., "pledge_charge_fee", "interest_rate")
 * @property mixed $param_value Configuration parameter value (typed based on key)
 * @property string|null $description Parameter description and unit
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon|null $deleted_at
 * 
 * @relationship ruleSet() BelongsTo PledgeRuleSet
 */

class PledgeRuleSetParam extends Model
{
    use HasUuidV7, SoftDeletes;

    protected $fillable = [
        'rule_set_id',
        'param_key',
        'param_value',
        'param_type',
    ];

    public function ruleSet(): BelongsTo
    {
        return $this->belongsTo(PledgeRuleSet::class, 'rule_set_id');
    }

    public function getValue(): mixed
    {
        return match ($this->param_type) {
            'integer' => (int) $this->param_value,
            'decimal' => (float) $this->param_value,
            'boolean' => filter_var($this->param_value, FILTER_VALIDATE_BOOLEAN),
            default   => $this->param_value,
        };
    }
}
