<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\HasUuidV7;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Category model for pledge item categorization.
 * 
 * Represents product categories used when pledging items (rings, necklaces, bracelets, etc.).
 * Categories are shared globally across all branches and soft-deletable for historical tracking.
 * 
 * @property string $id UUID primary key
 * @property string $name Category name (e.g., "Cincin", "Rantai")

 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon|null $deleted_at
 */

class Category extends Model
{
    use HasUuidV7, SoftDeletes;

    protected $fillable = ['name'];

    protected $casts = [];
}
