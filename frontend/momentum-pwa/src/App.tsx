import { Routes, Route } from "react-router-dom"

function Home() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Hello, This is momentum</h1>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}