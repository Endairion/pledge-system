<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Admin\LookupController;
use App\Http\Controllers\Api\Admin\GoldRateController;
use App\Http\Controllers\Api\Admin\UsersController;
use App\Http\Controllers\Api\Admin\BranchController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\PledgeConfigController;
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
    | Admin Branches
    |--------------------------------------------------------------------------
    */
    Route::prefix('admin/branches')->group(function () {
        Route::get('/', [BranchController::class, 'index']);
        Route::post('/', [BranchController::class, 'store']);
        Route::get('/{id}', [BranchController::class, 'show']);
        Route::put('/{id}', [BranchController::class, 'update']);
        Route::delete('/{id}', [BranchController::class, 'destroy']);
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

    /*
    |--------------------------------------------------------------------------
    | Customer Management (Store Portal)
    |--------------------------------------------------------------------------
    */
    Route::prefix('customers')->group(function () {
        Route::get('/', [CustomerController::class, 'index']);
        Route::post('/', [CustomerController::class, 'store']);
        Route::get('/{id}', [CustomerController::class, 'show']);
        Route::put('/{id}', [CustomerController::class, 'update']);
        Route::delete('/{id}', [CustomerController::class, 'destroy']);
        Route::get('/lookup/ic/{ic}', [CustomerController::class, 'lookupByIc']);
    });

    /*
    |--------------------------------------------------------------------------
    | Pledge Configuration
    |--------------------------------------------------------------------------
    */
    Route::prefix('pledges')->group(function () {
        Route::get('/config/{customer_id}', [PledgeConfigController::class, 'getForCustomer']);
        Route::get('/config/branch/{branch_id}', [PledgeConfigController::class, 'getByBranch']);
        Route::get('/config/duration/{customer_id}', [PledgeConfigController::class, 'getDurationForCustomer']);
        Route::get('/config/monthly-rates/{customer_id}', [PledgeConfigController::class, 'getMonthlyRatesForCustomer']);
    });

    /*
    |--------------------------------------------------------------------------
    | Admin Pledge Configuration Management
    |--------------------------------------------------------------------------
    */
    Route::prefix('admin/pledges')->group(function () {
        Route::get('/configs', [PledgeConfigController::class, 'getAllConfigurations']);
        Route::put('/config/{rule_set_id}', [PledgeConfigController::class, 'updateConfiguration']);
    });

});
