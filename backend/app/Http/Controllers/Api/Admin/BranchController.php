<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\PledgeRuleSet;
use App\Models\PledgeRuleSetParam;
use App\Models\PledgeRuleSetTemplate;
use App\Models\PledgeSequence;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BranchController extends Controller
{
    /**
     * Get all branches
     */
    public function index(Request $request): JsonResponse
    {
        if (!auth()->check() || !auth()->user()->isAdmin()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $branches = Branch::all();

        return response()->json([
            'data' => $branches,
            'count' => $branches->count()
        ]);
    }

    /**
     * Create a new branch
     */
    public function store(Request $request): JsonResponse
    {
        if (!auth()->check() || !auth()->user()->isAdmin()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:branches,code',
            'compliance_type' => 'required|in:conventional,arrahnu',
            'pledge_prefix' => 'required|string|max:10',
            'registration_no' => 'nullable|string|max:50',
            'address' => 'nullable|string|max:500',
            'phone' => 'nullable|string|max:20',
        ]);

        try {
            $branch = Branch::create($validated);

            // Create pledge sequence for this branch
            PledgeSequence::create([
                'branch_id' => $branch->id,
                'last_no' => 0,
            ]);

            // Get the appropriate template for this compliance type
            $template = PledgeRuleSetTemplate::where('compliance_type_id', function ($query) use ($validated) {
                $query->select('id')
                    ->from('compliance_types')
                    ->where('code', $validated['compliance_type'])
                    ->limit(1);
            })
            ->where('is_active', true)
            ->first();

            if (!$template) {
                throw new \Exception("No active template found for compliance type: {$validated['compliance_type']}");
            }

            // Create pledge rule set from template
            $ruleSet = PledgeRuleSet::create([
                'branch_id' => $branch->id,
                'name' => "{$validated['name']} - Standard Rules",
                'calculation_model' => $validated['compliance_type'],
                'effective_from' => now()->toDateString(),
                'effective_to' => null,
                'is_active' => true,
            ]);

            // Apply template parameters
            foreach ($template->default_params as $paramKey => $paramValue) {
                PledgeRuleSetParam::create([
                    'rule_set_id' => $ruleSet->id,
                    'param_key' => $paramKey,
                    'param_value' => is_array($paramValue) ? json_encode($paramValue) : (string)$paramValue,
                    'param_type' => 'string',
                ]);
            }

            return response()->json([
                'data' => $branch,
                'message' => 'Branch created successfully'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to create branch: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get a single branch
     */
    public function show(Request $request, string $id): JsonResponse
    {
        if (!auth()->check() || !auth()->user()->isAdmin()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $branch = Branch::find($id);

        if (!$branch) {
            return response()->json(['error' => 'Branch not found'], 404);
        }

        return response()->json(['data' => $branch]);
    }

    /**
     * Update a branch
     */
    public function update(Request $request, string $id): JsonResponse
    {
        if (!auth()->check() || !auth()->user()->isAdmin()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $branch = Branch::find($id);

        if (!$branch) {
            return response()->json(['error' => 'Branch not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'code' => 'sometimes|string|max:50|unique:branches,code,' . $id,
            'compliance_type' => 'sometimes|in:conventional,arrahnu',
            'pledge_prefix' => 'sometimes|string|max:10',
            'registration_no' => 'nullable|string|max:50',
            'address' => 'nullable|string|max:500',
            'phone' => 'nullable|string|max:20',
        ]);

        try {
            $branch->update($validated);

            return response()->json([
                'data' => $branch,
                'message' => 'Branch updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to update branch: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete a branch
     */
    public function destroy(Request $request, string $id): JsonResponse
    {
        if (!auth()->check() || !auth()->user()->isAdmin()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $branch = Branch::find($id);

        if (!$branch) {
            return response()->json(['error' => 'Branch not found'], 404);
        }

        try {
            $branch->delete();

            return response()->json([
                'message' => 'Branch deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to delete branch: ' . $e->getMessage()
            ], 500);
        }
    }
}
