<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pledge_renew', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('pledge_id');
            $table->uuid('staff_id');
            $table->unsignedSmallInteger('months_elapsed');
            $table->decimal('fee_per_month', 10, 2);
            $table->decimal('total_fee', 10, 2);
            $table->decimal('fee_paid_previously', 10, 2)->default(0);
            $table->decimal('fee_outstanding_before', 10, 2);
            $table->decimal('amount_paid', 10, 2);
            $table->decimal('fee_outstanding_after', 10, 2)->default(0);
            $table->decimal('cash_amount', 10, 2)->default(0);
            $table->decimal('bank_amount', 10, 2)->default(0);
            $table->string('bank_reference')->nullable();
            $table->string('payment_slip_path', 500)->nullable();
            $table->enum('status', ['completed', 'pending_approval', 'approved', 'rejected'])->default('completed');
            $table->uuid('approved_by')->nullable();
            $table->datetime('approved_at')->nullable();
            $table->uuid('rejected_by')->nullable();
            $table->datetime('rejected_at')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->decimal('to_pay_amount', 10, 2);
            $table->decimal('received_amount', 10, 2)->default(0);
            $table->decimal('changed_amount', 10, 2)->default(0);
            $table->string('third_party_name')->nullable();
            $table->string('third_party_ic')->nullable();
            $table->text('third_party_address')->nullable();
            $table->string('third_party_phone')->nullable();
            $table->uuid('third_party_race_id')->nullable();
            $table->date('expires_at');
            $table->datetime('transacted_at');
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('pledge_id')->references('id')->on('pledges')->onDelete('restrict');
            $table->foreign('staff_id')->references('id')->on('users')->onDelete('restrict');
            $table->foreign('approved_by')->references('id')->on('users')->onDelete('restrict');
            $table->foreign('rejected_by')->references('id')->on('users')->onDelete('restrict');
            $table->foreign('third_party_race_id')->references('id')->on('races')->onDelete('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pledge_renew');
    }
};
