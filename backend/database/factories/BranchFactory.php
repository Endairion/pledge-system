<?php

namespace Database\Factories;

use App\Models\Branch;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Branch>
 */
class BranchFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company() . ' Branch',
            'code' => fake()->unique()->lexify('BR-????'),
            'compliance_type' => fake()->randomElement(['arrahnu', 'conventional']),
            'pledge_prefix' => fake()->lexify('PLG-????'),
            'address' => fake()->address(),
            'phone' => fake()->phoneNumber(),
        ];
    }
}
