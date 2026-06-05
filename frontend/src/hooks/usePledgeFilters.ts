import { useState, useEffect, useRef } from "react"

interface Pledge {
  pledge_no: string
  customer: string
  ic: string
  item_value: number
  loan_amount: number
  status: "active" | "renewed" | "redeemed" | "auctioned" | "forfeited"
  pledged_date: string
  expiry_date: string
}

/**
 * Custom hook for managing pledge filtering and pagination logic.
 * 
 * Provides unified state management for pledge list filtering including search,
 * status filtering, date range filtering, and pagination. Encapsulates all filter logic
 * to keep components clean and testable.
 * 
 * @param mockPledges - Array of pledge records to filter
 * @returns Object containing filter state, setters, filtered results, and pagination info
 */
export function usePledgeFilters(mockPledges: Pledge[]) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [page, setPage] = useState(0)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [pledgeFromDate, setPledgeFromDate] = useState("")
  const [pledgeToDate, setPledgeToDate] = useState("")
  const [expiryFromDate, setExpiryFromDate] = useState("")
  const [expiryToDate, setExpiryToDate] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  const PAGE_SIZE = 5

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowStatusDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  let filtered = mockPledges

  // Search filter
  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.pledge_no.toLowerCase().includes(q) ||
        p.customer.toLowerCase().includes(q) ||
        p.ic.includes(q)
    )
  }

  // Status filter
  if (statusFilter !== "all") {
    filtered = filtered.filter((p) => p.status === statusFilter)
  }

  // Pledge date range filter
  if (pledgeFromDate) {
    filtered = filtered.filter((p) => p.pledged_date >= pledgeFromDate)
  }
  if (pledgeToDate) {
    filtered = filtered.filter((p) => p.pledged_date <= pledgeToDate)
  }

  // Expiry date range filter
  if (expiryFromDate) {
    filtered = filtered.filter((p) => p.expiry_date >= expiryFromDate)
  }
  if (expiryToDate) {
    filtered = filtered.filter((p) => p.expiry_date <= expiryToDate)
  }

  const total = filtered.length
  const maxPage = Math.ceil(total / PAGE_SIZE) - 1
  const start = page * PAGE_SIZE
  const paginated = filtered.slice(start, start + PAGE_SIZE)

  const hasActiveFilters = !!(pledgeFromDate || pledgeToDate || expiryFromDate || expiryToDate)

  /**
   * Clear all active filters and reset pagination to first page.
   * Useful for "Clear Filters" button functionality.
   */
  const clearAllFilters = () => {
    setPledgeFromDate("")
    setPledgeToDate("")
    setExpiryFromDate("")
    setExpiryToDate("")
    setPage(0)
  }

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    page,
    setPage,
    showAdvanced,
    setShowAdvanced,
    showStatusDropdown,
    setShowStatusDropdown,
    pledgeFromDate,
    setPledgeFromDate,
    pledgeToDate,
    setPledgeToDate,
    expiryFromDate,
    setExpiryFromDate,
    expiryToDate,
    setExpiryToDate,
    dropdownRef,
    paginated,
    total,
    maxPage,
    start,
    PAGE_SIZE,
    hasActiveFilters,
    clearAllFilters,
  }
}
