<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Add is_active to lookup tables
        Schema::table('customer_titles', function (Blueprint $table) {
            if (!Schema::hasColumn('customer_titles', 'is_active')) {
                $table->boolean('is_active')->default(true)->after('name');
            }
        });

        Schema::table('races', function (Blueprint $table) {
            if (!Schema::hasColumn('races', 'is_active')) {
                $table->boolean('is_active')->default(true)->after('name');
            }
        });

        Schema::table('religions', function (Blueprint $table) {
            if (!Schema::hasColumn('religions', 'is_active')) {
                $table->boolean('is_active')->default(true)->after('name');
            }
        });

        Schema::table('nationalities', function (Blueprint $table) {
            if (!Schema::hasColumn('nationalities', 'is_active')) {
                $table->boolean('is_active')->default(true)->after('name');
            }
        });

        Schema::table('source_of_gold_types', function (Blueprint $table) {
            if (!Schema::hasColumn('source_of_gold_types', 'is_active')) {
                $table->boolean('is_active')->default(true)->after('name');
            }
        });

        Schema::table('fee_types', function (Blueprint $table) {
            if (!Schema::hasColumn('fee_types', 'is_active')) {
                $table->boolean('is_active')->default(true)->after('name');
            }
        });
    }

    public function down(): void
    {
        Schema::table('customer_titles', function (Blueprint $table) {
            $table->dropColumn('is_active');
        });

        Schema::table('races', function (Blueprint $table) {
            $table->dropColumn('is_active');
        });

        Schema::table('religions', function (Blueprint $table) {
            $table->dropColumn('is_active');
        });

        Schema::table('nationalities', function (Blueprint $table) {
            $table->dropColumn('is_active');
        });

        Schema::table('source_of_gold_types', function (Blueprint $table) {
            $table->dropColumn('is_active');
        });

        Schema::table('fee_types', function (Blueprint $table) {
            $table->dropColumn('is_active');
        });
    }
};
