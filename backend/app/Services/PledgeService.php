<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Pledge;
use App\Models\User;
use Illuminate\Pagination\Paginator;

/**
 * Pledge Service with Authorization
 * 
 * Example of how to integrate AuthorizationService for branch isolation
 * and authorization checks in business logic layer
 */
class PledgeService
{
    public function __construct(
        protected AuthorizationService $authService,
    ) {
    }

    /**
     * Get pledges (filtered by user's branch)
     * 
     * Super admin sees all pledges
     * Branch staff sees only their branch pledges
     * Auditor sees all (if has analytics role)
     */
    public function getPledges(User $user, int $page = 1, int $perPage = 15): Paginator
    {
        $query = Pledge::query()
            ->with(['customer', 'items', 'branch']);

        // Apply branch filter
        $query = $this->authService->filterByUserBranch($query, $user);

        return $query->paginate($perPage, ['*'], 'page', $page);
    }

    /**
     * Get single pledge (with authorization check)
     */
    public function getPledge(User $user, string $pledgeId): Pledge
    {
        $pledge = Pledge::findOrFail($pledgeId);

        // Check if user can access this pledge
        if (!$this->authService->canAccessBranch($user, $pledge->branch_id)) {
            throw new \Illuminate\Database\Eloquent\ModelNotFoundException(
                'Pledge not found or you do not have access.'
            );
        }

        return $pledge->load(['customer', 'items', 'branch']);
    }

    /**
     * Create pledge (auto-assigns to user's branch)
     */
    public function createPledge(User $user, array $data): Pledge
    {
        // Only users with store access can create pledges
        if (!$this->authService->canAccessStore($user)) {
            throw new \Illuminate\Validation\UnauthorizedException(
                'You do not have permission to create pledges.'
            );
        }

        // Auto-assign to user's branch
        if (!$user->branch_id) {
            throw new \Exception('Cannot create pledge for user without branch assignment.');
        }

        $data['branch_id'] = $user->branch_id;
        $data['created_by_user_id'] = $user->id;

        return Pledge::create($data);
    }

    /**
     * Update pledge (with authorization check)
     */
    public function updatePledge(User $user, Pledge $pledge, array $data): Pledge
    {
        // Check authorization
        if (!$this->authService->canAccessBranch($user, $pledge->branch_id)) {
            throw new \Illuminate\Validation\UnauthorizedException(
                'You do not have permission to update this pledge.'
            );
        }

        $pledge->update($data);
        return $pledge->fresh();
    }

    /**
     * Delete pledge (soft delete, only admin can do this)
     */
    public function deletePledge(User $user, Pledge $pledge): bool
    {
        // Only admins can delete pledges
        if (!$this->authService->canAccessAdmin($user)) {
            throw new \Illuminate\Validation\UnauthorizedException(
                'Only administrators can delete pledges.'
            );
        }

        // Check branch access
        if (!$this->authService->canAccessBranch($user, $pledge->branch_id)) {
            throw new \Illuminate\Validation\UnauthorizedException(
                'You do not have permission to delete this pledge.'
            );
        }

        return (bool) $pledge->delete();
    }

    /**
     * Get pledge statistics (for dashboard)
     * - Super admin sees all branches
     * - Branch admin sees their branch
     * - Staff sees their branch (limited view)
     */
    public function getStatistics(User $user): array
    {
        $query = Pledge::query();
        $query = $this->authService->filterByUserBranch($query, $user);

        return [
            'total_pledges' => $query->count(),
            'active_pledges' => $query->where('status', 'active')->count(),
            'redeemed_pledges' => $query->where('status', 'redeemed')->count(),
            'total_value' => $query->sum('total_item_value'),
            'total_loans' => $query->sum('total_loan'),
            'accessible_branches' => $this->authService->getAccessibleBranches($user),
        ];
    }

    /**
     * Search pledges (with branch filtering)
     */
    public function search(User $user, string $query, int $page = 1): Paginator
    {
        $pledgeQuery = Pledge::query()
            ->with(['customer', 'items'])
            ->whereHas('customer', function ($q) use ($query) {
                $q->where('name', 'like', "%$query%")
                  ->orWhere('ic_number', 'like', "%$query%");
            });

        // Apply branch filter
        $pledgeQuery = $this->authService->filterByUserBranch($pledgeQuery, $user);

        return $pledgeQuery->paginate(15, ['*'], 'page', $page);
    }

    /**
     * Get pledges for user's branch only (utility method)
     */
    public function getPledgesForBranch(User $user): \Illuminate\Database\Eloquent\Collection
    {
        return $this->authService->filterByUserBranch(
            Pledge::query(),
            $user
        )->get();
    }

    /**
     * Check if user owns or can manage this pledge
     */
    public function userCanManage(User $user, Pledge $pledge): bool
    {
        // Super admin can manage any pledge
        if ($user->isSuperAdmin()) {
            return true;
        }

        // Check branch access
        if (!$this->authService->canAccessBranch($user, $pledge->branch_id)) {
            return false;
        }

        // Check portal access (admin can manage, staff cannot)
        return $this->authService->canAccessAdmin($user);
    }
}
