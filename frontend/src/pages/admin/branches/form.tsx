import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, Loader, AlertCircle } from 'lucide-react'
import api from '@/lib/api'

interface BranchForm {
  name: string
  code: string
  compliance_type: 'conventional' | 'arrahnu'
  pledge_prefix: string
  registration_no: string
  address: string
  phone: string
}

export default function BranchFormPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = !!id

  const [form, setForm] = useState<BranchForm>({
    name: '',
    code: '',
    compliance_type: 'conventional',
    pledge_prefix: '',
    registration_no: '',
    address: '',
    phone: '',
  })

  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Load branch data if editing
  useEffect(() => {
    if (isEdit) {
      const fetchBranch = async () => {
        try {
          const response = await api.get(`/admin/branches/${id}`)
          setForm(response.data.data)
          setLoading(false)
        } catch (error) {
          console.error('Failed to fetch branch:', error)
          setMessage({ type: 'error', text: 'Failed to load branch' })
          setLoading(false)
        }
      }

      fetchBranch()
    }
  }, [id, isEdit])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setErrors({})
    setMessage(null)

    try {
      if (isEdit) {
        await api.put(`/admin/branches/${id}`, form)
        setMessage({ type: 'success', text: 'Branch updated successfully' })
      } else {
        await api.post('/admin/branches', form)
        setMessage({ type: 'success', text: 'Branch created successfully' })
      }

      setTimeout(() => {
        navigate('/admin/branches')
      }, 1500)
    } catch (error: any) {
      console.error('Failed to save branch:', error)
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      } else {
        setMessage({
          type: 'error',
          text: error.response?.data?.error || 'Failed to save branch',
        })
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto mb-2 text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin/branches')}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Branches
          </button>
          <h1 className="text-3xl font-bold text-foreground">
            {isEdit ? 'Edit Branch' : 'Create New Branch'}
          </h1>
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
            {message.type === 'error' && <AlertCircle className="w-5 h-5 flex-shrink-0" />}
            <span>{message.text}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-card rounded-lg shadow-md p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Branch Name <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g., Kedai Emas KDE"
              className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                errors.name ? 'border-destructive' : 'border-border'
              }`}
            />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
          </div>

          {/* Code */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Branch Code <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="e.g., KDE"
              maxLength={50}
              disabled={isEdit}
              className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50 ${
                errors.code ? 'border-destructive' : 'border-border'
              }`}
            />
            {errors.code && <p className="text-xs text-destructive mt-1">{errors.code}</p>}
            {isEdit && <p className="text-xs text-muted-foreground mt-1">Cannot change code after creation</p>}
          </div>

          {/* Compliance Type */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Compliance Type <span className="text-destructive">*</span>
            </label>
            <select
              name="compliance_type"
              value={form.compliance_type}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                errors.compliance_type ? 'border-destructive' : 'border-border'
              }`}
            >
              <option value="conventional">Conventional</option>
              <option value="arrahnu">Arrahnu</option>
            </select>
            {errors.compliance_type && (
              <p className="text-xs text-destructive mt-1">{errors.compliance_type}</p>
            )}
          </div>

          {/* Pledge Prefix */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Pledge Prefix <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              name="pledge_prefix"
              value={form.pledge_prefix}
              onChange={handleChange}
              placeholder="e.g., KDE"
              maxLength={10}
              className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                errors.pledge_prefix ? 'border-destructive' : 'border-border'
              }`}
            />
            {errors.pledge_prefix && <p className="text-xs text-destructive mt-1">{errors.pledge_prefix}</p>}
          </div>

          {/* Registration No */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Registration Number</label>
            <input
              type="text"
              name="registration_no"
              value={form.registration_no}
              onChange={handleChange}
              placeholder="Optional"
              maxLength={50}
              className={`w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Optional"
              maxLength={500}
              className={`w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Optional"
              maxLength={20}
              className={`w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-6 border-t border-border">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {isEdit ? 'Update Branch' : 'Create Branch'}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/branches')}
              className="px-6 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-accent transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
