<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('gold_rates', function (Blueprint $table) {
            // Drop the foreign key constraint first
            $table->dropForeign('gold_rates_created_by_foreign');
            // Make created_by nullable
            $table->uuid('created_by')->nullable()->change();
            // Re-add the foreign key with nullable support
            $table->foreign('created_by')->references('id')->on('users')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('gold_rates', function (Blueprint $table) {
            $table->dropForeign('gold_rates_created_by_foreign');
            $table->uuid('created_by')->nullable(false)->change();
            $table->foreign('created_by')->references('id')->on('users')->onDelete('restrict');
        });
    }
};
