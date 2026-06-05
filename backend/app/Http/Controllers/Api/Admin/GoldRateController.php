<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\GoldRateService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Auth\AuthorizationException;

/**
 * Controller for managing gold rates.
 * 
 * Handles HTTP requests for gold rate CRUD operations with delegation
 * to GoldRateService for business logic.
 */
class GoldRateController extends Controller
{
    /**
     * Initialize the controller with the gold rate service.
     *
     * @param GoldRateService $goldRateService
     */
    public function __construct(private GoldRateService $goldRateService)
    {
    }

    /**
     * List gold rates by compliance type.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $user = auth()->user();
        $userBranch = $user->branch;
        $complianceType = $request->query('compliance_type') ?? $userBranch->compliance_type;

        $rates = $this->goldRateService->getRatesByComplianceType($user, $complianceType);

        return response()->json(['data' => $rates]);
    }

    /**
     * Store a new gold rate (soft delete old one if exists).
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $user = auth()->user();
        $userBranch = $user->branch;

        $validated = $request->validate([
            'quality_id' => 'required|uuid|exists:gold_qualities,id',
            'min_rate' => 'required|numeric|min:0',
            'max_rate' => 'required|numeric|min:0|gte:min_rate',
            'compliance_type' => 'nullable|string|in:arrahnu,conventional',
        ]);

        // Use provided compliance_type or default to user's branch compliance type
        $complianceType = $validated['compliance_type'] ?? $userBranch->compliance_type;

        $goldRate = $this->goldRateService->createOrReplaceRate(
            $user,
            $complianceType,
            $validated['quality_id'],
            (float) $validated['min_rate'],
            (float) $validated['max_rate']
        );

        return response()->json(['data' => $goldRate], 201);
    }

    /**
     * Delete a gold rate.
     *
     * @param string $id
     * @return JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        $user = auth()->user();

        try {
            $deleted = $this->goldRateService->deleteRate($user, $id);
            
            if (!$deleted) {
                return response()->json(['error' => 'Gold rate not found'], 404);
            }

            return response()->json(['data' => null], 204);
        } catch (AuthorizationException $e) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
    }
}
