<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Verbose HTTP request logging middleware.
 * 
 * Logs all incoming HTTP requests with detailed information including:
 * - Request method, path, and query parameters
 * - User information (if authenticated)
 * - Request payload (for POST/PUT/PATCH requests)
 * - Response status and duration
 */
class VerboseRequestLogging
{
    /**
     * Handle an incoming request.
     *
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $startTime = microtime(true);
        $isDevelopment = app('env') === 'local' || config('app.debug');
        
        // Only log API calls to terminal in development mode
        if ($isDevelopment && str_starts_with($request->path(), 'api/')) {
            $method = $request->method();
            $path = $request->path();
            $user = $request->user();
            $userInfo = $user ? "{$user->name} (ID:{$user->id})" : "Guest";
            $timestamp = now()->format('Y-m-d H:i:s.v');
            
            // Log incoming request to terminal
            error_log("[{$timestamp}] 📡 {$method} {$path} | User: {$userInfo} | IP: {$request->ip()}");
            
            // Log payload for POST/PUT/PATCH requests (but not passwords)
            if (in_array($method, ['POST', 'PUT', 'PATCH']) && $request->isJson()) {
                $payload = $request->except(['password', 'password_confirmation', 'file', 'files', 'image']);
                if (!empty($payload)) {
                    error_log("     └─ 📋 Payload: " . json_encode($payload));
                }
            }
        }
        
        // Process request
        $response = $next($request);
        
        // Calculate duration
        $duration = (microtime(true) - $startTime) * 1000; // Convert to milliseconds
        
        // Log response to terminal (development only)
        if ($isDevelopment && str_starts_with($request->path(), 'api/')) {
            $status = $response->getStatusCode();
            $statusEmoji = $status >= 200 && $status < 300 ? '✅' : ($status >= 400 ? '❌' : '⚠️');
            error_log("     └─ {$statusEmoji} Response: {$status} | {$duration}ms");
        }
        
        return $response;
    }
}
