<?php

declare(strict_types=1);

namespace App\Models;

use App\Traits\HasUuidV7;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

/**
 * User model for authentication and authorization.
 * 
 * Represents system users (staff, managers, admins) with role-based access control.
 * Users belong to a branch and can authenticate via username/password with Sanctum tokens.
 * Supports multiple roles per user for flexible permission management.
 * 
 * @property string $id UUID primary key
 * @property string $branch_id Branch UUID reference - determines data scope
 * @property string $username Username for login (unique within system)
 * @property string $email User email address (unique)
 * @property string $password Hashed password
 * @property string|null $phone User phone number
 * @property bool $is_active Whether user account is active
 * @property \Carbon\Carbon|null $last_login_at Last login timestamp
 * @property string|null $remember_token Token for remember-me functionality
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @relationship branch() BelongsTo Branch
 * @relationship roles() BelongsToMany Role
 */

class User extends Authenticatable
{
    use HasApiTokens, HasUuidV7, SoftDeletes, HasFactory;

    protected $fillable = [
        'name',
        'email',
        'password',
        'branch_id',
        'is_active',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'password'  => 'hashed',
    ];

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class);
    }

    public function pledges(): HasMany
    {
        return $this->hasMany(Pledge::class, 'staff_id');
    }

    public function goldRates(): HasMany
    {
        return $this->hasMany(GoldRate::class, 'created_by');
    }

    public function canAccessStore(): bool
    {
        return $this->roles->contains('can_access_store', true);
    }

    public function canAccessAdmin(): bool
    {
        return $this->roles->contains('can_access_admin', true);
    }

    public function canAccessAnalytics(): bool
    {
        return $this->roles->contains('can_access_analytics', true);
    }

    public function isSuperAdmin(): bool
    {
        return $this->roles->contains('name', 'Super Admin') || $this->roles->contains('name', 'super_admin');
    }

    public function isAdmin(): bool
    {
        return $this->isSuperAdmin() || $this->canAccessAdmin();
    }
}
