import { Routes, Route } from "react-router-dom"
import AppLayout from "./layout/AppLayout"

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-semibold tracking-tight">
        Hello, This is Momentum
      </h1>
    </div>
  )
}

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </AppLayout>
  )
}