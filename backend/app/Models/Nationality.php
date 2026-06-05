<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\HasUuidV7;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Nationality model for customer demographics.
 * 
 * Represents customer nationalities. Used when registering customers to capture
 * demographic information. Soft-deletable for maintaining historical records.
 * 
 * @property string $id UUID primary key
 * @property string $name Nationality name (e.g., "Malaysia", "Singapore")

 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon|null $deleted_at
 */

class Nationality extends Model
{
    use HasUuidV7, SoftDeletes;

    protected $fillable = ['name'];
}
