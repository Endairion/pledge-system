<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Branch;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'customer_no' => 'CST-' . Str::padLeft($this->faker->unique()->numberBetween(1, 99999), 5, '0'),
            'branch_id' => Branch::factory(),
            'full_name' => fake()->name(),
            'id_type' => 'IC',
            'id_number' => fake()->unique()->numerify('##########-##-####'),
            'gender' => fake()->randomElement(['M', 'F']),
            'date_of_birth' => fake()->dateTimeBetween('-70 years', '-18 years')->format('Y-m-d'),
            'phone' => fake()->phoneNumber(),
            'email' => fake()->unique()->safeEmail(),
            'address' => fake()->address(),
            'authorized_loan_limit' => 200000,
            'is_blacklisted' => false,
            'blacklisted_reason' => null,
        ];
    }

    /**
     * State for a blacklisted customer
     */
    public function blacklisted(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_blacklisted' => true,
            'blacklisted_reason' => 'High-risk customer',
        ]);
    }
}

