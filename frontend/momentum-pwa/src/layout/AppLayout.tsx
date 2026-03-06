import { Outlet } from "react-router-dom"

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-neutral-100 flex items-start justify-center pt-[15px] px-2">
      <div className="w-full max-w-[390px] h-[min(calc(100dvh-15px),844px)] bg-white shadow-xl ring-1 ring-neutral-300 overflow-hidden rounded-[16px] sm:rounded-[24px]">
        <div className="h-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
