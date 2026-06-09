<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\HasUuidV7;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * ComplianceType model
 * 
 * Represents different pledge compliance types (e.g., arrahnu, conventional)
 * Used to determine calculation methods and regulations
 * 
 * @property string $id UUID primary key
 * @property string $code Unique code identifier (e.g., 'arrahnu', 'conventional')
 * @property string $name Display name
 * @property string|null $description Description of the compliance type
 * @property bool $is_active Whether this compliance type is available
 */
class ComplianceType extends Model
{
    use HasUuidV7, SoftDeletes;

    protected $fillable = [
        'code',
        'name',
        'description',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function templates(): HasMany
    {
        return $this->hasMany(PledgeRuleSetTemplate::class);
    }
}
