<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Consolidated Lookup Tables
     * Reference data for customer classifications, product types, and fee categories
     */
    public function up(): void
    {
        // Customer Titles
        Schema::create('customer_titles', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name')->unique();
            $table->timestamps();
            $table->softDeletes();
        });

        // Races
        Schema::create('races', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name')->unique();
            $table->timestamps();
            $table->softDeletes();
        });

        // Religions
        Schema::create('religions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name')->unique();
            $table->timestamps();
            $table->softDeletes();
        });

        // Nationalities
        Schema::create('nationalities', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('code', 10)->nullable()->unique();
            $table->string('name')->unique();
            $table->timestamps();
            $table->softDeletes();
        });

        // Source of Gold Types
        Schema::create('source_of_gold_types', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name')->unique();
            $table->timestamps();
            $table->softDeletes();
        });

        // Categories
        Schema::create('categories', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name')->unique();
            $table->timestamps();
            $table->softDeletes();
        });

        // Gold Qualities
        Schema::create('gold_qualities', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name')->unique();
            $table->decimal('purity_percent', 5, 2);
            $table->timestamps();
            $table->softDeletes();
        });

        // Fee Types
        Schema::create('fee_types', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('code')->unique();
            $table->string('name')->unique();
            $table->text('description')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fee_types');
        Schema::dropIfExists('gold_qualities');
        Schema::dropIfExists('categories');
        Schema::dropIfExists('source_of_gold_types');
        Schema::dropIfExists('nationalities');
        Schema::dropIfExists('religions');
        Schema::dropIfExists('races');
        Schema::dropIfExists('customer_titles');
    }
};
