<?php

namespace Database\Seeders;

use App\Models\Branch;
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
                'compliance_type' => 'conventional', // HQ manages both types
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

            // Seed pledge_sequences counter (starts at 0)
            PledgeSequence::firstOrCreate(['branch_id' => $branch->id], ['last_no' => 0]);
        }
    }
}
