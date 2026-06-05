<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pledges', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('pledge_no')->unique();
            $table->uuid('branch_id');
            $table->uuid('customer_id');
            $table->uuid('parent_pledge_id')->nullable();
            $table->uuid('rule_set_id');
            $table->uuid('staff_id');
            $table->decimal('loan_amount', 10, 2);
            $table->decimal('item_value', 10, 2);
            $table->decimal('fee_per_month', 10, 2);
            $table->decimal('fee_paid_cumulative', 10, 2)->default(0);
            $table->decimal('gross_weight', 10, 3)->default(0);
            $table->unsignedSmallInteger('total_qty')->default(0);
            $table->decimal('total_assessed_value', 10, 2)->default(0);
            $table->decimal('cash_amount', 10, 2)->default(0);
            $table->decimal('bank_amount', 10, 2)->default(0);
            $table->string('bank_reference')->nullable();
            $table->text('notes')->nullable();
            $table->enum('status', ['active', 'renewed', 'redeemed', 'auctioned', 'forfeited']);
            $table->datetime('pledged_at');
            $table->date('expires_at');
            $table->datetime('renewed_at')->nullable();
            $table->datetime('redeemed_at')->nullable();
            $table->datetime('auctioned_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('status');
            $table->index('expires_at');
            $table->foreign('branch_id')->references('id')->on('branches')->onDelete('restrict');
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('restrict');
            $table->foreign('rule_set_id')->references('id')->on('pledge_rule_sets')->onDelete('restrict');
            $table->foreign('staff_id')->references('id')->on('users')->onDelete('restrict');
        });

        // Self-referential FK must be added after table creation on PostgreSQL
        Schema::table('pledges', function (Blueprint $table) {
            $table->foreign('parent_pledge_id')->references('id')->on('pledges')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('pledges', function (Blueprint $table) {
            $table->dropForeign(['parent_pledge_id']);
        });
        Schema::dropIfExists('pledges');
    }
};
