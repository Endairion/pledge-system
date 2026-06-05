<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('branch_fee_configs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('branch_id');
            $table->uuid('rule_set_id');
            $table->uuid('fee_type_id');
            $table->enum('calculation_type', ['fixed', 'percentage']);
            $table->decimal('amount', 10, 2);
            $table->enum('applies_to', ['loan_amount', 'item_value', 'interest_amount'])->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('branch_id')->references('id')->on('branches')->onDelete('restrict');
            $table->foreign('rule_set_id')->references('id')->on('pledge_rule_sets')->onDelete('restrict');
            $table->foreign('fee_type_id')->references('id')->on('fee_types')->onDelete('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('branch_fee_configs');
    }
};
