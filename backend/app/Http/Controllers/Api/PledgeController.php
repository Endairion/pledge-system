<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Models\Pledge;
use App\Services\PledgeService;
use App\Services\AuthorizationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Pledge Controller with Authorization
 * 
 * All endpoints automatically filter by user's branch
 * Authorization is checked by middleware and AuthorizationService
 */
class PledgeController
{
    public function __construct(
        protected PledgeService $pledgeService,
        protected AuthorizationService $authService,
    ) {
    }

    /**
     * Get all pledges (filtered by user's branch)
     * 
     * Route: GET /api/pledges
     * Middleware: auth:sanctum, can.access.store
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        // Filter pledges by user's branch automatically
        $pledges = $this->authService->filterByUserBranch(
            Pledge::query(),
            $user
        )
            ->with(['customer', 'items'])
            ->paginate(15);

        return response()->json(['data' => $pledges]);
    }

    /**
     * Get single pledge (with authorization check)
     * 
     * Route: GET /api/pledges/{id}
     */
    public function show(Request $request, string $id): JsonResponse
    {
        $user = $request->user();
        $pledge = Pledge::findOrFail($id);

        // Check if user can access this pledge's branch
        if (!$this->authService->canAccessBranch($user, $pledge->branch_id)) {
            return response()->json([
                'message' => 'Forbidden. You do not have access to this resource.',
            ], 403);
        }

        return response()->json([
            'data' => $pledge->load(['customer', 'items', 'branch']),
        ]);
    }

    /**
     * Create pledge (auto-assigns to user's branch)
     * 
     * Route: POST /api/pledges
     */
    public function store(Request $request): JsonResponse
    {
        $user = $request->user();

        // Validate input
        $data = $request->validate([
            'customer_id' => ['required', 'uuid', 'exists:customers,id'],
            'total_item_value' => ['required', 'numeric', 'min:0'],
            'total_loan' => ['required', 'numeric', 'min:0'],
        ]);

        // Auto-assign to user's branch
        $data['branch_id'] = $user->branch_id;
        $data['created_by_user_id'] = $user->id;

        $pledge = $this->pledgeService->createPledge($data);

        return response()->json([
            'data' => $pledge,
        ], 201);
    }

    /**
     * Update pledge (with authorization check)
     * 
     * Route: PUT /api/pledges/{id}
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $user = $request->user();
        $pledge = Pledge::findOrFail($id);

        // Check authorization
        if (!$this->authService->canAccessBranch($user, $pledge->branch_id)) {
            return response()->json([
                'message' => 'Forbidden. You do not have access to this resource.',
            ], 403);
        }

        $data = $request->validate([
            'total_loan' => ['sometimes', 'numeric', 'min:0'],
            'status' => ['sometimes', 'string', 'in:pending,active,redeemed'],
        ]);

        $updated = $this->pledgeService->updatePledge($pledge, $data);

        return response()->json(['data' => $updated]);
    }

    /**
     * Get authorization info for debugging
     * 
     * Route: GET /api/me/auth-info
     */
    public function authInfo(Request $request): JsonResponse
    {
        $user = $request->user()->load('roles', 'branch');
        $authSummary = $this->authService->getAuthorizationSummary($user);

        return response()->json([
            'data' => $authSummary,
        ]);
    }
}
