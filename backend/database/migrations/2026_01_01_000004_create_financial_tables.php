<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Consolidated Financial Tables
     * Includes gold rates and fee configurations
     */
    public function up(): void
    {
        // Gold Rates - Gold pricing per quality and compliance type
        Schema::create('gold_rates', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('gold_quality_id');
            $table->enum('compliance_type', ['conventional', 'arrahnu']);
            $table->decimal('rate_per_gram', 12, 4);
            $table->timestamp('effective_date');
            $table->uuid('created_by')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('gold_quality_id')->references('id')->on('gold_qualities')->onDelete('restrict');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('set null');
        });

        // Branch Fee Configs - Fee configuration per branch and rule set
        Schema::create('branch_fee_configs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('branch_id');
            $table->uuid('rule_set_id');
            $table->string('fee_type'); // processing, storage, insurance, etc.
            $table->enum('fee_basis', ['flat', 'percentage', 'tiered'])->default('flat');
            $table->decimal('fee_amount', 12, 4);
            $table->json('fee_tiers')->nullable(); // For tiered fees
            $table->date('effective_from');
            $table->date('effective_to')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('branch_id')->references('id')->on('branches')->onDelete('cascade');
            $table->foreign('rule_set_id')->references('id')->on('pledge_rule_sets')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('branch_fee_configs');
        Schema::dropIfExists('gold_rates');
    }
};
