<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

/**
 * Controller for managing users.
 * 
 * Handles HTTP requests for user CRUD operations.
 */
class UsersController extends Controller
{
    /**
     * List all users with pagination.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $search = $request->query('search', '');
        $page = max(0, (int) $request->query('page', 0));
        $pageSize = 10;

        $query = User::with('roles', 'branch');

        if ($search) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
        }

        $total = $query->count();
        $users = $query->skip($page * $pageSize)
            ->take($pageSize)
            ->get()
            ->map(fn($user) => $this->formatUser($user));

        return response()->json([
            'data' => $users,
            'meta' => [
                'total' => $total,
                'page' => $page,
                'page_size' => $pageSize,
                'total_pages' => ceil($total / $pageSize),
            ],
        ]);
    }

    /**
     * Store a new user.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:users,name',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:6',
            'branch_id' => 'nullable|uuid|exists:branches,id',
            'is_active' => 'boolean',
            'roles' => 'array',
            'roles.*' => 'uuid|exists:roles,id',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'branch_id' => $validated['branch_id'] ?? null,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        if (!empty($validated['roles'])) {
            $user->roles()->sync($validated['roles']);
        }

        $user->load('roles', 'branch');

        return response()->json(['data' => $this->formatUser($user)], 201);
    }

    /**
     * Show a single user.
     *
     * @param string $id
     * @return JsonResponse
     */
    public function show(string $id): JsonResponse
    {
        $user = User::with('roles', 'branch')->find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        return response()->json(['data' => $this->formatUser($user)]);
    }

    /**
     * Update a user.
     *
     * @param Request $request
     * @param string $id
     * @return JsonResponse
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $validated = $request->validate([
            'name' => [
                'sometimes',
                'string',
                'max:255',
                Rule::unique('users', 'name')->ignore($id),
            ],
            'email' => [
                'sometimes',
                'string',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($id),
            ],
            'password' => 'sometimes|string|min:6',
            'branch_id' => 'nullable|uuid|exists:branches,id',
            'is_active' => 'boolean',
            'roles' => 'array',
            'roles.*' => 'uuid|exists:roles,id',
        ]);

        if (isset($validated['name'])) {
            $user->name = $validated['name'];
        }

        if (isset($validated['email'])) {
            $user->email = $validated['email'];
        }

        if (isset($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        if (isset($validated['branch_id'])) {
            $user->branch_id = $validated['branch_id'];
        }

        if (isset($validated['is_active'])) {
            $user->is_active = $validated['is_active'];
        }

        $user->save();

        if (isset($validated['roles'])) {
            $user->roles()->sync($validated['roles']);
        }

        $user->load('roles', 'branch');

        return response()->json(['data' => $this->formatUser($user)]);
    }

    /**
     * Delete a user (soft delete).
     *
     * @param string $id
     * @return JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['data' => null], 204);
    }

    /**
     * Format user data for response.
     *
     * @param User $user
     * @return array
     */
    private function formatUser(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'branch_id' => $user->branch_id,
            'branch' => $user->branch ? [
                'id' => $user->branch->id,
                'name' => $user->branch->name,
                'code' => $user->branch->code,
            ] : null,
            'is_active' => $user->is_active,
            'roles' => $user->roles->map(fn($r) => [
                'id' => $r->id,
                'name' => $r->name,
                'display_name' => $r->display_name,
            ]),
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at,
        ];
    }
}
