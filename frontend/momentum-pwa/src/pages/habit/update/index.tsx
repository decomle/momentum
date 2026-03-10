import { useParams } from "react-router-dom";

import { LeftAlginedHeading } from "@/components/headings";
import { ErrorSection, AuthorCard } from "@/components/commons";

import UpdateHabitForms from "@/pages/habit/update/UpdateHabitForms";


export default function HabitUpdatePage() {
  const { habit_id: habitId } = useParams<{ habit_id: string }>()

  if (!habitId) {
    return (
      <div className="p-4">
        <ErrorSection error="Missing habit id." />
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col p-4">
      <div className="w-full flex-1 flex flex-col">
        {/* Title */}
        <LeftAlginedHeading heading="Update Habit" desc="Modify the habit details." />

        <div className="pt-6 border-t border-neutral-200 space-y-6">
          <UpdateHabitForms habitId={habitId} />
        </div>
        <div className="mt-auto pt-5 border-t border-neutral-200 text-center">
          <AuthorCard />
        </div>
      </div>
    </div>
  )
}