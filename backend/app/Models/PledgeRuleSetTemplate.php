<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\HasUuidV7;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * PledgeRuleSetTemplate model
 * 
 * Stores templates for pledge rule sets that can be applied to new branches
 * Simplifies configuration by providing pre-configured default parameters
 * 
 * @property string $id UUID primary key
 * @property string $compliance_type_id Foreign key to ComplianceType
 * @property string $name Template name
 * @property string|null $description Template description
 * @property array $default_params Default parameters for new rule sets using this template
 * @property bool $is_active Whether this template is available
 */
class PledgeRuleSetTemplate extends Model
{
    use HasUuidV7, SoftDeletes;

    protected $fillable = [
        'compliance_type_id',
        'name',
        'description',
        'default_params',
        'is_active',
    ];

    protected $casts = [
        'default_params' => 'array',
        'is_active' => 'boolean',
    ];

    public function complianceType(): BelongsTo
    {
        return $this->belongsTo(ComplianceType::class);
    }
}
