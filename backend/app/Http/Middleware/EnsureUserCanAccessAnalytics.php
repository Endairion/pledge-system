<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Services\AuthorizationService;

/**
 * Verify User Can Access Analytics Portal
 */
class EnsureUserCanAccessAnalytics
{
    public function __construct(protected AuthorizationService $authService)
    {
    }

    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user || !$this->authService->canAccessAnalytics($user)) {
            return response()->json([
                'message' => 'Forbidden. You do not have access to analytics.',
            ], 403);
        }

        return $next($request);
    }
}
