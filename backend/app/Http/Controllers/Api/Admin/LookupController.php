<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\LookupService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Controller for managing lookup tables.
 * 
 * Handles HTTP requests for lookup table CRUD operations with delegation
 * to LookupService for model resolution and business logic.
 */
class LookupController extends Controller
{
    /**
     * Initialize the controller with the lookup service.
     *
     * @param LookupService $lookupService
     */
    public function __construct(private LookupService $lookupService)
    {
    }

    /**
     * Get all lookup tables metadata.
     *
     * @return JsonResponse
     */
    public function metadata(): JsonResponse
    {
        return response()->json(['data' => $this->lookupService->getMetadata()]);
    }

    /**
     * List all records for a lookup table.
     *
     * @param string $table The lookup table identifier
     * @return JsonResponse
     */
    public function index(string $table): JsonResponse
    {
        try {
            $records = $this->lookupService->getAllRecords($table);
            return response()->json(['data' => $records]);
        } catch (\InvalidArgumentException $e) {
            return response()->json(['error' => 'Invalid lookup table'], 404);
        }
    }

    /**
     * Store a new record in a lookup table.
     *
     * @param Request $request
     * @param string $table The lookup table identifier
     * @return JsonResponse
     */
    public function store(Request $request, string $table): JsonResponse
    {
        try {
            $tableName = $this->lookupService->getTableName($table);
            if (!$tableName) {
                return response()->json(['error' => 'Invalid lookup table'], 404);
            }

            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:' . $tableName . ',name',
                'is_active' => 'boolean',
            ]);

            $record = $this->lookupService->createRecord($table, $validated);
            return response()->json(['data' => $record], 201);
        } catch (\InvalidArgumentException $e) {
            return response()->json(['error' => 'Invalid lookup table'], 404);
        }
    }

    /**
     * Show a single record from a lookup table.
     *
     * @param string $table The lookup table identifier
     * @param string $id The record ID
     * @return JsonResponse
     */
    public function show(string $table, string $id): JsonResponse
    {
        try {
            $record = $this->lookupService->getRecord($table, $id);
            if (!$record) {
                return response()->json(['error' => 'Record not found'], 404);
            }

            return response()->json(['data' => $record]);
        } catch (\InvalidArgumentException $e) {
            return response()->json(['error' => 'Invalid lookup table'], 404);
        }
    }

    /**
     * Update a record in a lookup table.
     *
     * @param Request $request
     * @param string $table The lookup table identifier
     * @param string $id The record ID
     * @return JsonResponse
     */
    public function update(Request $request, string $table, string $id): JsonResponse
    {
        try {
            $tableName = $this->lookupService->getTableName($table);
            if (!$tableName) {
                return response()->json(['error' => 'Invalid lookup table'], 404);
            }

            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:' . $tableName . ',name,' . $id,
                'is_active' => 'boolean',
            ]);

            $record = $this->lookupService->updateRecord($table, $id, $validated);
            if (!$record) {
                return response()->json(['error' => 'Record not found'], 404);
            }

            return response()->json(['data' => $record]);
        } catch (\InvalidArgumentException $e) {
            return response()->json(['error' => 'Invalid lookup table'], 404);
        }
    }

    /**
     * Delete a record from a lookup table (soft delete).
     *
     * @param string $table The lookup table identifier
     * @param string $id The record ID
     * @return JsonResponse
     */
    public function destroy(string $table, string $id): JsonResponse
    {
        try {
            $deleted = $this->lookupService->deleteRecord($table, $id);
            if (!$deleted) {
                return response()->json(['error' => 'Record not found'], 404);
            }

            return response()->json(['data' => null], 204);
        } catch (\InvalidArgumentException $e) {
            return response()->json(['error' => 'Invalid lookup table'], 404);
        }
    }
}
