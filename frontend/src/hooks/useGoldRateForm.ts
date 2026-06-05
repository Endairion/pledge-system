import { useState } from "react"
import api from "@/lib/api"

export interface FormData {
  quality_id: string
  min_rate: string
  max_rate: string
}

/**
 * Custom hook for managing gold rate form state and submission.
 * 
 * Handles form data, validation, and API submission for creating new rates.
 */
export function useGoldRateForm(complianceType: string) {
  const [formData, setFormData] = useState<FormData>({
    quality_id: "",
    min_rate: "",
    max_rate: "",
  })
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  /**
   * Handle form input changes.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  /**
   * Validate form data before submission.
   */
  const validateForm = (): boolean => {
    setError("")

    if (!formData.quality_id || !formData.min_rate || !formData.max_rate) {
      setError("All fields are required")
      return false
    }

    const minRate = parseFloat(formData.min_rate)
    const maxRate = parseFloat(formData.max_rate)

    if (minRate < 0 || maxRate < 0) {
      setError("Rates must be non-negative")
      return false
    }

    if (minRate > maxRate) {
      setError("Minimum rate cannot be greater than maximum rate")
      return false
    }

    return true
  }

  /**
   * Submit form to create a new gold rate.
   */
  const submitForm = async (): Promise<boolean> => {
    if (!validateForm()) {
      return false
    }

    try {
      setSubmitting(true)
      setError("")

      await api.post("/admin/gold-rates", {
        quality_id: formData.quality_id,
        min_rate: parseFloat(formData.min_rate),
        max_rate: parseFloat(formData.max_rate),
        compliance_type: complianceType,
      })

      // Reset form
      resetForm()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add gold rate")
      return false
    } finally {
      setSubmitting(false)
    }
  }

  /**
   * Reset form to initial state.
   */
  const resetForm = () => {
    setFormData({
      quality_id: "",
      min_rate: "",
      max_rate: "",
    })
    setError("")
  }

  return {
    formData,
    error,
    submitting,
    handleInputChange,
    submitForm,
    resetForm,
    setError,
  }
}
