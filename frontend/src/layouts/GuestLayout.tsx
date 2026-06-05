import { Outlet } from "react-router-dom"

export default function GuestLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <Outlet />
    </div>
  )
}
