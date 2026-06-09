import { Plus, X, AlertCircle } from "lucide-react"
import type { GoldQuality } from "@/types"
import type { FormData } from "@/hooks/useGoldRateForm"

interface GoldRateModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => Promise<void>
  formData: FormData
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  qualities: GoldQuality[]
  error: string
  submitting: boolean
  usedQualities: string[]
}

/**
 * Modal component for adding a new gold rate.
 * 
 * Displays form fields for quality, min rate, and max rate.
 * Validates form before submission and shows error messages.
 */
export function GoldRateModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onFormChange,
  qualities,
  error,
  submitting,
  usedQualities,
}: GoldRateModalProps) {
  if (!isOpen) return null

  const availableQualities = qualities.filter((q) => !usedQualities.includes(q.name))

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-card p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Add New Rate</h2>
          <button
            onClick={onClose}
            className="rounded hover:bg-muted p-1 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg flex items-center gap-2 text-sm">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Gold Quality Select */}
          <div>
            <label htmlFor="quality_id" className="block text-sm font-medium mb-2">
              Gold Quality *
            </label>
            <select
              id="quality_id"
              name="quality_id"
              value={formData.quality_id}
              onChange={onFormChange}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              required
            >
              <option value="">Select a quality</option>
              {availableQualities.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.name}
                </option>
              ))}
            </select>
          </div>

          {/* Min Rate Input */}
          <div>
            <label htmlFor="min_rate" className="block text-sm font-medium mb-2">
              Minimum Rate (RM) *
            </label>
            <input
              id="min_rate"
              type="number"
              name="min_rate"
              value={formData.min_rate}
              onChange={onFormChange}
              placeholder="e.g., 250.50"
              step="0.01"
              min="0"
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>

          {/* Max Rate Input */}
          <div>
            <label htmlFor="max_rate" className="block text-sm font-medium mb-2">
              Maximum Rate (RM) *
            </label>
            <input
              id="max_rate"
              type="number"
              name="max_rate"
              value={formData.max_rate}
              onChange={onFormChange}
              placeholder="e.g., 280.50"
              step="0.01"
              min="0"
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>

          {/* Modal Actions */}
          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-black dark:text-white hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="h-4 w-4" />
              {submitting ? "Adding..." : "Add Rate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
