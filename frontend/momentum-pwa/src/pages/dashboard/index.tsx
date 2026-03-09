import { 
  AuthorCard, 
  JammyLoader,
  ActionsButton, 
  LoadingDots, 
  ErrorSection 
} from "@/components/commons";

import { DashboardHeading } from "@/components/headings";
import { 
  CreateHabitCard, 
  HabitCard, 
  MetadataCard, 
  CreateHabitButtons 
} from "@/pages/dashboard/DashboardSections";

import { useDashboard, useScrollPosition } from "@/hooks";

export default function DashboardPage() {
  const { isAtBottom } = useScrollPosition("app-scroll-container");
  const { metadata, habits, hasHabits, isLoading, isError, isSuccess, errorMessage: formError } = useDashboard();

  return (
    <div className="min-h-full flex justify-center">
      <div className="w-full max-w-md min-h-full p-4 pb-6 flex flex-col">
        <div className="space-y-5">
          <DashboardHeading additionalComponent={<ActionsButton />} />

          <MetadataCard {...metadata} />
          
          {isLoading && <JammyLoader desc={<LoadingDots prefix="Loading dashboard..." />} />}

          {isError && <ErrorSection error={formError}/>}

          {isSuccess && (
            <>
              {hasHabits ? (
                habits.map((h) => <HabitCard key={h.id} habit={h} />)
              ) : (
                <CreateHabitCard />
              )}

              {hasHabits && <CreateHabitButtons isAtBottom={isAtBottom} />}
            </>
          )}
        </div>

        <div className="pt-5 mt-auto border-t border-neutral-200 text-center">
          <AuthorCard />
        </div>
      </div>
    </div>
  );
}
