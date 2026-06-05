<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\HasUuidV7;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * GoldQuality model for gold purity levels.
 * 
 * Represents gold quality standards (999/24K, 916/22K, 750/18K, etc.). Quality is used to
 * assess item value and determine gold rate applicable to each pledge item.
 * 
 * @property string $id UUID primary key
 * @property string $name Quality designation (e.g., "999 (24K)", "916 (22K)")
 * @property int $purity_percent Purity percentage (e.g., 999, 916, 750, 585)
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon|null $deleted_at
 */

class GoldQuality extends Model
{
    use HasUuidV7, SoftDeletes;

    protected $fillable = ['name', 'purity_percent'];

    protected $casts = [
        'purity_percent' => 'integer',
    ];
}
