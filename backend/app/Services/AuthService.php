<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\User;

/**
 * Service class for authentication-related operations.
 * 
 * Handles user data transformation and response formatting for authentication endpoints.
 */
class AuthService
{
    /**
     * Format user data for authentication responses.
     *
     * @param User $user The user to format
     * @return array Formatted user data with roles and permissions
     */
    public function formatUserResponse(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'branch_id' => $user->branch_id,
            'can_access_store' => $user->roles->contains(fn ($r) => $r->can_access_store),
            'can_access_admin' => $user->roles->contains(fn ($r) => $r->can_access_admin),
            'can_access_analytics' => $user->roles->contains(fn ($r) => $r->can_access_analytics),
            'roles' => $this->formatRoles($user),
        ];
    }

    /**
     * Format user data for the /me endpoint, including branch information.
     *
     * @param User $user The user to format
     * @return array Formatted user data with branch and roles
     */
    public function formatMeResponse(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'branch_id' => $user->branch_id,
            'can_access_store' => $user->roles->contains(fn ($r) => $r->can_access_store),
            'can_access_admin' => $user->roles->contains(fn ($r) => $r->can_access_admin),
            'can_access_analytics' => $user->roles->contains(fn ($r) => $r->can_access_analytics),
            'branch' => $user->branch ? [
                'id' => $user->branch->id,
                'name' => $user->branch->name,
                'code' => $user->branch->code,
                'compliance_type' => $user->branch->compliance_type,
            ] : null,
            'roles' => $this->formatRoles($user),
        ];
    }

    /**
     * Format user roles for API response.
     *
     * @param User $user The user whose roles to format
     * @return array Formatted roles array
     */
    private function formatRoles(User $user): array
    {
        return $user->roles->map(fn ($r) => [
            'id' => $r->id,
            'name' => $r->name,
            'display_name' => $r->display_name,
            'can_access_store' => $r->can_access_store,
            'can_access_admin' => $r->can_access_admin,
            'can_access_analytics' => $r->can_access_analytics,
            'default_redirect' => $r->default_redirect,
            'priority' => $r->priority,
        ])->toArray();
    }
}
