<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\ComplianceType;
use App\Models\PledgeRuleSet;
use App\Models\PledgeRuleSetParam;
use App\Models\PledgeRuleSetTemplate;
use App\Models\PledgeSequence;
use Illuminate\Database\Seeder;

class BranchesSeeder extends Seeder
{
    public function run(): void
    {
        $branches = [
            [
                'name'            => 'Headquarters',
                'code'            => 'HQ',
                'compliance_type' => 'conventional',
                'pledge_prefix'   => 'HQ',
                'registration_no' => null,
                'address'         => null,
                'phone'           => null,
            ],
            [
                'name'            => 'Kedai Emas KDE',
                'code'            => 'KDE',
                'compliance_type' => 'arrahnu',
                'pledge_prefix'   => 'KDE',
                'registration_no' => null,
                'address'         => null,
                'phone'           => null,
            ],
            [
                'name'            => 'Pajak Gadai',
                'code'            => 'PG',
                'compliance_type' => 'conventional',
                'pledge_prefix'   => 'PG',
                'registration_no' => null,
                'address'         => null,
                'phone'           => null,
            ],
            [
                'name'            => 'ArRahnu Setia',
                'code'            => 'ARS',
                'compliance_type' => 'arrahnu',
                'pledge_prefix'   => 'ARS',
                'registration_no' => null,
                'address'         => null,
                'phone'           => null,
            ],
        ];

        foreach ($branches as $data) {
            $branch = Branch::firstOrCreate(['code' => $data['code']], $data);

            // Create pledge sequence for this branch
            PledgeSequence::firstOrCreate(
                ['branch_id' => $branch->id],
                ['id' => \Illuminate\Support\Str::uuid(), 'last_no' => 0]
            );

            // Get the appropriate template for this compliance type
            $template = PledgeRuleSetTemplate::whereHas('complianceType', function ($query) use ($data) {
                $query->where('code', $data['compliance_type']);
            })
            ->where('is_active', true)
            ->first();

            if (!$template) {
                continue; // Skip if no template found
            }

            // Create pledge rule set from template
            $ruleSet = PledgeRuleSet::firstOrCreate(
                ['branch_id' => $branch->id, 'is_active' => true],
                [
                    'name' => "{$data['name']} - Standard Rules",
                    'calculation_model' => $data['compliance_type'] === 'arrahnu' ? 'ujrah_fixed' : 'tiered_rate',
                    'effective_from' => now()->toDateString(),
                    'effective_to' => null,
                    'is_active' => true,
                ]
            );

            // Apply template parameters
            foreach ($template->default_params as $paramKey => $paramValue) {
                PledgeRuleSetParam::firstOrCreate(
                    ['rule_set_id' => $ruleSet->id, 'param_key' => $paramKey],
                    [
                        'param_value' => is_array($paramValue) ? json_encode($paramValue) : (string)$paramValue,
                        'param_type' => 'string',
                    ]
                );
            }
        }
    }
}
