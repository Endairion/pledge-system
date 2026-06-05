<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\HasUuidV7;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Model representing a gold rate.
 * 
 * Stores minimum and maximum rates for different gold qualities,
 * organized by compliance type (arrahnu, conventional) globally across all branches.
 */
class GoldRate extends Model
{
    use HasUuidV7, SoftDeletes;

    protected $fillable = [
        'compliance_type',
        'quality_id',
        'min_rate',
        'max_rate',
        'created_by',
    ];

    protected $casts = [
        'min_rate' => 'decimal:2',
        'max_rate' => 'decimal:2',
    ];

    /**
     * Get the gold quality for this rate.
     *
     * @return BelongsTo
     */
    public function quality(): BelongsTo
    {
        return $this->belongsTo(GoldQuality::class, 'quality_id');
    }

    /**
     * Get the user who created this gold rate.
     *
     * @return BelongsTo
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
