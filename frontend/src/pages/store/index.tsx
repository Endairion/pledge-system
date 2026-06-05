import { useNavigate } from "react-router-dom"
import { StatsGrid } from "@/components/StatsGrid"
import { QuickActions } from "@/components/QuickActions"
import { SecondaryMetrics } from "@/components/SecondaryMetrics"
import { RecentActivityTable } from "@/components/RecentActivityTable"

interface RecentActivity {
  id: string
  customer: string
  action: "created" | "renewed" | "redeemed"
  pledgeNo: string
  amount: number
  time: string
}

/**
 * Store Dashboard Page
 * 
 * Displays summary stats, quick actions, and recent activity for store portal.
 */
export default function StoreDashboard() {
  const navigate = useNavigate()

  // Mock data for today
  const stats = {
    createdToday: 5,
    renewedToday: 3,
    redeemedToday: 2,
    activePledges: 47,
    expiringsoon: 8,
    totalLoanValue: 125450,
    avgPledgeValue: 2670,
  }

  // Mock recent activity
  const recentActivity: RecentActivity[] = [
    {
      id: "1",
      customer: "Ahmad bin Ali",
      action: "created",
      pledgeNo: "PLG-2026-001",
      amount: 5000,
      time: "10:30 AM",
    },
    {
      id: "2",
      customer: "Siti binti Hassan",
      action: "renewed",
      pledgeNo: "PLG-2026-002",
      amount: 3500,
      time: "10:15 AM",
    },
    {
      id: "3",
      customer: "Lim Ah Kow",
      action: "created",
      pledgeNo: "PLG-2026-003",
      amount: 2800,
      time: "09:45 AM",
    },
    {
      id: "4",
      customer: "Rajkumar a/l Subramaniam",
      action: "redeemed",
      pledgeNo: "PLG-2026-004",
      amount: 4200,
      time: "09:20 AM",
    },
    {
      id: "5",
      customer: "Wong Mei Lin",
      action: "created",
      pledgeNo: "PLG-2026-005",
      amount: 6100,
      time: "08:50 AM",
    },
  ]

  const getActionColor = (action: string) => {
    switch (action) {
      case "created":
        return "bg-emerald-700 text-white dark:bg-emerald-600 dark:text-white"
      case "renewed":
        return "bg-blue-700 text-white dark:bg-blue-600 dark:text-white"
      case "redeemed":
        return "bg-amber-700 text-white dark:bg-amber-600 dark:text-white"
      default:
        return "bg-gray-700 text-white dark:bg-gray-600 dark:text-white"
    }
  }

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      created: "Created",
      renewed: "Renewed",
      redeemed: "Redeemed",
    }
    return labels[action] || action
  }

  const statsData = [
    { label: "Created Today", value: stats.createdToday.toString(), color: "text-emerald-600" },
    { label: "Renewed Today", value: stats.renewedToday.toString(), color: "text-blue-600" },
    { label: "Redeemed Today", value: stats.redeemedToday.toString(), color: "text-amber-600" },
    { label: "Active Pledges", value: stats.activePledges.toString(), color: "text-slate-600" },
  ]


  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Store Dashboard</h1>
        <p className="text-muted-foreground">Today • {new Date().toLocaleDateString()}</p>
      </div>

      {/* Quick Actions */}
      <QuickActions
        onCreatePledge={() => navigate("/store/pledges/new")}
        onViewAll={() => navigate("/store/pledges")}
      />

      {/* Today's Stats */}
      <StatsGrid stats={statsData} />

      {/* Secondary Metrics */}
      <SecondaryMetrics
        expiringCount={stats.expiringsoon}
        totalLoanValue={stats.totalLoanValue}
        avgPledgeValue={stats.avgPledgeValue}
      />

      {/* Recent Activity */}
      <RecentActivityTable
        activities={recentActivity}
        getActionColor={getActionColor}
        getActionLabel={getActionLabel}
      />
    </div>
  )
}
