<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     * This migration is now a no-op since product_id is no longer created in gold_rates.
     * Kept for migration history consistency.
     */
    public function up(): void
    {
        // Product_id column not created in gold_rates anymore
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No rollback needed
    }
};
