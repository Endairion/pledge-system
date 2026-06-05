<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\GoldRate;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

/**
 * Service class for managing gold rates.
 * 
 * Handles all business logic related to gold rate operations including
 * creation, retrieval, updating, and deletion with compliance type isolation.
 */
class GoldRateService
{
    /**
     * Get gold rates filtered by compliance type (globally, not per-branch).
     *
     * @param User $user The authenticated user
     * @param string $complianceType The compliance type to filter by
     * @return Collection Collection of gold rates with loaded relationships
     */
    public function getRatesByComplianceType(User $user, string $complianceType): Collection
    {
        return GoldRate::where('compliance_type', $complianceType)
            ->whereNull('deleted_at')
            ->with('quality')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Create or replace a gold rate for the given quality.
     * 
     * Soft deletes any existing active rate for the same compliance type and quality,
     * then creates a new rate.
     *
     * @param User $user The authenticated user
     * @param string $complianceType The compliance type for this rate
     * @param string $qualityId The ID of the gold quality
     * @param float $minRate The minimum rate value
     * @param float $maxRate The maximum rate value
     * @return GoldRate The newly created gold rate
     */
    public function createOrReplaceRate(
        User $user,
        string $complianceType,
        string $qualityId,
        float $minRate,
        float $maxRate
    ): GoldRate {
        // Soft delete any existing active rate for this compliance_type/quality combination
        GoldRate::where('compliance_type', $complianceType)
            ->where('quality_id', $qualityId)
            ->whereNull('deleted_at')
            ->delete();

        // Create new rate with specified compliance type (global, not branch-specific)
        return GoldRate::create([
            'compliance_type' => $complianceType,
            'quality_id' => $qualityId,
            'min_rate' => $minRate,
            'max_rate' => $maxRate,
            'created_by' => $user->id,
        ])->load('quality');
    }

    /**
     * Delete a gold rate if user has permission.
     *
     * @param User $user The authenticated user
     * @param string $rateId The ID of the gold rate to delete
     * @return bool True if deleted successfully, false if not found or unauthorized
     * @throws \Illuminate\Auth\AuthorizationException If user is not authorized
     */
    public function deleteRate(User $user, string $rateId): bool
    {
        $goldRate = GoldRate::find($rateId);

        if (!$goldRate) {
            return false;
        }

        // Only allow deleting rates from user's compliance type
        if ($goldRate->compliance_type !== $user->branch->compliance_type) {
            throw new \Illuminate\Auth\AuthorizationException('Unauthorized to delete this rate');
        }

        $goldRate->delete();

        return true;
    }
}
