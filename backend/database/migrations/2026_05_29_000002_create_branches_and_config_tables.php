<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('branches', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('code')->unique();
            $table->enum('compliance_type', ['arrahnu', 'conventional']);
            $table->string('pledge_prefix');
            $table->string('registration_no')->nullable();
            $table->text('address')->nullable();
            $table->string('phone')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('pledge_sequences', function (Blueprint $table) {
            $table->uuid('branch_id');
            $table->unsignedInteger('last_no')->default(0);
            $table->primary('branch_id');
            $table->foreign('branch_id')->references('id')->on('branches')->onDelete('restrict');
        });

        Schema::create('branch_configs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('branch_id');
            $table->string('config_key');
            $table->text('config_value');
            $table->timestamps();
            $table->softDeletes();

            $table->unique(['branch_id', 'config_key']);
            $table->foreign('branch_id')->references('id')->on('branches')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('branch_configs');
        Schema::dropIfExists('pledge_sequences');
        Schema::dropIfExists('branches');
    }
};
