<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\HasUuidV7;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * PledgeItem model for individual items within a pledge.
 * 
 * Represents individual gold items pledged as part of a pledge. Each pledge can contain
 * multiple items with different qualities, weights, and descriptions. Items are the basis
 * for pledge value assessment and gold rate application.
 * 
 * @property string $id UUID primary key
 * @property string $pledge_id Pledge UUID this item belongs to
 * @property int $item_number Sequential number within pledge (1, 2, 3...)
 * @property string $category_id Product category (ring, necklace, bracelet, etc.)
 * @property string $quality_id Gold quality/purity level (999, 916, 750, etc.)
 * @property decimal $weight_gram Item weight in grams
 * @property int $quantity Number of pieces of this item type
 * @property decimal $assessed_value Estimated value of this item
 * @property string|null $remarks Item description or condition notes
 * @property string|null $source_type Source of gold origin
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon|null $deleted_at
 * 
 * @relationship pledge() BelongsTo Pledge
 * @relationship category() BelongsTo Category
 * @relationship quality() BelongsTo GoldQuality
 */

class PledgeItem extends Model
{
    use HasUuidV7, SoftDeletes;

    protected $fillable = [
        'pledge_id',
        'category_id',
        'quality_id',
        'serial_num',
        'description',
        'qty',
        'weight',
        'gold_rate',
        'assessed_value',
        'pledge_percent',
        'pledge_amt',
        'item_stg_fee',
        'remarks',
        'image_paths',
    ];

    protected $casts = [
        'weight'         => 'decimal:3',
        'gold_rate'      => 'decimal:2',
        'assessed_value' => 'decimal:2',
        'pledge_percent' => 'decimal:2',
        'pledge_amt'     => 'decimal:2',
        'item_stg_fee'   => 'decimal:2',
        'image_paths'    => 'array',
    ];

    public function pledge(): BelongsTo
    {
        return $this->belongsTo(Pledge::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function quality(): BelongsTo
    {
        return $this->belongsTo(GoldQuality::class, 'quality_id');
    }
}
