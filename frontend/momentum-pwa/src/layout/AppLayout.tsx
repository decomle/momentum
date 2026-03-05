import { Outlet } from "react-router-dom"

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-neutral-200 flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-white border-x border-neutral-300 shadow-xl">
        <Outlet />
      </div>
    </div>
  )
}
