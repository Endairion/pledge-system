<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pledge_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('pledge_id');
            $table->uuid('category_id');
            $table->uuid('quality_id');
            $table->string('serial_num')->nullable();
            $table->string('description');
            $table->unsignedSmallInteger('qty')->default(1);
            $table->decimal('weight', 10, 3);
            $table->decimal('gold_rate', 10, 2);
            $table->decimal('assessed_value', 10, 2);
            $table->decimal('pledge_percent', 5, 2);
            $table->decimal('pledge_amt', 10, 2);
            $table->decimal('item_stg_fee', 10, 2)->default(0);
            $table->text('remarks')->nullable();
            $table->json('image_paths')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('pledge_id')->references('id')->on('pledges')->onDelete('restrict');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('restrict');
            $table->foreign('quality_id')->references('id')->on('gold_qualities')->onDelete('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pledge_items');
    }
};
