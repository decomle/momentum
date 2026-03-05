import { Outlet } from "react-router-dom"

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-neutral-100 flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-white shadow-lg ring-1 ring-neutral-200">
        <Outlet />
      </div>
    </div>
  )
}
