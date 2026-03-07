import { createBrowserRouter } from "react-router-dom"

import HomePage from "@/pages/home"
import RegisterPage from "@/pages/account/register"
import DemoRegisterPage from "@/pages/demo/DemoRegistrationPage"
import DemoUpdateHabitPage from "@/pages/demo/DemoUpdateHabitPage"
import LoginPage from "@/pages/login"
import DemoUpdateProfilePage from "@/pages/demo/DemoUpdateProfilePage"
import DemoCreateHabitPage from "@/pages/demo/DemoCreateHabitPage"
import DemoHabitPage from "@/pages/demo/DemoHabitPage"
import DemoHabitLogPage from "@/pages/demo/DemoHabitLogPage"
import DemoDashboardPage from "@/pages/demo/DemoDashboardPage"
import DemoNotFoundPage from "@/pages/demo/Demo404Page"
import DemoWeeklyHabitPage from "@/pages/demo/DemoWeeklyHabitPage"
import DemoTermsPage from "@/pages/demo/DemoTermsPage"
import AuthorPage from "@/pages/AuthorPage"

import AuthGuard from "@/features/auth/AuthGuard"
import AppLayout from "@/layout/AppLayout"

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/demo/404",
        element: <DemoNotFoundPage />,
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
        path: "/demo/register",
        element: <DemoRegisterPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/demo/terms",
        element: <DemoTermsPage />,
      },
      {
        path: "/demo/habit",
        element: <DemoHabitPage />,
      },
      {
        path: "/demo/habit_weekly",
        element: <DemoWeeklyHabitPage />,
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
        path: "/author",
        element: <AuthorPage />,
      },
      {
        path: "/dashboard",
        element: <AuthGuard><DemoDashboardPage /></AuthGuard>,
      },
    ],
  },
])
