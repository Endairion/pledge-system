<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Consolidated Pledge Configuration Tables
     * 
     * Creates:
     * - compliance_types: Different pledge compliance types (arrahnu, conventional, etc.)
     * - pledge_rule_set_templates: Templates for new branch rule sets
     * - pledge_rule_sets: Actual rule sets per branch
     * - pledge_rule_set_params: Individual parameters within rule sets
     * - interest_tiers: Tiered interest rates for complex calculations
     */
    public function up(): void
    {
        // Compliance Types Lookup
        Schema::create('compliance_types', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('code')->unique(); // 'arrahnu', 'conventional'
            $table->string('name');
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });

        // Pledge Rule Set Templates (templates for new branches)
        Schema::create('pledge_rule_set_templates', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('compliance_type_id');
            $table->string('name');
            $table->text('description')->nullable();
            $table->json('default_params'); // Default parameters for this template
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('compliance_type_id')->references('id')->on('compliance_types')->onDelete('restrict');
        });

        // Pledge Rule Sets
        Schema::create('pledge_rule_sets', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('branch_id');
            $table->string('name');
            $table->enum('calculation_model', [
                'flat_rate',
                'tiered_rate',
                'compound',
                'sliding_scale',
                'ujrah_fixed',
                'ujrah_tiered',
            ]);
            $table->date('effective_from');
            $table->date('effective_to')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('branch_id')->references('id')->on('branches')->onDelete('restrict');
        });

        // Pledge Rule Set Parameters
        Schema::create('pledge_rule_set_params', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('rule_set_id');
            $table->string('param_key');
            $table->string('param_value');
            $table->enum('param_type', ['integer', 'decimal', 'boolean', 'string']);
            $table->timestamps();
            $table->softDeletes();

            $table->unique(['rule_set_id', 'param_key']);
            $table->foreign('rule_set_id')->references('id')->on('pledge_rule_sets')->onDelete('cascade');
        });

        // Interest Tiers (for tiered rate calculations)
        Schema::create('interest_tiers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('rule_set_id');
            $table->decimal('min_amount', 12, 2);
            $table->decimal('max_amount', 12, 2)->nullable();
            $table->decimal('rate_percentage', 8, 4);
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('rule_set_id')->references('id')->on('pledge_rule_sets')->onDelete('cascade');
        });

        // Seed compliance types
        $this->seedComplianceTypes();
        // Seed pledge rule set templates
        $this->seedTemplates();
    }

    public function down(): void
    {
        Schema::dropIfExists('interest_tiers');
        Schema::dropIfExists('pledge_rule_set_params');
        Schema::dropIfExists('pledge_rule_sets');
        Schema::dropIfExists('pledge_rule_set_templates');
        Schema::dropIfExists('compliance_types');
    }

    private function seedComplianceTypes(): void
    {
        DB::table('compliance_types')->insert([
            [
                'id' => \Illuminate\Support\Str::uuid(),
                'code' => 'conventional',
                'name' => 'Conventional',
                'description' => 'Conventional pledge with monthly tiered interest rates',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => \Illuminate\Support\Str::uuid(),
                'code' => 'arrahnu',
                'name' => 'Arrahnu',
                'description' => 'Arrahnu (Islamic) pledging with single interest rate',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    private function seedTemplates(): void
    {
        $conventional = DB::table('compliance_types')
            ->where('code', 'conventional')
            ->first();
        
        $arrahnu = DB::table('compliance_types')
            ->where('code', 'arrahnu')
            ->first();

        if ($conventional && $arrahnu) {
            DB::table('pledge_rule_set_templates')->insert([
                [
                    'id' => \Illuminate\Support\Str::uuid(),
                    'compliance_type_id' => $conventional->id,
                    'name' => 'Conventional Standard',
                    'description' => 'Default template for conventional compliance branches',
                    'default_params' => json_encode([
                        'monthly_interest_rates' => [
                            '1' => '1.5',
                            '2' => '2',
                            '3' => '2',
                            '4' => '2',
                            '5' => '2',
                            '6' => '2',
                            '7' => '2',
                            '8' => '2',
                        ]
                    ]),
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'id' => \Illuminate\Support\Str::uuid(),
                    'compliance_type_id' => $arrahnu->id,
                    'name' => 'Arrahnu Standard',
                    'description' => 'Default template for arrahnu compliance branches',
                    'default_params' => json_encode([
                        'monthly_interest_rates' => ['1' => '2.5']
                    ]),
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);
        }
    }
};
