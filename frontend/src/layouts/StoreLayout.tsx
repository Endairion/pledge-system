import { useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { ThemeToggle } from "@/components/ThemeToggle"
import {
  LayoutDashboard, Users, Package, RefreshCw, HandCoins,
  Gavel, Bell, Banknote, BarChart3, Menu, X, LogOut,
  ChevronLeft, ChevronRight,
} from "lucide-react"

const nav = [
  { to: "/store",         label: "Dashboard",   icon: LayoutDashboard, end: true },
  { to: "/store/pledges",     label: "Pledges",     icon: Package },
  { to: "/store/customers",   label: "Customers",   icon: Users },
  { to: "/store/renewals",    label: "Renewals",    icon: RefreshCw },
  { to: "/store/redemptions", label: "Redemptions", icon: HandCoins },
  { to: "/store/auctions",    label: "Auctions",    icon: Gavel },
  { to: "/store/reminders",   label: "Reminders",   icon: Bell },
  { to: "/store/cash",        label: "Cash",        icon: Banknote },
  { to: "/store/reports",     label: "Reports",     icon: BarChart3 },
]

export default function StoreLayout() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "flex items-center rounded-md py-2 text-sm transition-colors",
      collapsed ? "md:justify-center md:px-2 gap-3 px-3" : "gap-3 px-3",
      isActive
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
    ].join(" ")

  const sidebar = (
    <aside className={`flex flex-col border-r bg-background transition-all duration-200 overflow-hidden ${
      collapsed ? "w-64 md:w-14" : "w-64"
    }`}>
      <div className={`border-b h-14 flex items-center shrink-0 ${collapsed ? "md:justify-center px-2" : "px-4 justify-between"}`}>
        <div className={collapsed ? "md:hidden" : ""}>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Store Portal</p>
          <p className="mt-0.5 text-sm font-medium">{user?.name}</p>
          {user?.branch && <p className="text-xs text-muted-foreground">{user.branch.name}</p>}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex items-center justify-center rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-4 flex flex-col gap-1">
        {nav.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={navLinkClass} title={label} onClick={() => setOpen(false)}>
            <Icon className="h-4 w-4 shrink-0" />
            <span className={collapsed ? "md:hidden" : ""}>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="border-t px-2 py-3 flex flex-col gap-1">
        <button
          onClick={logout}
          title="Logout"
          className={`flex w-full items-center rounded-md py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors ${
            collapsed ? "md:justify-center md:px-2 gap-3 px-3" : "gap-3 px-3"
          }`}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span className={collapsed ? "md:hidden" : ""}>Logout</span>
        </button>
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen">
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar — fixed on mobile, static on desktop */}
      <div className={`fixed inset-y-0 left-0 z-50 flex md:relative md:z-auto md:translate-x-0 transition-transform duration-200 ${
        open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
        {sidebar}
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col min-w-0">
        <header className="flex h-14 shrink-0 items-center justify-between border-b px-4 md:px-6">
          <button className="md:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <span className="font-semibold text-sm">Store</span>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button onClick={logout} className="text-sm text-muted-foreground hover:text-foreground">
              Logout
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
