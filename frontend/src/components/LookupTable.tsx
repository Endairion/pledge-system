import { useState, useEffect, useCallback } from "react"
import { Search, Plus, Trash2, Edit2, ChevronLeft, ChevronRight, X } from "lucide-react"
import api from "@/lib/api"

interface LookupRecord {
  id: string
  name: string
  created_at?: string
  updated_at?: string
}

interface LookupTableProps {
  title: string
  description: string
  tableName: string
  singularTitle: string
}

const PAGE_SIZE = 10

export default function LookupTable({ title, description, tableName, singularTitle }: LookupTableProps) {
  const [records, setRecords] = useState<LookupRecord[]>([])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: "" })

  const fetchRecords = useCallback(async () => {
    try {
      setLoading(true)
      setError("")
      const response = await api.get(`/admin/lookups/${tableName}`)
      setRecords(response.data.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load records")
    } finally {
      setLoading(false)
    }
  }, [tableName])

  // Fetch records
  useEffect(() => {
    fetchRecords()
  }, [fetchRecords])

  const openModal = (record?: LookupRecord) => {
    if (record) {
      setEditingId(record.id)
      setFormData({ name: record.name })
    } else {
      setEditingId(null)
      setFormData({ name: "" })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingId(null)
    setFormData({ name: "" })
  }

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert("Name is required")
      return
    }

    try {
      if (editingId) {
        await api.put(`/admin/lookups/${tableName}/${editingId}`, formData)
      } else {
        await api.post(`/admin/lookups/${tableName}`, formData)
      }

      await fetchRecords()
      closeModal()
    } catch (err) {
      alert(err instanceof Error ? err.message : "Operation failed")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return

    try {
      await api.delete(`/admin/lookups/${tableName}/${id}`)

      await fetchRecords()
      setPage(0)
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed")
    }
  }

  // Filtering
  const filtered = records.filter((r) => {
    if (!search) return true
    const s = search.toLowerCase()
    return r.name.toLowerCase().includes(s)
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const start = page * PAGE_SIZE
  const paginated = filtered.slice(start, start + PAGE_SIZE)

  if (loading) {
    return (
      <div className="p-4 md:p-6 flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6">
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
          {error}
        </div>
      )}

      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 rounded-lg bg-black dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New {singularTitle}
        </button>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(0)
            }}
            className="h-10 w-full rounded-lg border bg-background pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Updated</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">
                    No records found
                  </td>
                </tr>
              ) : (
                paginated.map((record) => (
                  <tr key={record.id} className="hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">{record.name}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {record.updated_at ? new Date(record.updated_at).toLocaleDateString() : "-"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openModal(record)}
                          className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs hover:bg-accent transition-colors"
                        >
                          <Edit2 className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => handleDelete(record.id)}
                          className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filtered.length > PAGE_SIZE && (
          <div className="flex items-center justify-between border-t px-4 py-3">
            <p className="text-sm text-muted-foreground">
              Page {page + 1} of {totalPages}
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-card p-6 shadow-lg md:max-w-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {editingId ? `Edit ${singularTitle}` : `New ${singularTitle}`}
              </h2>
              <button
                onClick={closeModal}
                className="rounded hover:bg-muted p-1 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter name"
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="rounded-lg bg-black dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 transition-colors"
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
