<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Admin\LookupController;
use App\Http\Controllers\Api\Admin\GoldRateController;
use App\Http\Controllers\Api\Admin\UsersController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public routes
|--------------------------------------------------------------------------
*/
Route::post('/auth/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Authenticated routes
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me',      [AuthController::class, 'me']);

    /*
    |--------------------------------------------------------------------------
    | Admin Lookup Tables
    |--------------------------------------------------------------------------
    */
    Route::prefix('admin/lookups')->group(function () {
        Route::get('/', [LookupController::class, 'metadata']);
        Route::get('/{table}', [LookupController::class, 'index']);
        Route::post('/{table}', [LookupController::class, 'store']);
        Route::get('/{table}/{id}', [LookupController::class, 'show']);
        Route::put('/{table}/{id}', [LookupController::class, 'update']);
        Route::delete('/{table}/{id}', [LookupController::class, 'destroy']);
    });

    /*
    |--------------------------------------------------------------------------
    | Admin Gold Rates
    |--------------------------------------------------------------------------
    */
    Route::prefix('admin/gold-rates')->group(function () {
        Route::get('/', [GoldRateController::class, 'index']);
        Route::post('/', [GoldRateController::class, 'store']);
        Route::delete('/{id}', [GoldRateController::class, 'destroy']);
    });

    /*
    |--------------------------------------------------------------------------
    | Admin Users
    |--------------------------------------------------------------------------
    */
    Route::prefix('admin/users')->group(function () {
        Route::get('/', [UsersController::class, 'index']);
        Route::post('/', [UsersController::class, 'store']);
        Route::get('/{id}', [UsersController::class, 'show']);
        Route::put('/{id}', [UsersController::class, 'update']);
        Route::delete('/{id}', [UsersController::class, 'destroy']);
    });

    /*
    |--------------------------------------------------------------------------
    | Helper data endpoints for Users form
    |--------------------------------------------------------------------------
    */
    Route::get('/admin/branches-list', function () {
        return response()->json(['data' => \App\Models\Branch::all()]);
    });

    Route::get('/admin/roles-list', function () {
        return response()->json(['data' => \App\Models\Role::all()]);
    });

});
