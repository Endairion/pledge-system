<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\User;
use App\Models\Pledge;

/**
 * Authorization Service
 * 
 * Centralizes authorization checks for branch isolation and role-based access
 * All queries should use this service to ensure branch isolation
 * 
 * Usage in Controller:
 *   $pledges = $this->authService->filterByUserBranch(
 *       Pledge::class,
 *       $request->user()
 *   )->get();
 */
class AuthorizationService
{
    /**
     * Check if user can access the given branch
     */
    public function canAccessBranch(User $user, ?string $branchId): bool
    {
        // Super admin can access any branch
        if ($user->isSuperAdmin()) {
            return true;
        }

        // If user has branch_id, they can only access that branch
        if ($user->branch_id !== null) {
            return $user->branch_id === $branchId;
        }

        // Cross-branch users (auditor, etc.) check roles
        return true;
    }

    /**
     * Check if user can access store portal
     */
    public function canAccessStore(User $user): bool
    {
        return $user->roles()
            ->where('is_store', true)
            ->exists();
    }

    /**
     * Check if user can access admin portal
     */
    public function canAccessAdmin(User $user): bool
    {
        return $user->roles()
            ->where('is_admin', true)
            ->exists();
    }

    /**
     * Check if user can access analytics portal
     */
    public function canAccessAnalytics(User $user): bool
    {
        return $user->roles()
            ->where('is_analytics', true)
            ->exists();
    }

    /**
     * Check if user has specific role
     */
    public function hasRole(User $user, string $roleName): bool
    {
        return $user->roles()
            ->where('name', $roleName)
            ->exists();
    }

    /**
     * Filter query results by user's branch
     * 
     * Example:
     *   $pledges = $this->authService->filterByUserBranch(
     *       Pledge::query(),
     *       $request->user()
     *   )->get();
     */
    public function filterByUserBranch($query, User $user)
    {
        // Super admin sees all branches
        if ($user->isSuperAdmin()) {
            return $query;
        }

        // Branch staff sees only their branch
        if ($user->branch_id !== null) {
            return $query->where('branch_id', $user->branch_id);
        }

        // Cross-branch users (auditor) see all if they have analytics role
        if ($user->roles()->where('can_access_analytics', true)->exists()) {
            return $query; // Auditor sees all
        }

        // Default: no access
        return $query->where('branch_id', null); // Empty result
    }

    /**
     * Get user's accessible branches (as array of IDs)
     */
    public function getAccessibleBranches(User $user): array
    {
        // Super admin can access all branches
        if ($user->isSuperAdmin()) {
            return \App\Models\Branch::pluck('id')->toArray();
        }

        // Scoped user can only access their branch
        if ($user->branch_id !== null) {
            return [$user->branch_id];
        }

        // Cross-branch users with analytics can access all
        if ($user->roles()->where('can_access_analytics', true)->exists()) {
            return \App\Models\Branch::pluck('id')->toArray();
        }

        return [];
    }

    /**
     * Check if user is owner of resource (for soft deletes, ownership checks)
     */
    public function isOwner(User $user, $model): bool
    {
        // Check if model has user_id field
        if (property_exists($model, 'user_id')) {
            return $model->user_id === $user->id;
        }

        // Check if model has branch_id field (owns if same branch)
        if (property_exists($model, 'branch_id') && $user->branch_id) {
            return $model->branch_id === $user->branch_id;
        }

        return false;
    }

    /**
     * Check if user can access customer
     */
    public function canAccessCustomer(User $user, $customer): bool
    {
        // Super admin can access any customer
        if ($user->isSuperAdmin()) {
            return true;
        }

        // Branch staff can access customers in their branch
        if ($user->branch_id !== null) {
            return $customer->branch_id === $user->branch_id;
        }

        // Cross-branch users (auditor, etc.) can access all customers
        if ($user->roles()->where('can_access_analytics', true)->exists()) {
            return true;
        }

        return false;
    }

    /**
     * Get authorization summary for user (for debugging/testing)
     */
    public function getAuthorizationSummary(User $user): array
    {
        return [
            'user_id' => $user->id,
            'username' => $user->name,
            'branch_id' => $user->branch_id,
            'is_super_admin' => $user->isSuperAdmin(),
            'can_access_store' => $this->canAccessStore($user),
            'can_access_admin' => $this->canAccessAdmin($user),
            'can_access_analytics' => $this->canAccessAnalytics($user),
            'accessible_branches' => $this->getAccessibleBranches($user),
            'roles' => $user->roles->pluck('name')->toArray(),
        ];
    }
}
