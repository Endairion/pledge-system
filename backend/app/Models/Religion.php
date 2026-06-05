<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\HasUuidV7;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Religion model for customer demographics.
 * 
 * Represents customer religions (Islam, Christianity, Buddhism, Hinduism, etc.). Used when
 * registering customers to capture demographic information. May impact compliance type selection.
 * 
 * @property string $id UUID primary key
 * @property string $name Religion name (e.g., "Islam", "Christian", "Buddhist")
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon|null $deleted_at
 */

class Religion extends Model
{
    use HasUuidV7, SoftDeletes;

    protected $fillable = ['name'];
}
