<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('customer_no')->unique();
            $table->uuid('branch_id');
            $table->uuid('staff_id');
            $table->uuid('title_id')->nullable();
            $table->string('full_name');
            $table->enum('id_type', ['nric', 'passport', 'other']);
            $table->string('id_number')->unique();
            $table->date('date_of_birth');
            $table->enum('gender', ['male', 'female']);
            $table->uuid('race_id')->nullable();
            $table->uuid('religion_id')->nullable();
            $table->uuid('nationality_id')->nullable();
            $table->string('phone');
            $table->string('email')->nullable();
            $table->text('address');
            $table->string('occupation_type')->nullable();
            $table->string('occupation_field')->nullable();
            $table->string('purpose_of_transaction')->nullable();
            $table->uuid('source_of_gold_id')->nullable();
            $table->decimal('authorized_loan_limit', 10, 2)->default(0);
            $table->decimal('loan_limit', 10, 2)->default(0);
            $table->boolean('is_blacklisted')->default(false);
            $table->text('blacklisted_reason')->nullable();
            $table->datetime('blacklisted_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('phone');
            $table->foreign('branch_id')->references('id')->on('branches')->onDelete('restrict');
            $table->foreign('title_id')->references('id')->on('customer_titles')->onDelete('restrict');
            $table->foreign('race_id')->references('id')->on('races')->onDelete('restrict');
            $table->foreign('religion_id')->references('id')->on('religions')->onDelete('restrict');
            $table->foreign('nationality_id')->references('id')->on('nationalities')->onDelete('restrict');
            $table->foreign('source_of_gold_id')->references('id')->on('source_of_gold_types')->onDelete('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
