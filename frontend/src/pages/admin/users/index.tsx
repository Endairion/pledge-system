import { useState, useEffect, useCallback } from "react"
import { Search, Plus, Trash2, Edit2, ChevronLeft, ChevronRight, X } from "lucide-react"
import api from "@/lib/api"
import type { User, Role } from "@/types"

interface UserFormData {
  name: string
  email: string
  password?: string
  branch_id: string | null
  roles: string[]
}

interface Branch {
  id: string
  name: string
  code: string
}

const PAGE_SIZE = 10

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [branches, setBranches] = useState<Branch[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    branch_id: null,
    roles: [],
  })
  const [totalPages, setTotalPages] = useState(0)
  const [totalRecords, setTotalRecords] = useState(0)

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true)
      setError("")
      const response = await api.get("/admin/users", {
        params: {
          search,
          page,
        },
      })
      setUsers(response.data.data || [])
      setTotalRecords(response.data.meta?.total || 0)
      setTotalPages(response.data.meta?.total_pages || 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users")
    } finally {
      setLoading(false)
    }
  }, [search, page])

  const fetchBranches = useCallback(async () => {
    try {
      const response = await api.get("/admin/branches-list")
      setBranches(response.data.data || [])
    } catch (err) {
      console.error("Failed to load branches:", err)
    }
  }, [])

  const fetchRoles = useCallback(async () => {
    try {
      const response = await api.get("/admin/roles-list")
      setRoles(response.data.data || [])
    } catch (err) {
      console.error("Failed to load roles:", err)
    }
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  useEffect(() => {
    fetchBranches()
    fetchRoles()
  }, [fetchBranches, fetchRoles])

  const openModal = (user?: User) => {
    if (user) {
      setEditingId(user.id)
      setFormData({
        name: user.name,
        email: user.email,
        password: "",
        branch_id: user.branch_id,
        roles: user.roles?.map((r) => r.id) || [],
      })
    } else {
      setEditingId(null)
      setFormData({
        name: "",
        email: "",
        password: "",
        branch_id: null,
        roles: [],
      })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingId(null)
    setFormData({
      name: "",
      email: "",
      password: "",
      branch_id: null,
      roles: [],
    })
  }

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Name and email are required")
      return
    }

    if (!editingId && !formData.password) {
      alert("Password is required for new users")
      return
    }

    try {
      const payload: any = {
        name: formData.name,
        email: formData.email,
        branch_id: formData.branch_id,
        roles: formData.roles,
      }

      if (formData.password) {
        payload.password = formData.password
      }

      if (editingId) {
        await api.put(`/admin/users/${editingId}`, payload)
      } else {
        await api.post("/admin/users", payload)
      }

      await fetchUsers()
      closeModal()
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to save user")
    }
  }

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) {
      return
    }

    try {
      await api.delete(`/admin/users/${userId}`)
      await fetchUsers()
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to delete user")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Users</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage system users ({totalRecords} total)
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-black hover:bg-blue-700 dark:text-white"
        >
          <Plus size={20} />
          Add User
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(0)
          }}
          className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-900 placeholder-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-600">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Branch
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Roles
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900 dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {user.branch?.name || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex flex-wrap gap-1">
                      {user.roles && user.roles.length > 0 ? (
                        user.roles.map((role) => (
                          <span
                            key={role.id}
                            className="inline-block rounded bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                          >
                            {role.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">No roles</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => openModal(user)}
                        className="rounded p-1 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="rounded p-1 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {page + 1} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="rounded bg-gray-200 p-2 text-gray-900 disabled:opacity-50 dark:bg-gray-700 dark:text-white"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              className="rounded bg-gray-200 p-2 text-gray-900 disabled:opacity-50 dark:bg-gray-700 dark:text-white"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingId ? "Edit User" : "Add User"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Password {editingId && "(leave blank to keep current)"}
                </label>
                <input
                  type="password"
                  value={formData.password || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Branch */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Branch
                </label>
                <select
                  value={formData.branch_id || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      branch_id: e.target.value || null,
                    })
                  }
                  className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select a branch</option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Roles */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Roles
                </label>
                <div className="mt-2 space-y-2">
                  {roles.map((role) => (
                    <label
                      key={role.id}
                      className="flex items-center gap-2 text-gray-900 dark:text-white"
                    >
                      <input
                        type="checkbox"
                        checked={formData.roles.includes(role.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              roles: [...formData.roles, role.id],
                            })
                          } else {
                            setFormData({
                              ...formData,
                              roles: formData.roles.filter((r) => r !== role.id),
                            })
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      {role.name}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 rounded border border-gray-300 bg-white px-4 py-2 text-gray-900 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                {editingId ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

