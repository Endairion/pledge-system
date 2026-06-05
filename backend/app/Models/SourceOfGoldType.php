<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\HasUuidV7;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * SourceOfGoldType model for gold source classification.
 * 
 * Represents types of gold sources (inheritance, gift, purchase, etc.). Used during pledge
 * creation to document origin of pledged gold items. Important for audit and compliance.
 * 
 * @property string $id UUID primary key
 * @property string $name Source type name (e.g., "Inheritance", "Gift", "Purchase")
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon|null $deleted_at
 */

class SourceOfGoldType extends Model
{
    use HasUuidV7, SoftDeletes;

    protected $fillable = ['name'];
}
