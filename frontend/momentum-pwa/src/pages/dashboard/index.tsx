import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { AuthorCard } from "@/components/commons"
import { DashboardHeading } from "@/components/headings"
import { LogoutCard, JammyLoader } from "@/components/commons"
import { CreateHabitCard, HabitCard, MetadataCard, CreateHabitButtons } from "../dashboard/DashboardSections"

export default function DashboardPage() {
  const navigate = useNavigate()
  const [isAtBottom, setIsAtBottom] = useState(false)

  const habits = [
    {
      name: "Morning Exercise",
      description: "10 minutes of stretching or light workout",
      stats: "Daily • 🔥 5 days • 🏆 12 days",
      note: "Keep the momentum going.",
      done: true,
    },
    {
      name: "Drink Water",
      description: "At least 8 glasses",
      stats: "Daily • 🔥 3 days • 🏆 9 days",
      note: "Small habits compound.",
      done: true,
    },
    {
      name: "Read Book",
      description: "Read at least 10 pages",
      stats: "Daily • 🔥 2 days • 🏆 8 days",
      note: "Knowledge compounds over time.",
      done: false,
    },
    {
      name: "Meditate",
      description: "5 minutes mindful breathing",
      stats: "Daily • 🔥 4 days • 🏆 10 days",
      note: "Calm mind, clearer focus.",
      done: true,
    },
    {
      name: "Journal",
      description: "Write 3 short reflections",
      stats: "Daily • 🔥 1 day • 🏆 6 days",
      note: "Small notes build awareness.",
      done: false,
    },
    {
      name: "Language Practice",
      description: "15 minutes vocabulary review",
      stats: "Daily • 🔥 6 days • 🏆 14 days",
      note: "Consistency beats intensity.",
      done: true,
    },
    {
      name: "Evening Walk",
      description: "20 minutes outdoor walk",
      stats: "Daily • 🔥 2 days • 🏆 7 days",
      note: "Movement helps reset the day.",
      done: false,
    },
    {
      name: "No Sugar Soda",
      description: "Avoid sweet drinks today",
      stats: "Daily • 🔥 8 days • 🏆 16 days",
      note: "Your future self will thank you.",
      done: true,
    },
    {
      name: "Plan Tomorrow",
      description: "Set top 3 priorities before bed",
      stats: "Daily • 🔥 3 days • 🏆 11 days",
      note: "Clear plan, smoother morning.",
      done: false,
    },
  ]

  const completedToday = habits.filter((habit) => habit.done).length
  const pendingToday = habits.length - completedToday
  const completionRate = habits.length > 0
    ? Math.round((completedToday / habits.length) * 100)
    : 0

  const meta = {
    date: "2026-03-05",
    lunar: "03/12",
    total_habits: habits.length,
    completed_today: completedToday,
    pending_today: pendingToday,
    completion_rate: completionRate,
    warning_messages: [],
    ai_message: "A fresh start is always possible.",
  }


  const handleLogout = () => {
    console.log('Fake logout action')
    navigate("/demo/login", { replace: true })
  }

  useEffect(() => {
    const scrollContainer = document.getElementById("app-scroll-container")
    if (!scrollContainer) return

    const updateBottomState = () => {
      const distanceToBottom =
        scrollContainer.scrollHeight - scrollContainer.scrollTop - scrollContainer.clientHeight
      setIsAtBottom(distanceToBottom <= 16)
    }

    updateBottomState()
    scrollContainer.addEventListener("scroll", updateBottomState, { passive: true })
    window.addEventListener("resize", updateBottomState)

    return () => {
      scrollContainer.removeEventListener("scroll", updateBottomState)
      window.removeEventListener("resize", updateBottomState)
    }
  }, [])

  return (
    <div className="min-h-full flex justify-center">
      <div className="w-full max-w-md min-h-full p-4 pb-6 flex flex-col">
        <div className="space-y-5">

          {/* Header */}
          <DashboardHeading additionalComponent={<LogoutCard onLogout={handleLogout} />} />

          {/* Meta */}
          <MetadataCard
            totalHabits={meta.total_habits}
            completedToday={meta.completed_today}
            pendingToday={meta.pending_today}
            completionRate={meta.completion_rate}
          />

          {/* AI Message */}
          <div className="text-sm italic text-neutral-500 px-1">
            {meta.ai_message}
          </div>

          {habits.length === 0 ? (
            <>
              <CreateHabitCard />
              <JammyLoader desc="Funfact, you can install Momentum as app" />
            </>
          ) : (
            habits.map((habit) => (
              <HabitCard habit={habit} />
            ))
          )}

          {habits.length > 0 && (
            <CreateHabitButtons isAtBottom={isAtBottom} />
          )}

        </div>

        <div className="pt-5 mt-auto border-t border-neutral-200 text-center">
          <AuthorCard />
        </div>
      </div>
    </div>
  )
}
