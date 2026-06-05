<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\HasUuidV7;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Race model for customer demographics.
 * 
 * Represents customer ethnic backgrounds (Malay, Chinese, Indian, etc.). Used when
 * registering customers to capture demographic information relevant to Malaysian context.
 * 
 * @property string $id UUID primary key
 * @property string $name Race/ethnicity name (e.g., "Melayu", "Cina", "India")
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon|null $deleted_at
 */

class Race extends Model
{
    use HasUuidV7, SoftDeletes;

    protected $fillable = ['name'];
}
