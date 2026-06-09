<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PledgeRuleSet;
use App\Models\PledgeRuleSetParam;
use App\Models\Customer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Pledge Configuration Controller
 * 
 * Handles pledge configuration endpoints for different branches and compliance types.
 * Provides pledge duration, fee structures, monthly interest rates, and other compliance-related settings.
 */
class PledgeConfigController extends Controller
{
    /**
     * Get full pledge configuration for a customer
     * 
     * Route: GET /api/pledges/config/{customer_id}
     * Returns duration, monthly rates, compliance type, and all rule set parameters
     */
    public function getForCustomer(Request $request, string $customer_id): JsonResponse
    {
        $customer = Customer::find($customer_id);
        
        if (!$customer) {
            return response()->json(['error' => 'Customer not found'], 404);
        }

        $ruleSet = PledgeRuleSet::where('branch_id', $customer->branch_id)
            ->where('is_active', true)
            ->with('params')
            ->first();

        if (!$ruleSet) {
            // Return defaults if no rule set found
            return response()->json([
                'data' => [
                    'duration' => 8,
                    'monthly_rates' => $this->getDefaultMonthlyRates(),
                    'compliance_type' => 'conventional',
                    'source' => 'default'
                ]
            ]);
        }

        // Extract all parameters
        $params = [];
        $monthlyRates = $this->getDefaultMonthlyRates();
        $duration = 8;

        foreach ($ruleSet->params as $param) {
            $params[$param->param_key] = $param->getValue();
            
            // Extract duration if present
            if ($param->param_key === 'pledge_duration') {
                $duration = (int) $param->getValue();
            }
            
            // Extract and parse monthly rates if present
            if ($param->param_key === 'monthly_interest_rates') {
                $monthlyRates = json_decode($param->param_value, true) ?? $this->getDefaultMonthlyRates();
            }
        }

        return response()->json([
            'data' => [
                'rule_set_id' => $ruleSet->id,
                'branch_id' => $ruleSet->branch_id,
                'duration' => $duration,
                'monthly_rates' => $monthlyRates,
                'compliance_type' => $ruleSet->calculation_model,
                'parameters' => $params,
                'source' => 'rule_set'
            ]
        ]);
    }

    /**
     * Get pledge configuration for a branch
     * 
     * Route: GET /api/pledges/config/branch/{branch_id}
     * Returns the active pledge rule set and parameters for the branch
     */
    public function getByBranch(Request $request, string $branch_id): JsonResponse
    {
        $ruleSet = PledgeRuleSet::where('branch_id', $branch_id)
            ->where('is_active', true)
            ->with('params')
            ->first();

        if (!$ruleSet) {
            return response()->json([
                'error' => 'No active pledge rule set found for this branch'
            ], 404);
        }

        // Extract parameters
        $params = [];
        $monthlyRates = $this->getDefaultMonthlyRates();

        foreach ($ruleSet->params as $param) {
            $params[$param->param_key] = $param->getValue();
            
            if ($param->param_key === 'monthly_interest_rates') {
                $monthlyRates = json_decode($param->param_value, true) ?? $this->getDefaultMonthlyRates();
            }
        }

        return response()->json([
            'data' => [
                'rule_set_id' => $ruleSet->id,
                'branch_id' => $ruleSet->branch_id,
                'name' => $ruleSet->name,
                'calculation_model' => $ruleSet->calculation_model,
                'monthly_rates' => $monthlyRates,
                'effective_from' => $ruleSet->effective_from,
                'effective_to' => $ruleSet->effective_to,
                'parameters' => $params,
            ]
        ]);
    }

    /**
     * Get pledge duration for a customer's branch
     * 
     * Route: GET /api/pledges/config/duration/{customer_id}
     * Returns the pledge duration configured for the customer's branch
     */
    public function getDurationForCustomer(Request $request, string $customer_id): JsonResponse
    {
        $customer = Customer::find($customer_id);
        
        if (!$customer) {
            return response()->json(['error' => 'Customer not found'], 404);
        }

        $ruleSet = PledgeRuleSet::where('branch_id', $customer->branch_id)
            ->where('is_active', true)
            ->with('params')
            ->first();

        if (!$ruleSet) {
            // Return default duration of 8 months if no rule set found
            return response()->json([
                'data' => ['duration' => 8, 'source' => 'default']
            ]);
        }

        // Find pledge_duration parameter
        $durationParam = $ruleSet->params()
            ->where('param_key', 'pledge_duration')
            ->first();

        if ($durationParam) {
            return response()->json([
                'data' => [
                    'duration' => (int) $durationParam->getValue(),
                    'source' => 'rule_set'
                ]
            ]);
        }

        // Return default if parameter not found
        return response()->json([
            'data' => ['duration' => 8, 'source' => 'default']
        ]);
    }

    /**
     * Get monthly interest rates for a customer's branch
     * 
     * Route: GET /api/pledges/config/monthly-rates/{customer_id}
     * Returns monthly-based interest rates configured for the customer's branch
     */
    public function getMonthlyRatesForCustomer(Request $request, string $customer_id): JsonResponse
    {
        $customer = Customer::find($customer_id);
        
        if (!$customer) {
            return response()->json(['error' => 'Customer not found'], 404);
        }

        $ruleSet = PledgeRuleSet::where('branch_id', $customer->branch_id)
            ->where('is_active', true)
            ->with('params')
            ->first();

        if (!$ruleSet) {
            // Return default rates if no rule set found
            return response()->json([
                'data' => [
                    'monthly_rates' => $this->getDefaultMonthlyRates(),
                    'compliance_type' => 'conventional',
                    'source' => 'default'
                ]
            ]);
        }

        $monthlyRates = $this->getDefaultMonthlyRates();
        $complianceType = $ruleSet->calculation_model;

        // Find monthly rates parameter
        $ratesParam = $ruleSet->params()
            ->where('param_key', 'monthly_interest_rates')
            ->first();

        if ($ratesParam) {
            $monthlyRates = json_decode($ratesParam->param_value, true) ?? $this->getDefaultMonthlyRates();
        }

        return response()->json([
            'data' => [
                'monthly_rates' => $monthlyRates,
                'compliance_type' => $complianceType,
                'source' => 'rule_set'
            ]
        ]);
    }

    /**
     * Update pledge configuration for a branch
     * 
     * Route: PUT /api/pledges/config/{rule_set_id}
     * Updates interest rates based on compliance type:
     * - conventional: monthly_interest_rates (array)
     * - arrahnu: single_interest_rate (numeric)
     */
    public function updateConfiguration(Request $request, string $rule_set_id): JsonResponse
    {
        // Check authorization - only admins can update
        if (!auth()->check() || !auth()->user()->isAdmin()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $ruleSet = PledgeRuleSet::find($rule_set_id);
        
        if (!$ruleSet) {
            return response()->json(['error' => 'Rule set not found'], 404);
        }

        // Validate based on compliance type
        if ($ruleSet->calculation_model === 'arrahnu') {
            $validated = $request->validate([
                'single_interest_rate' => 'required|numeric|min:0|max:100'
            ]);
        } else {
            // conventional type
            $validated = $request->validate([
                'monthly_interest_rates' => 'required|array',
                'monthly_interest_rates.*' => 'required|numeric|min:0|max:100'
            ]);
        }

        try {
            if ($ruleSet->calculation_model === 'arrahnu') {
                // For arrahnu, store single rate as a JSON with key "1"
                $monthlyRatesValue = json_encode(['1' => (string) $validated['single_interest_rate']]);
            } else {
                // For conventional, store monthly rates
                $monthlyRatesValue = json_encode($validated['monthly_interest_rates']);
            }
            
            PledgeRuleSetParam::updateOrCreate(
                ['rule_set_id' => $ruleSet->id, 'param_key' => 'monthly_interest_rates'],
                ['param_value' => $monthlyRatesValue, 'param_type' => 'string']
            );

            $responseRates = $ruleSet->calculation_model === 'arrahnu'
                ? ['1' => (string) $validated['single_interest_rate']]
                : $validated['monthly_interest_rates'];

            return response()->json([
                'data' => [
                    'message' => 'Configuration updated successfully',
                    'rule_set_id' => $ruleSet->id,
                    'branch_id' => $ruleSet->branch_id,
                    'monthly_rates' => $responseRates
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update configuration: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Get all pledge configurations for admin dashboard
     * 
     * Route: GET /api/admin/pledges/configs
     * Returns all rule sets with their parameters
     */
    public function getAllConfigurations(Request $request): JsonResponse
    {
        // Check authorization - only admins can view
        if (!auth()->check() || !auth()->user()->isAdmin()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $ruleSets = PledgeRuleSet::with('branch', 'params')
            ->where('is_active', true)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($ruleSet) {
                $monthlyRates = $this->getDefaultMonthlyRates();
                $duration = 8;

                foreach ($ruleSet->params as $param) {
                    if ($param->param_key === 'monthly_interest_rates') {
                        $monthlyRates = json_decode($param->param_value, true) ?? $monthlyRates;
                    }
                    if ($param->param_key === 'pledge_duration') {
                        $duration = (int) $param->getValue();
                    }
                }

                return [
                    'id' => $ruleSet->id,
                    'branch_id' => $ruleSet->branch_id,
                    'branch_name' => $ruleSet->branch?->name,
                    'compliance_type' => $ruleSet->branch?->compliance_type,
                    'name' => $ruleSet->name,
                    'calculation_model' => $ruleSet->calculation_model,
                    'monthly_rates' => $monthlyRates,
                    'pledge_duration' => $duration,
                    'effective_from' => $ruleSet->effective_from,
                    'effective_to' => $ruleSet->effective_to,
                ];
            });

        return response()->json([
            'data' => $ruleSets,
            'count' => $ruleSets->count()
        ]);
    }

    /**
     * Get default monthly interest rates
     * Format: {"1": "1.5", "2": "2", ...} where key is month and value is percentage
     */
    private function getDefaultMonthlyRates(): array
    {
        return [
            "1" => "1.5",
            "2" => "2",
            "3" => "2",
            "4" => "2",
            "5" => "2",
            "6" => "2",
            "7" => "2",
            "8" => "2",
        ];
    }
}
