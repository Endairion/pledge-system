<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Customer Tables
     * Stores customer profiles with demographics and compliance information
     */
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('branch_id');
            $table->string('ic_type', 20); // NRIC, Passport, etc.
            $table->string('ic_number')->unique();
            $table->uuid('title_id');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('address')->nullable();
            $table->uuid('race_id')->nullable();
            $table->uuid('religion_id')->nullable();
            $table->uuid('nationality_id');
            $table->enum('gender', ['male', 'female', 'other']);
            $table->enum('marital_status', ['single', 'married', 'divorced', 'widowed'])->default('single');
            $table->string('occupation')->nullable();
            $table->decimal('monthly_income', 12, 2)->nullable();
            $table->decimal('authorized_loan_limit', 12, 2)->nullable();
            $table->string('staff_id', 50)->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('branch_id')->references('id')->on('branches')->onDelete('restrict');
            $table->foreign('title_id')->references('id')->on('customer_titles')->onDelete('restrict');
            $table->foreign('race_id')->references('id')->on('races')->onDelete('set null');
            $table->foreign('religion_id')->references('id')->on('religions')->onDelete('set null');
            $table->foreign('nationality_id')->references('id')->on('nationalities')->onDelete('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
