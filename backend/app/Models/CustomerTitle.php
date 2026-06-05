<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\HasUuidV7;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * CustomerTitle model for customer title/salutation.
 * 
 * Represents honorific titles used with customer names (Dr., Mr., Ms., Puan, Encik, etc.).
 * Used during customer registration to properly address customers in formal correspondence.
 * 
 * @property string $id UUID primary key
 * @property string $name Title text (e.g., "Dr.", "Mr.", "Ms.", "Puan")

 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon|null $deleted_at
 */

class CustomerTitle extends Model
{
    use HasUuidV7, SoftDeletes;

    protected $fillable = ['name'];
}
