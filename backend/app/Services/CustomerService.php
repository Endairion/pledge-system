<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Customer;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CustomerService
{
    /**
     * Create a new customer
     */
    public function createCustomer(array $data): Customer
    {
        $user = auth()->user();
        // Only users with store access can create pledges
        if (!$this->authService->canAccessStore($user)) {
            throw new \Illuminate\Validation\UnauthorizedException(
                'You do not have permission to create pledges.'
            );
        }

        // Auto-assign to user's branch
        if (!$user->branch_id) {
            throw new \Exception('Cannot create pledge for user without branch assignment.');
        }

        $data['branch_id'] = $user->branch_id;
        $data['staff_id'] = $user->id;

        return Customer::create($data);
    }

    /**
     * Update an existing customer
     */
    public function updateCustomer(Customer $customer, array $data): Customer
    {
        $customer->update($data);
        return $customer;
    }

    /**
     * Delete a customer
     */
    public function deleteCustomer(Customer $customer): bool
    {
        return $customer->delete();
    }

    /**
     * Get customer by ID
     */
    public function getCustomerById(int $id): Customer
    {
        return Customer::findOrFail($id);
    }

    /**
     * Get customer by ID number (unique)
     */
    public function getCustomerByIdNumber(string $idNumber): ?Customer
    {
        return Customer::where('id_number', $idNumber)->first();
    }

    /**
     * Check if customer exists with given ID number (excluding current customer)
     */
    public function isIdNumberUnique(string $idNumber, ?int $customerId = null): bool
    {
        $query = Customer::where('id_number', $idNumber);
        
        if ($customerId) {
            $query->where('id', '!=', $customerId);
        }
        
        return !$query->exists();
    }
}