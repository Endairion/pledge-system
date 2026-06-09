import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Edit2, Trash2, AlertCircle, CheckCircle, Loader } from 'lucide-react'
import api from '@/lib/api'

interface Branch {
  id: string
  name: string
  code: string
  compliance_type: string
  pledge_prefix: string
  registration_no: string | null
  address: string | null
  phone: string | null
  created_at: string
}

export default function BranchesPage() {
  const navigate = useNavigate()
  const [branches, setBranches] = useState<Branch[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Fetch branches
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await api.get('/admin/branches')
        setBranches(response.data.data)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch branches:', error)
        setMessage({ type: 'error', text: 'Failed to load branches' })
        setLoading(false)
      }
    }

    fetchBranches()
  }, [])

  // Delete branch
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this branch?')) {
      return
    }

    setDeleting(id)
    try {
      await api.delete(`/admin/branches/${id}`)
      setBranches(branches.filter((b) => b.id !== id))
      setMessage({ type: 'success', text: 'Branch deleted successfully' })
    } catch (error: any) {
      console.error('Failed to delete branch:', error)
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Failed to delete branch',
      })
    } finally {
      setDeleting(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto mb-2 text-primary" />
          <p className="text-muted-foreground">Loading branches...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Branches</h1>
            <p className="text-muted-foreground mt-2">Manage your business branches</p>
          </div>
          <button
            onClick={() => navigate('/admin/branches/create')}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Branch
          </button>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              message.type === 'success'
                ? 'bg-green-50 dark:bg-green-950 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-950 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Branches Table */}
        <div className="bg-card rounded-lg shadow-md overflow-hidden">
          {branches.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No branches found. Create your first branch!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Code</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Compliance Type
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Prefix</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Phone</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {branches.map((branch) => (
                    <tr key={branch.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-foreground">{branch.name}</td>
                      <td className="px-6 py-4 text-sm text-foreground font-mono">{branch.code}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            branch.compliance_type === 'arrahnu'
                              ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200'
                              : 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200'
                          }`}
                        >
                          {branch.compliance_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground font-mono">{branch.pledge_prefix}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{branch.phone || '-'}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => navigate(`/admin/branches/${branch.id}/edit`)}
                            className="p-2 hover:bg-accent rounded transition-colors"
                            title="Edit branch"
                          >
                            <Edit2 className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                          </button>
                          <button
                            onClick={() => handleDelete(branch.id)}
                            disabled={deleting === branch.id}
                            className="p-2 hover:bg-accent rounded transition-colors disabled:opacity-50"
                            title="Delete branch"
                          >
                            {deleting === branch.id ? (
                              <Loader className="w-4 h-4 animate-spin text-destructive" />
                            ) : (
                              <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
