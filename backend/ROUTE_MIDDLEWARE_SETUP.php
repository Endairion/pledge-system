<?php

declare(strict_types=1);

namespace App\Http;

/**
 * Route Middleware Registration Example
 * 
 * Add these middleware aliases to config/app.php or register in bootstrap/app.php
 * 
 * For Laravel 11 (bootstrap/app.php):
 * 
 * ->withMiddleware(function (Middleware $middleware) {
 *     $middleware->alias([
 *         'can.access.store' => \App\Http\Middleware\EnsureUserCanAccessStore::class,
 *         'can.access.admin' => \App\Http\Middleware\EnsureUserCanAccessAdmin::class,
 *         'can.access.analytics' => \App\Http\Middleware\EnsureUserCanAccessAnalytics::class,
 *     ]);
 * })
 */

/**
 * API Routes with Authorization Middleware
 * 
 * File: routes/api.php
 * 
 * All endpoints here require:
 * - auth:sanctum - Sanctum token-based authentication
 * - can.access.* - Portal-specific access control
 */

// ============================================================
// AUTHENTICATION ROUTES (no middleware)
// ============================================================

/*
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/auth/me', [AuthController::class, 'me'])->middleware('auth:sanctum');
*/

// ============================================================
// STORE PORTAL ROUTES
// ============================================================

/*
Route::middleware(['auth:sanctum', 'can.access.store'])->group(function () {
    // Pledges
    Route::get('/pledges', [PledgeController::class, 'index']);
    Route::post('/pledges', [PledgeController::class, 'store']);
    Route::get('/pledges/{id}', [PledgeController::class, 'show']);
    Route::put('/pledges/{id}', [PledgeController::class, 'update']);
    Route::post('/pledges/{id}/redeem', [PledgeRedeemController::class, 'store']);

    // Customers
    Route::get('/customers', [CustomerController::class, 'index']);
    Route::post('/customers/search', [CustomerController::class, 'search']);
    Route::get('/customers/{id}', [CustomerController::class, 'show']);
});
*/

// ============================================================
// ADMIN PORTAL ROUTES
// ============================================================

/*
Route::middleware(['auth:sanctum', 'can.access.admin'])->group(function () {
    // User Management
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

    // Branch Management
    Route::get('/branches', [BranchController::class, 'index']);
    Route::post('/branches', [BranchController::class, 'store']);

    // Pledge Management (admin view)
    Route::get('/admin/pledges', [AdminPledgeController::class, 'index']);
    Route::delete('/pledges/{id}', [PledgeController::class, 'destroy']);
});
*/

// ============================================================
// ANALYTICS PORTAL ROUTES
// ============================================================

/*
Route::middleware(['auth:sanctum', 'can.access.analytics'])->group(function () {
    // Reports
    Route::get('/analytics/summary', [AnalyticsController::class, 'summary']);
    Route::get('/analytics/pledges', [AnalyticsController::class, 'pledges']);
    Route::get('/analytics/customers', [AnalyticsController::class, 'customers']);

    // Exports
    Route::get('/analytics/export/pledges', [AnalyticsController::class, 'exportPledges']);
    Route::get('/analytics/export/customers', [AnalyticsController::class, 'exportCustomers']);
});
*/

// ============================================================
// PUBLIC ROUTES (no auth required)
// ============================================================

/*
Route::get('/health', fn() => response()->json(['status' => 'ok']));
Route::get('/config/branches', [ConfigController::class, 'branches']);
*/
