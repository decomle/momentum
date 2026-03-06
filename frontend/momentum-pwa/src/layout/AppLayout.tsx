import { Outlet } from "react-router-dom"

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center sm:items-start sm:pt-[15px] sm:px-2">
      <div className="w-full max-w-[390px] h-[100dvh] sm:h-[min(calc(100dvh-15px),844px)] bg-white shadow-xl ring-1 ring-neutral-300 overflow-hidden sm:rounded-[24px]">
        <div className="h-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
