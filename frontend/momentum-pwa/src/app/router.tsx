import { createBrowserRouter } from "react-router-dom"
import LoginPage from "@/pages/LoginPage"

import DemoHomePage from "@/pages/demo/DemoHomePage"
import DemoRegistrationPage from "@/pages/demo/DemoRegistrationPage"
import DemoUpdateHabitPage from "@/pages/demo/DemoUpdateHabitPage"
import DemoLoginPage from "@/pages/demo/DemoLoginPage"
import DemoUpdateProfilePage from "@/pages/demo/DemoUpdateProfilePage"
import DemoCreateHabitPage from "@/pages/demo/DemoCreateHabitPage"
import DemoDemoLoginPage from "@/pages/demo/DemoLoginPage"
import DemoHabitPage from "@/pages/demo/DemoHabitPage"
import DemoHabitLogPage from "@/pages/demo/DemoHabitLogPage"
import DemoDashboardPage from "@/pages/demo/DemoDashboardPage"
import AuthGuard from "@/features/auth/AuthGuard"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DemoHomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/demo/login",
    element: <DemoLoginPage />,
  },
  {
    path: "/demo/create_habit",
    element: <DemoCreateHabitPage />,
  },
  {
    path: "/demo/update_habit",
    element: <DemoUpdateHabitPage />,
  },
  {
    path: "/demo/update_profile",
    element: <DemoUpdateProfilePage />,
  },
  {
    path: "/demo/login",
    element: <DemoDemoLoginPage />,
  },
  {
    path: "/demo/register",
    element: <DemoRegistrationPage />,
  },
  {
    path: "/demo/habit",
    element: <DemoHabitPage />,
  },
  {
    path: "/demo/habit_log",
    element: <DemoHabitLogPage />,
  },
  {
    path: "/demo/dashboard",
    element: <AuthGuard><DemoDashboardPage /></AuthGuard>,
  },
  {
    path: "/dashboard",
    element: <AuthGuard><DemoDashboardPage /></AuthGuard>,
  },
])