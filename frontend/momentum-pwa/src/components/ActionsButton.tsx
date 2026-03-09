import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useLogout } from "@/hooks"


export default function ActionsButton() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { logoutUser } = useLogout()
  const navigate = useNavigate()


  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
    }

    document.addEventListener("mousedown", handleOutsideClick)
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  const onActionClick = (callback: () => void) => {
    setIsOpen(false)
    callback()
  }

  return (
    <div className="self-center text-right leading-tight">
      <div className="relative mt-1" ref={menuRef}>
        <button
          type="button"
          aria-label="Open actions"
          aria-haspopup="menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-neutral-300 text-neutral-700 hover:bg-neutral-100"
        >
          <span className=" leading-none">☰</span>
        </button>

        {isOpen && (
          <div
            role="menu"
            className="absolute right-0 mt-2 w-40 rounded-md border border-neutral-200 bg-white p-1 shadow-md"
          >
            <button
              type="button"
              role="menuitem"
              onClick={() => onActionClick(() => navigate("/demo/update_profile"))}
              className="w-full rounded px-3 py-2 text-left text-xs font-medium text-neutral-700 hover:bg-neutral-100"
            >
              Update profile
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => onActionClick(() => logoutUser())}
              className="w-full rounded px-3 py-2 text-left text-xs font-medium text-red-600 hover:bg-red-50"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
