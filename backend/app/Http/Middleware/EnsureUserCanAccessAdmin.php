<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Services\AuthorizationService;

/**
 * Verify User Can Access Admin Portal
 */
class EnsureUserCanAccessAdmin
{
    public function __construct(protected AuthorizationService $authService)
    {
    }

    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user || !$this->authService->canAccessAdmin($user)) {
            return response()->json([
                'message' => 'Forbidden. You do not have access to the admin portal.',
            ], 403);
        }

        return $next($request);
    }
}
