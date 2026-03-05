import { createBrowserRouter } from "react-router-dom"

import Home from "@/pages/HomePage"
import LoginPage from "@/pages/LoginPage"
import DashboardPage from "@/pages/DashboardPage"
import AuthGuard from "@/features/auth/AuthGuard"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <AuthGuard><DashboardPage /></AuthGuard>,
  },
])