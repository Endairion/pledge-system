<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\HasUuidV7;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * FeeType model for fee categorization.
 * 
 * Defines types of fees (pledge charge, storage, interest, redemption, etc.) that can be
 * applied to pledges. Fee types are shared globally and used in fee calculations.
 * 
 * @property string $id UUID primary key
 * @property string $code Fee type code (e.g., "PLEDGE_CHARGE", "STORAGE_FEE")
 * @property string $name Fee type name (e.g., "Pledge Charge Fee", "Storage Fee")
 * @property string $description Fee type description
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon|null $deleted_at
 */

class FeeType extends Model
{
    use HasUuidV7, SoftDeletes;

    protected $fillable = ['code', 'name', 'description'];
}
