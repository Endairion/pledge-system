<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Remove is_active from lookup tables - use soft deletes instead for better performance
     */
    public function up(): void
    {
        $tables = [
            'customer_titles',
            'races',
            'religions',
            'nationalities',
            'source_of_gold_types',
            'gold_qualities',
            'fee_types',
            'categories',
            'branches',
        ];

        foreach ($tables as $table) {
            if (Schema::hasTable($table) && Schema::hasColumn($table, 'is_active')) {
                Schema::table($table, function (Blueprint $table) {
                    $table->dropColumn('is_active');
                });
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $tables = [
            'customer_titles',
            'races',
            'religions',
            'nationalities',
            'source_of_gold_types',
            'gold_qualities',
            'fee_types',
            'categories',
            'branches',
        ];

        foreach ($tables as $table) {
            if (Schema::hasTable($table) && !Schema::hasColumn($table, 'is_active')) {
                Schema::table($table, function (Blueprint $table) {
                    $table->boolean('is_active')->default(true)->after('name');
                });
            }
        }
    }
};
