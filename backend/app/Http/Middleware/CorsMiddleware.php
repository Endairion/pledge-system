<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * CORS (Cross-Origin Resource Sharing) middleware.
 * 
 * Handles CORS headers for API endpoints, allowing frontend applications on different
 * domains to communicate with this backend API. Configures allowed origins, methods,
 * headers, and handles preflight OPTIONS requests per CORS specification.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
 */
class CorsMiddleware
{
    /**
     * Handle incoming request and inject CORS headers.
     *
     * Sets appropriate CORS headers for all responses and handles preflight (OPTIONS) requests.
     * Preflight requests return empty 204 No Content response with headers.
     * Regular requests pass through next middleware and have CORS headers added to response.
     *
     * @param Request $request The incoming HTTP request
     * @param Closure $next The next middleware in the stack
     * @return Response HTTP response with CORS headers
     * 
     * @throws \Exception If response object is invalid or headers cannot be set
     */
    public function handle(Request $request, Closure $next): Response
    {
        $headers = [
            'Access-Control-Allow-Origin'      => '*',
            'Access-Control-Allow-Methods'     => 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers'     => 'Content-Type, Authorization, X-Requested-With, Accept',
            'Access-Control-Expose-Headers'    => 'Content-Length, X-JSON-Response',
            'Access-Control-Max-Age'           => '86400',
        ];

        // Handle preflight requests
        if ($request->getMethod() === 'OPTIONS') {
            return response('', 204)->withHeaders($headers);
        }

        // Get the response from the next middleware
        $response = $next($request);

        // Add CORS headers to response
        foreach ($headers as $key => $value) {
            $response->header($key, $value);
        }

        return $response;
    }
}
