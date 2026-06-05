
import { useNavigate } from "react-router-dom"
import { Plus } from "lucide-react"
import { usePledgeFilters } from "@/hooks/usePledgeFilters"
import { PledgeSearchForm } from "@/components/PledgeSearchForm"
import { PledgeStatusFilter } from "@/components/PledgeStatusFilter"
import { PledgeDateFilters } from "@/components/PledgeDateFilters"
import { PledgesTable } from "@/components/PledgesTable"

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

const MOCK_PLEDGES: Pledge[] = [
  {
    pledge_no: "KDE-2026-00001",
    customer: "Ahmad bin Ali",
    ic: "900101-01-1234",
    item_value: 5000,
    loan_amount: 3500,
    status: "active",
    pledged_date: "2026-05-01",
    expiry_date: "2026-08-01",
  },
  {
    pledge_no: "KDE-2026-00002",
    customer: "Siti binti Hassan",
    ic: "850515-05-5678",
    item_value: 8000,
    loan_amount: 5600,
    status: "renewed",
    pledged_date: "2026-04-15",
    expiry_date: "2026-07-15",
  },
  {
    pledge_no: "KDE-2026-00003",
    customer: "Lim Ah Kow",
    ic: "780220-12-3456",
    item_value: 3000,
    loan_amount: 2100,
    status: "redeemed",
    pledged_date: "2026-03-01",
    expiry_date: "2026-06-01",
  },
  {
    pledge_no: "KDE-2026-00004",
    customer: "Rajkumar a/l Subramaniam",
    ic: "920810-14-7890",
    item_value: 12000,
    loan_amount: 8400,
    status: "active",
    pledged_date: "2026-05-15",
    expiry_date: "2026-08-15",
  },
  {
    pledge_no: "KDE-2026-00005",
    customer: "Nur Fatin binti Roslan",
    ic: "950301-03-2345",
    item_value: 6500,
    loan_amount: 4550,
    status: "auctioned",
    pledged_date: "2026-01-01",
    expiry_date: "2026-04-01",
  },
  {
    pledge_no: "KDE-2026-00006",
    customer: "Muhammad Iqbal",
    ic: "880724-08-9012",
    item_value: 4200,
    loan_amount: 2940,
    status: "active",
    pledged_date: "2026-05-20",
    expiry_date: "2026-08-20",
  },
  {
    pledge_no: "KDE-2026-00007",
    customer: "Tan Wei Ming",
    ic: "910315-10-3456",
    item_value: 7800,
    loan_amount: 5460,
    status: "forfeited",
    pledged_date: "2025-12-01",
    expiry_date: "2026-03-01",
  },
]

const STATUS_LABEL: Record<string, string> = {
  active: "Active",
  renewed: "Renewed",
  redeemed: "Redeemed",
  auctioned: "Auctioned",
  forfeited: "Forfeited",
}

const STATUS_CLASS: Record<string, string> = {
  active: "bg-emerald-700 text-white dark:bg-emerald-600 dark:text-white",
  renewed: "bg-blue-700 text-white dark:bg-blue-600 dark:text-white",
  redeemed: "bg-slate-700 text-white dark:bg-slate-600 dark:text-white",
  auctioned: "bg-amber-700 text-white dark:bg-amber-600 dark:text-white",
  forfeited: "bg-red-700 text-white dark:bg-red-600 dark:text-white",
}

/**
 * Store Pledges Page
 * 
 * Displays filterable list of pledges with search, status filtering,
 * date range filtering, and pagination.
 */
export default function StorePledges() {
  const navigate = useNavigate()
  const filters = usePledgeFilters(MOCK_PLEDGES)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pledges</h1>
          <p className="text-sm text-muted-foreground">Manage all pledge transactions.</p>
        </div>
        <button
          onClick={() => navigate("/store/pledges/new")}
          className="flex items-center gap-2 bg-primary text-primary-foreground rounded-lg px-4 py-2 font-medium hover:bg-primary/90"
        >
          <Plus className="h-5 w-5" /> New Pledge
        </button>
      </div>

      {/* Basic Filters */}
      <div className="flex gap-3 flex-col sm:flex-row">
        <PledgeSearchForm
          search={filters.search}
          onSearchChange={(val) => {
            filters.setSearch(val)
            filters.setPage(0)
          }}
        />

        <PledgeStatusFilter
          value={filters.statusFilter}
          onChange={(status) => {
            filters.setStatusFilter(status)
            filters.setPage(0)
          }}
          isOpen={filters.showStatusDropdown}
          onToggle={() => filters.setShowStatusDropdown(!filters.showStatusDropdown)}
          dropdownRef={filters.dropdownRef}
        />

        <button
          onClick={() => filters.setShowAdvanced(!filters.showAdvanced)}
          className={`flex items-center gap-2 border rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            filters.hasActiveFilters
              ? "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
              : "hover:bg-accent"
          }`}
        >
          Advanced
        </button>
      </div>

      {/* Advanced Date Filters */}
      {filters.showAdvanced && (
        <PledgeDateFilters
          pledgeFromDate={filters.pledgeFromDate}
          pledgeToDate={filters.pledgeToDate}
          expiryFromDate={filters.expiryFromDate}
          expiryToDate={filters.expiryToDate}
          onPledgeFromChange={(date) => {
            filters.setPledgeFromDate(date)
            filters.setPage(0)
          }}
          onPledgeToChange={(date) => {
            filters.setPledgeToDate(date)
            filters.setPage(0)
          }}
          onExpiryFromChange={(date) => {
            filters.setExpiryFromDate(date)
            filters.setPage(0)
          }}
          onExpiryToChange={(date) => {
            filters.setExpiryToDate(date)
            filters.setPage(0)
          }}
          isOpen={filters.showAdvanced}
          onToggle={() => filters.setShowAdvanced(!filters.showAdvanced)}
          hasActiveFilters={filters.hasActiveFilters}
          onClearFilters={filters.clearAllFilters}
        />
      )}

      {/* Table */}
      <PledgesTable
        pledges={filters.paginated}
        page={filters.page}
        onPageChange={filters.setPage}
        pageSize={filters.PAGE_SIZE}
        total={filters.total}
        onViewPledge={(pledgeNo) => navigate(`/store/pledges/${pledgeNo}`)}
        statusClasses={STATUS_CLASS}
        statusLabels={STATUS_LABEL}
      />
    </div>
  )
}
