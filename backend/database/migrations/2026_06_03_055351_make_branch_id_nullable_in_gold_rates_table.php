<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Remove branch_id from gold_rates table since rates are compliance-type based, not branch-based.
     */
    public function up(): void
    {
        Schema::table('gold_rates', function (Blueprint $table) {
            // Drop the foreign key constraint first
            $table->dropForeign(['branch_id']);
            // Drop the branch_id column
            $table->dropColumn('branch_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('gold_rates', function (Blueprint $table) {
            $table->uuid('branch_id')->after('id');
            $table->foreign('branch_id')->references('id')->on('branches')->onDelete('restrict');
        });
    }
};
