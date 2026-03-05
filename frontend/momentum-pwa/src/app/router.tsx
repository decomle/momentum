import { createBrowserRouter } from "react-router-dom"

import HomePage from "@/pages/HomePage"
import RegistrationPage from "@/pages/RegistrationPage"
import LoginPage from "@/pages/LoginPage"
import UpdateProfilePage from "@/pages/UpdateProfilePage"
import CreateHabitPage from "@/pages/CreateHabitPage"
import DemoLoginPage from "@/pages/DemoLoginPage"
import HabitPage from "@/pages/HabitPage"
import HabitLogPage from "@/pages/HabitLogPage"
import DashboardPage from "@/pages/DashboardPage"
import AuthGuard from "@/features/auth/AuthGuard"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/create_habit",
    element: <CreateHabitPage />,
  },
  {
    path: "/update_profile",
    element: <UpdateProfilePage />,
  },
  {
    path: "/demo_login",
    element: <DemoLoginPage />,
  },
  {
    path: "/register",
    element: <RegistrationPage />,
  },
  {
    path: "/habit",
    element: <HabitPage />,
  },
  {
    path: "/habit_log",
    element: <HabitLogPage />,
  },
  {
    path: "/dashboard",
    element: <AuthGuard><DashboardPage /></AuthGuard>,
  },
])