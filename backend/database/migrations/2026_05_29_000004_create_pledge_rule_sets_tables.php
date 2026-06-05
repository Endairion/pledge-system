<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pledge_rule_sets', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('branch_id');
            $table->string('name');
            $table->enum('calculation_model', [
                'flat_rate',
                'tiered_rate',
                'compound',
                'sliding_scale',
                'ujrah_fixed',
                'ujrah_tiered',
            ]);
            $table->date('effective_from');
            $table->date('effective_to')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('branch_id')->references('id')->on('branches')->onDelete('restrict');
        });

        Schema::create('pledge_rule_set_params', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('rule_set_id');
            $table->string('param_key');
            $table->string('param_value');
            $table->enum('param_type', ['integer', 'decimal', 'boolean', 'string']);
            $table->timestamps();
            $table->softDeletes();

            $table->unique(['rule_set_id', 'param_key']);
            $table->foreign('rule_set_id')->references('id')->on('pledge_rule_sets')->onDelete('cascade');
        });

        Schema::create('interest_tiers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('rule_set_id');
            $table->decimal('min_amount', 12, 2);
            $table->decimal('max_amount', 12, 2)->nullable();
            $table->decimal('rate_percentage', 8, 4);
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('rule_set_id')->references('id')->on('pledge_rule_sets')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('interest_tiers');
        Schema::dropIfExists('pledge_rule_set_params');
        Schema::dropIfExists('pledge_rule_sets');
    }
};
