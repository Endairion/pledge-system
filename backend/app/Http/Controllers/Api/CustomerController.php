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
            ->with(['branch', 'title', 'race', 'religion', 'nationality'])
            ->paginate(15);

        return response()->json(['data' => $customers]);
    }

    /**
     * Get single customer (with authorization check)
     * 
     * Route: GET /api/customers/{id}
     */
    public function show(Request $request, string $id): JsonResponse
    {
        $customer = Customer::with([
            'branch',
            'title',
            'race',
            'religion',
            'nationality',
            'sourceOfGoldType'
        ])->findOrFail($id);
        
        return response()->json(['data' => $customer]);
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
            'title_id'                => 'nullable|uuid|exists:customer_titles,id',
            'full_name'               => 'required|string|max:255',
            'id_type'                 => 'required|string|in:IC,Passport,Military',
            'id_number'               => 'required|string|unique:customers,id_number',
            'date_of_birth'           => 'nullable|date',
            'gender'                  => 'required|string|in:M,F',
            'race_id'                 => 'nullable|uuid|exists:races,id',
            'religion_id'             => 'nullable|uuid|exists:religions,id',
            'nationality_id'          => 'nullable|uuid|exists:nationalities,id',
            'phone'                   => 'nullable|string|max:20',
            'email'                   => 'required|email|unique:customers,email',
            'address'                 => 'nullable|string|max:500',
            'occupation_type'         => 'nullable|string|max:255',
            'occupation_field'        => 'nullable|string|max:255',
            'purpose_of_transaction'  => 'nullable|string|max:255',
            'source_of_gold_id'       => 'nullable|uuid|exists:source_of_gold_types,id',
        ]);
        
        // Create customer
        $customer = $this->customerService->createCustomer($validatedData);
        
        return response()->json([
            'data' => $customer->load('title', 'race', 'religion', 'nationality', 'branch'),
            'message' => 'Customer created successfully'
        ], 201);
    }

    /**
     * Update customer
     * 
     * Route: PUT/PATCH /api/customers/{id}
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $user = $request->user();
        $customer = Customer::findOrFail($id);
        
        // Check if user has permission to update this customer
        if (!$this->authService->canAccessCustomer($user, $customer)) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        
        // Determine if user is admin
        $isAdmin = $user->roles()->where('name', 'admin')->exists();
        
        // Build validation rules
        $validationRules = [
            'title_id'                => 'nullable|uuid|exists:customer_titles,id',
            'full_name'               => 'sometimes|string|max:255',
            'gender'                  => 'sometimes|string|in:M,F',
            'date_of_birth'           => 'nullable|date',
            'race_id'                 => 'nullable|uuid|exists:races,id',
            'religion_id'             => 'nullable|uuid|exists:religions,id',
            'nationality_id'          => 'nullable|uuid|exists:nationalities,id',
            'phone'                   => 'nullable|string|max:20',
            'email'                   => 'sometimes|email|unique:customers,email,' . $id,
            'address'                 => 'nullable|string|max:500',
            'occupation_type'         => 'nullable|string|max:255',
            'occupation_field'        => 'nullable|string|max:255',
            'purpose_of_transaction'  => 'nullable|string|max:255',
            'source_of_gold_id'       => 'nullable|uuid|exists:source_of_gold_types,id',
            'is_blacklisted'          => 'sometimes|boolean',
            'blacklisted_reason'      => 'nullable|string|max:500',
        ];
        
        // Only admins can update authorized_loan_limit
        if ($isAdmin) {
            $validationRules['authorized_loan_limit'] = 'nullable|numeric|min:0';
        }
        
        // Validate request data
        $validatedData = $request->validate($validationRules);
        
        // Update customer
        $customer = $this->customerService->updateCustomer($customer, $validatedData);
        
        return response()->json([
            'data' => $customer->load('branch', 'title', 'race', 'religion', 'nationality', 'sourceOfGoldType'),
            'message' => 'Customer updated successfully'
        ]);
    }

    /**
     * Delete customer
     * 
     * Route: DELETE /api/customers/{id}
     */
    public function destroy(Request $request, string $id): JsonResponse
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

    /**
     * Lookup customer by IC number
     * 
     * Route: GET /api/customers/lookup/ic/{ic}
     * Used in store pledges flow to find customer
     */
    public function lookupByIc(Request $request, string $ic): JsonResponse
    {
        // Normalize IC number (remove dashes and spaces)
        $normalized = preg_replace('/[-\s]/', '', $ic);
        
        // Search for customer with this IC number
        $customer = Customer::where('id_number', $normalized)
            ->orWhere('id_number', $ic)
            ->with(['branch', 'title', 'race', 'religion', 'nationality'])
            ->first();
        
        if (!$customer) {
            return response()->json(['error' => 'Customer not found'], 404);
        }
        
        // Check if customer is blacklisted
        if ($customer->is_blacklisted) {
            return response()->json([
                'error' => 'Customer is blacklisted',
                'is_blacklisted' => true,
                'reason' => $customer->blacklisted_reason
            ], 403);
        }
        
        return response()->json([
            'data' => $customer
        ]);
    }
}