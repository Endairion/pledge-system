<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Consolidated Pledge Transaction Tables
     * Includes pledges, items, renewals, redemptions, and auctions
     */
    public function up(): void
    {
        // Pledges - Main pledge/loan records
        Schema::create('pledges', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('branch_id');
            $table->uuid('customer_id');
            $table->uuid('rule_set_id');
            $table->string('pledge_number')->unique();
            $table->enum('compliance_type', ['conventional', 'arrahnu']);
            $table->decimal('loan_amount', 12, 2);
            $table->decimal('gold_weight', 8, 3); // in grams
            $table->decimal('gold_value_at_pledge', 12, 2);
            $table->date('pledge_date');
            $table->date('maturity_date');
            $table->date('redemption_date')->nullable();
            $table->enum('status', ['active', 'redeemed', 'forfeited', 'renewed', 'auctioned'])->default('active');
            $table->text('notes')->nullable();
            $table->uuid('created_by');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('branch_id')->references('id')->on('branches')->onDelete('restrict');
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('restrict');
            $table->foreign('rule_set_id')->references('id')->on('pledge_rule_sets')->onDelete('restrict');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('restrict');
        });

        // Pledge Items - Individual gold items in pledges
        Schema::create('pledge_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('pledge_id');
            $table->uuid('gold_quality_id');
            $table->uuid('source_of_gold_type_id');
            $table->uuid('category_id');
            $table->string('description');
            $table->decimal('weight', 8, 3); // in grams
            $table->decimal('purity_percentage', 5, 2);
            $table->decimal('value_at_pledge', 12, 2);
            $table->string('condition')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('pledge_id')->references('id')->on('pledges')->onDelete('cascade');
            $table->foreign('gold_quality_id')->references('id')->on('gold_qualities')->onDelete('restrict');
            $table->foreign('source_of_gold_type_id')->references('id')->on('source_of_gold_types')->onDelete('restrict');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('restrict');
        });

        // Pledge Renewals - Pledge renewal transactions
        Schema::create('pledge_renew', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('pledge_id');
            $table->uuid('original_pledge_id')->nullable();
            $table->decimal('renewal_loan_amount', 12, 2);
            $table->decimal('interest_charged', 12, 2);
            $table->date('renewal_date');
            $table->date('new_maturity_date');
            $table->string('status')->default('active');
            $table->uuid('approved_by')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('pledge_id')->references('id')->on('pledges')->onDelete('restrict');
            $table->foreign('original_pledge_id')->references('id')->on('pledges')->onDelete('set null');
            $table->foreign('approved_by')->references('id')->on('users')->onDelete('set null');
        });

        // Pledge Redemptions - Pledge redemption records
        Schema::create('pledge_redeem', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('pledge_id');
            $table->decimal('redemption_amount', 12, 2);
            $table->decimal('interest_paid', 12, 2);
            $table->decimal('fees_paid', 12, 2);
            $table->date('redemption_date');
            $table->enum('payment_method', ['cash', 'check', 'transfer', 'other'])->default('cash');
            $table->string('transaction_reference')->nullable();
            $table->uuid('processed_by');
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('pledge_id')->references('id')->on('pledges')->onDelete('restrict');
            $table->foreign('processed_by')->references('id')->on('users')->onDelete('restrict');
        });

        // Pledge Auctions - Auction records for forfeited pledges
        Schema::create('pledge_auction', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('pledge_id');
            $table->date('auction_date');
            $table->decimal('starting_bid', 12, 2);
            $table->decimal('hammer_price', 12, 2)->nullable();
            $table->string('buyer_name')->nullable();
            $table->string('buyer_ic')->nullable();
            $table->enum('status', ['scheduled', 'completed', 'cancelled'])->default('scheduled');
            $table->text('notes')->nullable();
            $table->uuid('conducted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('pledge_id')->references('id')->on('pledges')->onDelete('restrict');
            $table->foreign('conducted_by')->references('id')->on('users')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pledge_auction');
        Schema::dropIfExists('pledge_redeem');
        Schema::dropIfExists('pledge_renew');
        Schema::dropIfExists('pledge_items');
        Schema::dropIfExists('pledges');
    }
};
