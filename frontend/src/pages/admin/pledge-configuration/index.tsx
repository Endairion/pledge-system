import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, Save, AlertCircle, CheckCircle, Loader } from 'lucide-react'
import api from '@/lib/api'

interface PledgeConfig {
  id: string
  branch_id: string
  branch_name: string
  compliance_type: string
  name: string
  calculation_model: string
  monthly_rates: Record<string, string>
  pledge_duration: number
  effective_from: string
  effective_to: string | null
}

interface EditForm {
  monthly_rates: Record<string, string>
  single_rate?: string
}

export default function PledgeConfiguration() {
  const navigate = useNavigate()
  const [configs, setConfigs] = useState<PledgeConfig[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<EditForm>({
    monthly_rates: {},
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  // Fetch all pledge configurations
  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const response = await api.get('/admin/pledges/configs')
        setConfigs(response.data.data)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch configurations:', error)
        setMessage({ type: 'error', text: 'Failed to load configurations' })
        setLoading(false)
      }
    }

    fetchConfigs()
  }, [])

  // Start editing a configuration
  const handleEdit = (config: PledgeConfig) => {
    setEditingId(config.id)
    const isSingleRate = config.compliance_type === 'arrahnu'
    setEditForm({
      monthly_rates: isSingleRate ? {} : { ...config.monthly_rates },
      single_rate: isSingleRate ? Object.values(config.monthly_rates)[0] || '' : undefined,
    })
    setMessage(null)
  }

  // Handle rate change
  const handleRateChange = (month: string, value: string) => {
    setEditForm({
      ...editForm,
      monthly_rates: {
        ...editForm.monthly_rates,
        [month]: value,
      },
    })
  }

  // Handle single rate change (for arrahnu)
  const handleSingleRateChange = (value: string) => {
    setEditForm({
      ...editForm,
      single_rate: value,
    })
  }

  // Save configuration
  const handleSave = async () => {
    if (!editingId) return

    const config = configs.find((c) => c.id === editingId)
    if (!config) return

    setSaving(true)
    try {
      const payload = config.compliance_type === 'arrahnu' 
        ? { single_interest_rate: editForm.single_rate }
        : { monthly_interest_rates: editForm.monthly_rates }
      
      const response = await api.put(`/admin/pledges/config/${editingId}`, payload)

      // Update the config in the list
      const newRates = config.compliance_type === 'arrahnu'
        ? { '1': editForm.single_rate || '' }
        : editForm.monthly_rates

      setConfigs(
        configs.map((c) =>
          c.id === editingId
            ? {
                ...c,
                monthly_rates: newRates,
              }
            : c
        )
      )

      setMessage({
        type: 'success',
        text: `Configuration updated successfully for ${response.data.data.branch_id}`,
      })
      setEditingId(null)
    } catch (error: any) {
      console.error('Failed to save configuration:', error)
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Failed to save configuration',
      })
    } finally {
      setSaving(false)
    }
  }

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null)
    setMessage(null)
  }

  // Toggle collapse state
  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedIds)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedIds(newExpanded)
  }

  // Filter configs based on search query
  const filteredConfigs = configs.filter((config) =>
    config.branch_name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto mb-2 text-primary" />
          <p className="text-muted-foreground">Loading pledge configurations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Pledge Configuration</h1>
          <p className="text-muted-foreground mt-2">
            Manage interest rates per branch
          </p>
        </div>

        {/* Search Filter */}
        {configs.length > 0 && (
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search branches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {filteredConfigs.length > 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                Showing {filteredConfigs.length} of {configs.length} branches
              </p>
            )}
          </div>
        )}

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

        {/* Configurations List */}
        <div className="space-y-6">
          {filteredConfigs.length === 0 ? (
            <div className="bg-card rounded-lg shadow p-8 text-center">
              <p className="text-muted-foreground">
                {searchQuery ? 'No branches found matching your search' : 'No pledge configurations found'}
              </p>
            </div>
          ) : (
            filteredConfigs.map((config) => (
              <div
                key={config.id}
                className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-border"
              >
                {/* Config Header */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 border-b border-border">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3 flex-1">
                      <button
                        onClick={() => toggleExpanded(config.id)}
                        className="mt-1 p-1 hover:bg-primary/20 rounded transition-colors flex-shrink-0"
                        aria-label={expandedIds.has(config.id) ? 'Collapse' : 'Expand'}
                      >
                        <ChevronDown
                          className={`w-5 h-5 text-foreground transition-transform ${
                            expandedIds.has(config.id) ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <div>
                        <h2 className="text-xl font-semibold text-foreground">{config.branch_name}</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                          Compliance Type:{' '}
                          <span className="font-medium capitalize text-foreground">{config.compliance_type}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Rule Set: <span className="font-medium text-foreground">{config.name}</span>
                        </p>
                      </div>
                    </div>
                    {editingId !== config.id && (
                      <button
                        onClick={() => handleEdit(config)}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>

                {/* Config Content - Collapsible */}
                {expandedIds.has(config.id) && (
                  <>
                    {editingId === config.id ? (
                      // Edit Form
                      <div className="p-6">
                        {config.compliance_type === 'conventional' ? (
                          // Monthly Interest Rates for Conventional
                          <div>
                            <label className="block text-sm font-semibold text-foreground mb-4">
                              Monthly Interest Rates (%)
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                              {Object.entries(editForm.monthly_rates)
                                .sort(([a], [b]) => parseInt(a) - parseInt(b))
                                .map(([month, rate]) => (
                                  <div key={month}>
                                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                                      Month {month}
                                    </label>
                                    <input
                                      type="number"
                                      value={rate}
                                      onChange={(e) => handleRateChange(month, e.target.value)}
                                      step="0.01"
                                      min="0"
                                      max="100"
                                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                  </div>
                                ))}
                            </div>
                          </div>
                        ) : (
                          // Single Rate for Arrahnu
                          <div>
                            <label className="block text-sm font-semibold text-foreground mb-3">
                              Interest Rate (%)
                            </label>
                            <input
                              type="number"
                              value={editForm.single_rate || ''}
                              onChange={(e) => handleSingleRateChange(e.target.value)}
                              step="0.01"
                              min="0"
                              max="100"
                              className="w-full max-w-xs px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-8 pt-6 border-t border-border">
                          <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-green-700 dark:hover:bg-green-600"
                          >
                            {saving ? (
                              <>
                                <Loader className="w-4 h-4 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save className="w-4 h-4" />
                                Save Changes
                              </>
                            )}
                          </button>
                          <button
                            onClick={handleCancel}
                            className="px-6 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-accent transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div className="p-6">
                        {config.compliance_type === 'conventional' ? (
                          // Monthly Rates Summary for Conventional
                          <div>
                            <h3 className="text-sm font-semibold text-foreground mb-3">
                              Interest Rate Summary
                            </h3>
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                              {Object.entries(config.monthly_rates)
                                .sort(([a], [b]) => parseInt(a) - parseInt(b))
                                .map(([month, rate]) => (
                                  <div
                                    key={month}
                                    className="flex justify-between items-center px-3 py-2 bg-muted rounded hover:bg-accent transition-colors"
                                  >
                                    <span className="text-sm text-muted-foreground">Month {month}:</span>
                                    <span className="font-medium text-foreground">{rate}%</span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ) : (
                          // Single Rate for Arrahnu
                          <div>
                            <h3 className="text-sm font-semibold text-foreground mb-3">
                              Interest Rate
                            </h3>
                            <div className="bg-primary/10 dark:bg-primary/5 rounded-lg p-4 border border-primary/20">
                              <p className="text-3xl font-bold text-primary">
                                {Object.values(config.monthly_rates)[0]}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">%</p>
                            </div>
                          </div>
                        )}

                        {/* Effective Dates */}
                        <div className="mt-6 pt-6 border-t border-border">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Effective From</p>
                              <p className="font-medium text-foreground">{config.effective_from}</p>
                            </div>
                            {config.effective_to && (
                              <div>
                                <p className="text-muted-foreground">Effective To</p>
                                <p className="font-medium text-foreground">{config.effective_to}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
