<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Branch;
use App\Models\User;
use App\Models\PledgeSequence;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Create HQ branch if it doesn't exist
        $hqBranch = Branch::firstOrCreate(
            ['code' => 'HQ'],
            [
                'name'            => 'Headquarters',
                'compliance_type' => 'conventional',
                'pledge_prefix'   => 'HQ',
                'registration_no' => null,
                'address'         => null,
                'phone'           => null,
            ]
        );

        // Create pledge sequence for HQ branch
        PledgeSequence::firstOrCreate(
            ['branch_id' => $hqBranch->id],
            ['last_no' => 0]
        );

        // Update super_admin user to be assigned to HQ branch
        User::where('name', 'super_admin')
            ->whereNull('branch_id')
            ->update(['branch_id' => $hqBranch->id]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Get HQ branch
        $hqBranch = Branch::where('code', 'HQ')->first();
        
        if ($hqBranch) {
            // Revert super_admin back to null branch_id
            User::where('name', 'super_admin')
                ->where('branch_id', $hqBranch->id)
                ->update(['branch_id' => null]);

            // Delete pledge sequence for HQ
            PledgeSequence::where('branch_id', $hqBranch->id)->delete();

            // Optionally delete HQ branch
            $hqBranch->delete();
        }
    }
};
