import { LeftAlginedHeading } from "@/components/headings";
import { AuthorCard } from "@/components/commons";

import CreateHabitForm from "@/pages/habit/create/CreateHabitForm";


export default function HabitCreatePage() {
  return (
    <div className="h-full flex flex-col p-4">
      <div className="w-full flex-1 flex flex-col">
        {/* Title */}
        <LeftAlginedHeading heading="Create Habit" desc="Start a new journey, shall we?" />

        <div className="pt-6 border-t border-neutral-200 space-y-6">
          <CreateHabitForm />
        </div>
        <div className="mt-auto pt-5 border-t border-neutral-200 text-center">
          <AuthorCard />
        </div>
      </div>
    </div>
  )
}