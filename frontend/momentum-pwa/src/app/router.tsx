import { createBrowserRouter } from "react-router-dom"

import HomePage from "@/pages/home"
import RegisterPage from "@/pages/account/register"
import ProfilePage from "@/pages/account/profile"
import LoginPage from "@/pages/login"
import HabitLogPage from "@/pages/habit/log"
import HabitViewPage from "@/pages/habit/view"
import DashboardPage from "@/pages/dashboard"
import AuthorPage from "@/pages/AuthorPage"
import HabitUpdatePage from "@/pages/habit/update"
import HabitCreatePage from "@/pages/habit/create"
import AuthGuard from "@/features/auth/AuthGuard"
import AppLayout from "@/layout/AppLayout"
import GlobalErrorPage from "@/pages/generals/error"
import TermsPage from "@/pages/generals/terms"

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <GlobalErrorPage />,
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
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/author",
        element: <AuthorPage />,
      },
      {
        path: "/dashboard",
        element: <AuthGuard><DashboardPage /></AuthGuard>,
      },
      {
        path: "/habits/:habit_id/log",
        element: <AuthGuard><HabitLogPage /></AuthGuard>,
      },
      {
        path: "/habits/:habit_id",
        element: <AuthGuard><HabitViewPage /></AuthGuard>,
      },
      {
        path: "/profile",
        element: <AuthGuard><ProfilePage /></AuthGuard>,
      },
      {
        path: "/habits/:habit_id/update",
        element: <AuthGuard><HabitUpdatePage /></AuthGuard>,
      },
      {
        path: "/habits/create",
        element: <AuthGuard><HabitCreatePage /></AuthGuard>,
      },
      {
        path: "/terms",
        element: <TermsPage />,
      }
    ],
  },
])
