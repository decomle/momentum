import { Outlet } from "react-router-dom"
import { useLocation } from "react-router-dom"

export default function AppLayout() {
  const location = useLocation()
  const isAuthorPage = location.pathname === "/author"

  if (isAuthorPage) {
    return (
      <div className="min-h-screen bg-neutral-100 px-3 py-3 sm:px-4 sm:py-4">
        <div className="mx-auto min-h-[calc(100dvh-24px)] w-full max-w-[1240px] overflow-hidden rounded-[16px] bg-white shadow-xl ring-1 ring-neutral-300 sm:rounded-[24px]">
          <div id="app-scroll-container" className="h-full overflow-y-auto overflow-x-hidden no-scrollbar">
            <Outlet />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-100 flex items-start justify-center pt-[15px] px-2">
      <div className="w-full max-w-[375px] h-[min(calc(100dvh-15px),844px)] bg-white shadow-xl ring-1 ring-neutral-300 overflow-hidden rounded-[16px] sm:rounded-[16px]">
        <div id="app-scroll-container" className="h-full overflow-y-auto overflow-x-hidden no-scrollbar">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
