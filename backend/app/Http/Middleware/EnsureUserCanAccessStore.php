<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Services\AuthorizationService;

/**
 * Verify User Can Access Store Portal
 * 
 * Usage:
 *   Route::middleware(['auth:sanctum', 'can.access.store'])->group(function () {
 *       Route::get('/pledges', [PledgeController::class, 'index']);
 *   });
 */
class EnsureUserCanAccessStore
{
    public function __construct(protected AuthorizationService $authService)
    {
    }

    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user || !$this->authService->canAccessStore($user)) {
            return response()->json([
                'message' => 'Forbidden. You do not have access to the store portal.',
            ], 403);
        }

        return $next($request);
    }
}
