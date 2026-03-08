import { useState } from "react"
import { useLogout } from "@/hooks"

export default function LogoutCard() {
  const [date] = useState(new Date().toISOString().split('T')[0])
  const { logoutUser } = useLogout();

  return (
    <div className="self-end text-right leading-tight">
      <p className="text-sm text-neutral-500">
        {date}
      </p>
      <p className="mt-0.5 text-xs text-neutral-500">
        <button onClick={() => logoutUser()}
          className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100"
        >
          Log out
        </button>
      </p>
    </div>
  )
}