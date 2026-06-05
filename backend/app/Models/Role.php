<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\HasUuidV7;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Role model for user permission management.
 * 
 * Represents user roles (admin, staff, manager) that determine portal access and permissions.
 * Roles are assigned to users through many-to-many relationship and are soft-deletable.
 * 
 * @property string $id UUID primary key
 * @property string $name Role name (e.g., "admin", "staff")
 * @property string|null $description Role description and purpose
 * @property bool $is_active Whether role is available for assignment
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon|null $deleted_at
 * 
 * @relationship users() HasMany User
 */

class Role extends Model
{
    use HasUuidV7, SoftDeletes;

    protected $fillable = [
        'name',
        'display_name',
        'can_access_store',
        'can_access_admin',
        'can_access_analytics',
        'default_redirect',
        'priority',
    ];

    protected $casts = [
        'can_access_store'     => 'boolean',
        'can_access_admin'     => 'boolean',
        'can_access_analytics' => 'boolean',
        'priority'             => 'integer',
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }
}
