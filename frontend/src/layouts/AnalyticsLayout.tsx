import { Outlet } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"

export default function AnalyticsLayout() {
  const { user, logout } = useAuth()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-background px-4 py-6 flex flex-col gap-2">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Analytics</p>
          <p className="mt-1 text-sm font-medium">{user?.name}</p>
        </div>
        {/* Nav items: Overview, Branch Reports, Trends */}
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b px-6">
          <span className="font-semibold">Analytics</span>
          <button onClick={logout} className="text-sm text-muted-foreground hover:text-foreground">
            Logout
          </button>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
