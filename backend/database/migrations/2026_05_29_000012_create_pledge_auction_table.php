<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pledge_auction', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('pledge_id')->unique();
            $table->uuid('staff_id');
            $table->unsignedSmallInteger('months_elapsed');
            $table->decimal('total_fee', 10, 2);
            $table->decimal('fee_paid_previously', 10, 2)->default(0);
            $table->decimal('fee_outstanding', 10, 2);
            $table->decimal('principal_amount', 10, 2);
            $table->decimal('outstanding_debt', 10, 2);
            $table->decimal('auction_proceeds', 10, 2);
            $table->decimal('surplus_amount', 10, 2)->default(0);
            $table->datetime('surplus_returned_at')->nullable();
            $table->datetime('transacted_at');
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('pledge_id')->references('id')->on('pledges')->onDelete('restrict');
            $table->foreign('staff_id')->references('id')->on('users')->onDelete('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pledge_auction');
    }
};
