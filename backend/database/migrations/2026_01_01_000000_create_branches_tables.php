<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Consolidated Branch & Configuration Tables
     * Includes branch management and branch-level settings
     */
    public function up(): void
    {
        // Branches
        Schema::create('branches', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('code', 50)->unique();
            $table->enum('compliance_type', ['conventional', 'arrahnu']);
            $table->string('pledge_prefix', 10);
            $table->string('registration_no', 50)->nullable();
            $table->string('address')->nullable();
            $table->string('phone', 20)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        // Pledge Sequences - Counter for pledge numbering per branch
        Schema::create('pledge_sequences', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('branch_id')->unique();
            $table->bigInteger('last_no')->default(0);
            $table->timestamps();

            $table->foreign('branch_id')->references('id')->on('branches')->onDelete('cascade');
        });

        // Branch Configs - Key-value configuration pairs
        Schema::create('branch_configs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('branch_id');
            $table->string('key');
            $table->longText('value')->nullable();
            $table->timestamps();

            $table->unique(['branch_id', 'key']);
            $table->foreign('branch_id')->references('id')->on('branches')->onDelete('cascade');
        });

        // Seed HQ branch as default
        $this->seedDefaultBranches();
    }

    public function down(): void
    {
        Schema::dropIfExists('branch_configs');
        Schema::dropIfExists('pledge_sequences');
        Schema::dropIfExists('branches');
    }

    private function seedDefaultBranches(): void
    {
        $hqId = \Illuminate\Support\Str::uuid();
        
        DB::table('branches')->insert([
            [
                'id' => $hqId,
                'name' => 'Headquarters',
                'code' => 'HQ',
                'compliance_type' => 'conventional',
                'pledge_prefix' => 'HQ',
                'registration_no' => null,
                'address' => null,
                'phone' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // Create pledge sequence for HQ
        DB::table('pledge_sequences')->insert([
            [
                'id' => \Illuminate\Support\Str::uuid(),
                'branch_id' => $hqId,
                'last_no' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
};
