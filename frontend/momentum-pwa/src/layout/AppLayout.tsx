import { type ReactNode } from "react"

type Props = {
  children: ReactNode
}

export default function AppLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-white shadow-sm">
        {children}
      </div>
    </div>
  )
}