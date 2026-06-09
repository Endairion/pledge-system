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
        
        // Auto-assign to user's branch
        if (!$user->branch_id) {
            throw new \Exception('Cannot create customer for user without branch assignment.');
        }

        $data['branch_id'] = $user->branch_id;
        
        // Auto-generate customer number
        $data['customer_no'] = $this->generateCustomerNumber();

        return Customer::create($data);
    }
    
    /**
     * Generate unique customer number
     */
    private function generateCustomerNumber(): string
    {
        $prefix = 'CST-';
        $lastCustomer = Customer::orderByDesc('created_at')->first();
        
        if (!$lastCustomer) {
            return $prefix . '001';
        }
        
        // Extract number from last customer_no and increment
        $lastNumber = (int) substr($lastCustomer->customer_no, strlen($prefix));
        $newNumber = $lastNumber + 1;
        
        return $prefix . str_pad((string)$newNumber, 3, '0', STR_PAD_LEFT);
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