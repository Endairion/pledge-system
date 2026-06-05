<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('gold_rates', function (Blueprint $table) {
            $table->string('compliance_type')->after('branch_id');
            $table->unique(['compliance_type', 'quality_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('gold_rates', function (Blueprint $table) {
            $table->dropUnique(['compliance_type', 'quality_id']);
            $table->dropColumn('compliance_type');
        });
    }
};
