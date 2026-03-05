import { createBrowserRouter } from "react-router-dom"

import Home from "@/pages/HomePage"
import LoginPage from "@/pages/LoginPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
])