<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

/**
 * Controller for authentication endpoints.
 * 
 * Handles user login, logout, and current user retrieval with delegation
 * to AuthService for user data formatting.
 */
class AuthController extends Controller
{
    /**
     * Initialize the controller with the auth service.
     *
     * @param AuthService $authService
     */
    public function __construct(private AuthService $authService)
    {
    }

    /**
     * Authenticate a user with username and password.
     *
     * @param Request $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function login(Request $request): JsonResponse
    {
        $isDevelopment = app('env') === 'local' || config('app.debug');
        
        if ($isDevelopment) {
            $timestamp = now()->format('Y-m-d H:i:s.v');
            error_log("[{$timestamp}] 🔐 LOGIN ATTEMPT | Username: {$request->username}");
        }

        $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        $user = User::with('roles')
            ->where('name', $request->username)
            ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            if ($isDevelopment) {
                $timestamp = now()->format('Y-m-d H:i:s.v');
                error_log("[{$timestamp}] ❌ LOGIN FAILED | Username: {$request->username} | Reason: Invalid credentials");
            }
            throw ValidationException::withMessages([
                'username' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        
        if ($isDevelopment) {
            $timestamp = now()->format('Y-m-d H:i:s.v');
            $tokenPreview = substr($token, 0, 20) . '...';
            $roles = $user->roles->pluck('name')->implode(', ');
            error_log("[{$timestamp}] ✅ LOGIN SUCCESS | Username: {$user->name} | ID: {$user->id} | Roles: {$roles} | Branch: {$user->branch?->name} | Token: {$tokenPreview}");
        }

        return response()->json([
            'data' => [
                'token' => $token,
                'user' => $this->authService->formatUserResponse($user),
            ],
        ]);
    }

    /**
     * Logout the current user by deleting their token.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        $isDevelopment = app('env') === 'local' || config('app.debug');
        $user = $request->user();
        
        if ($isDevelopment) {
            $timestamp = now()->format('Y-m-d H:i:s.v');
            error_log("[{$timestamp}] 🚪 LOGOUT | Username: {$user->name} | ID: {$user->id}");
        }
        
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully.']);
    }

    /**
     * Get the current authenticated user.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function me(Request $request): JsonResponse
    {
        $isDevelopment = app('env') === 'local' || config('app.debug');
        $user = $request->user()->load('roles', 'branch');
        
        if ($isDevelopment) {
            $timestamp = now()->format('Y-m-d H:i:s.v');
            $roles = $user->roles->pluck('name')->implode(', ');
            error_log("[{$timestamp}] 👤 AUTH CHECK | Username: {$user->name} | ID: {$user->id} | Roles: {$roles} | Branch: {$user->branch?->name}");
        }

        return response()->json([
            'data' => $this->authService->formatMeResponse($user),
        ]);
    }
}
