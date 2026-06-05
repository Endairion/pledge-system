import { useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { ThemeToggle } from "@/components/ThemeToggle"
import {
  LayoutDashboard, Users, Building2, TrendingUp,
  Settings, BarChart3, Menu, X, LogOut, Tag,
  ChevronLeft, ChevronRight, UserCircle, FileText, Database, ChevronDown,
  Type, Church, Globe, Coins, Diamond, Receipt
} from "lucide-react"

const nav = [
  { to: "/admin",            label: "Dashboard",  icon: LayoutDashboard, end: true },
  { to: "/admin/customers",  label: "Customers",  icon: UserCircle },
  { to: "/admin/pledges",    label: "Pledges",    icon: FileText },
  { to: "/admin/users",      label: "Users",      icon: Users },
  { to: "/admin/branches",   label: "Branches",   icon: Building2 },

  
  { to: "/admin/gold-rates", label: "Gold Rates", icon: TrendingUp },
  { to: "/admin/reports",    label: "Reports",    icon: BarChart3 },
  { to: "/admin/settings",   label: "Settings",   icon: Settings },
]

// Lookup tables grouped separately
const lookupTables = [
  { to: "/admin/categories", label: "Categories", icon: Tag },
  { to: "/admin/customer-titles", label: "Titles", icon: Type },
  { to: "/admin/races", label: "Races", icon: Users },
  { to: "/admin/religions", label: "Religions", icon: Church },
  { to: "/admin/nationalities", label: "Nationalities", icon: Globe },
  { to: "/admin/source-of-gold-types", label: "Gold Sources", icon: Coins },
  { to: "/admin/gold-qualities", label: "Gold Qualities", icon: Diamond },
  { to: "/admin/fee-types", label: "Fee Types", icon: Receipt },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [lookupDropdownOpen, setLookupDropdownOpen] = useState(false)

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
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Admin Panel</p>
          <p className="mt-0.5 text-sm font-medium">{user?.name}</p>
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

        {/* Lookup Tables Dropdown */}
        <div className="mt-2 border-t pt-2">
          <button
            onClick={() => setLookupDropdownOpen(!lookupDropdownOpen)}
            title="Lookup Tables"
            className={`flex w-full items-center rounded-md py-2 text-sm transition-colors ${
              collapsed ? "md:justify-center md:px-2 gap-3 px-3" : "gap-3 px-3"
            } text-muted-foreground hover:bg-accent hover:text-accent-foreground`}
          >
            <Database className="h-4 w-4 shrink-0" />
            <span className={collapsed ? "md:hidden" : "flex-1"}>Reference Data</span>
            <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${collapsed ? "md:hidden" : ""} ${
              lookupDropdownOpen ? "rotate-180" : ""
            }`} />
          </button>

          {/* Dropdown Items */}
          {(lookupDropdownOpen && !collapsed) && (
            <div className="ml-4 flex flex-col gap-1">
              {lookupTables.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    [
                      "flex items-center rounded-md py-2 text-xs transition-colors gap-2 px-3",
                      isActive
                        ? "bg-primary/20 text-primary"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
                    ].join(" ")
                  }
                  title={label}
                  onClick={() => setOpen(false)}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>
          )}

          {/* Mobile: Show all lookup tables when dropdown open */}
          {(lookupDropdownOpen && collapsed) && (
            <div className="md:hidden ml-4 flex flex-col gap-1">
              {lookupTables.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    [
                      "flex items-center rounded-md py-2 text-xs transition-colors gap-2 px-3",
                      isActive
                        ? "bg-primary/20 text-primary"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
                    ].join(" ")
                  }
                  title={label}
                  onClick={() => setOpen(false)}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>
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
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setOpen(false)} />
      )}

      <div className={`fixed inset-y-0 left-0 z-50 flex md:relative md:z-auto md:translate-x-0 transition-transform duration-200 ${
        open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
        {sidebar}
      </div>

      <div className="flex flex-1 flex-col min-w-0">
        <header className="flex h-14 shrink-0 items-center justify-between border-b px-4 md:px-6">
          <button className="md:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <span className="font-semibold text-sm">Admin</span>
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
