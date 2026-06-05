import { useEffect, useState } from "react"
import api from "@/lib/api"
import type { GoldQuality, GoldRate } from "@/types"

export interface RateDisplay {
  id: string
  quality_name: string
  min_rate: number
  max_rate: number
  created_at: string
}

/**
 * Custom hook for managing gold rates and qualities.
 * 
 * Handles fetching rates filtered by compliance type and all available qualities.
 * Provides methods to refresh rates after mutations.
 */
export function useGoldRates(complianceType: string) {
  const [qualities, setQualities] = useState<GoldQuality[]>([])
  const [rates, setRates] = useState<RateDisplay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  /**
   * Transform API rate data to display format.
   */
  const formatRates = (ratesData: GoldRate[]): RateDisplay[] => {
    return ratesData.map((rate: GoldRate) => ({
      id: rate.id,
      quality_name: rate.quality?.name || "Unknown",
      min_rate: rate.min_rate,
      max_rate: rate.max_rate,
      created_at: rate.created_at,
    }))
  }

  /**
   * Fetch gold rates and qualities on mount and when compliance type changes.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError("")

        // Fetch gold rates for selected compliance type
        const ratesRes = await api.get("/admin/gold-rates", {
          params: { compliance_type: complianceType },
        })
        const ratesData = ratesRes.data.data || []
        setRates(formatRates(ratesData))

        // Fetch gold qualities (only once)
        const qualitiesRes = await api.get("/admin/lookups/gold_qualities")
        setQualities(qualitiesRes.data.data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [complianceType])

  /**
   * Refresh rates after a mutation (add/delete).
   */
  const refreshRates = async () => {
    try {
      const ratesRes = await api.get("/admin/gold-rates", {
        params: { compliance_type: complianceType },
      })
      const ratesData = ratesRes.data.data || []
      setRates(formatRates(ratesData))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to refresh rates")
    }
  }

  /**
   * Delete a gold rate by ID.
   */
  const deleteRate = async (rateId: string): Promise<boolean> => {
    try {
      await api.delete(`/admin/gold-rates/${rateId}`)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete gold rate")
      return false
    }
  }

  return {
    qualities,
    rates,
    loading,
    error,
    setError,
    refreshRates,
    deleteRate,
  }
}
