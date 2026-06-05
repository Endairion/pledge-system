<?php 
declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Services\CustomerService;
use App\Services\AuthorizationService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

/**
 * Customer Controller with Authorization
 * 
 * All customer will show no matter what branch they belong to
 * Authorization is checked by middleware and AuthorizationService
 *
 * @package App\Http\Controllers\Api
 */
class CustomerController extends Controller
{
    public function __construct(
        protected CustomerService $customerService,
        protected AuthorizationService $authService,
    ) {
    }

    /**
     * Get all customers 
     * 
     * Route: GET /api/customers
     * Middleware: auth:sanctum, can.access.store
     */

    public function index(Request $request): JsonResponse
    {
        $customers = Customer::query()
            ->with('branch')
            ->paginate(15);

        return response()->json(['data' => $customers]);
    }

    /**
     * Get single customer (with authorization check)
     * 
     * Route: GET /api/customers/{id}
     */
    public function show(Request $request, int $id): JsonResponse
    {
        $user = $request->user();
        $customer = Customer::findOrFail($id);
        
        // Check if user has permission to view this customer
        if (!$this->authService->canAccessCustomer($user, $customer)) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        
        return response()->json(['data' => $customer->load('branch')]);
    }

    /**
     * Create new customer
     * 
     * Route: POST /api/customers
     */
    public function store(Request $request): JsonResponse
    {
        $user = $request->user();
        
        // Validate request data
        $validatedData = $request->validate([
            'full_name'     => 'required|string|max:255',
            'id_type'       => 'required|string|in:IC,Passport,Military',
            'id_number'     => 'required|string|unique:customers,id_number',
            'gender'        => 'required|string|in:M,F',
            'email'         => 'required|email|unique:customers,email',
            'phone'         => 'nullable|string|max:20',
            'address'       => 'nullable|string|max:500', 
            'title_id'      => 'nullable|exists:customer_titles,id',
            'date_of_birth' => 'nullable|date',
        ]);
        
        
        // Create customer
        $customer = $this->customerService->createCustomer($validatedData);
        
        return response()->json([
            'data' => $customer->load('branch'),
            'message' => 'Customer created successfully'
        ], 201);
    }

    /**
     * Update customer
     * 
     * Route: PUT/PATCH /api/customers/{id}
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $user = $request->user();
        $customer = Customer::findOrFail($id);
        
        // Check if user has permission to update this customer
        if (!$this->authService->canAccessCustomer($user, $customer)) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        
        // Validate request data
        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:customers,email,' . $id,
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:500',
        ]);
        
        // Update customer
        $customer = $this->customerService->updateCustomer($customer, $validatedData);
        
        return response()->json([
            'data' => $customer->load('branch'),
            'message' => 'Customer updated successfully'
        ]);
    }

    /**
     * Delete customer
     * 
     * Route: DELETE /api/customers/{id}
     */
    public function destroy(Request $request, int $id): JsonResponse
    {
        $user = $request->user();
        $customer = Customer::findOrFail($id);
        
        // Check if user has permission to delete this customer
        if (!$this->authService->canAccessCustomer($user, $customer)) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        
        $this->customerService->deleteCustomer($customer);
        
        return response()->json([
            'message' => 'Customer deleted successfully'
        ]);
    }
}