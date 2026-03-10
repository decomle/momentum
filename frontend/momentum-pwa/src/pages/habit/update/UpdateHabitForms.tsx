import useUpdateHabit from "@/hooks/habit/useUpdateHabit";
import type { HabitSummary } from "@/api/habit";
import { ErrorSection, MessageCard } from "@/components/commons";
import HabitForm from "@/pages/habit/shared/HabitForms";



export default function UpdateHabitForms({ habit }: { habit: HabitSummary }) {
  const { updateHabit, isLoading, isSuccess, isError, error: formError } = useUpdateHabit(habit.id)

  return (
    <>
      {isSuccess && <MessageCard message="Habit updated successfully." />}
      {isError && <ErrorSection title="Update habit failed" error={formError} />}
      {/* Form */}
      <HabitForm 
        initialData={habit} 
        onSubmit={(data) => updateHabit(data)} 
        isLoading={isLoading}
        submitText="Update Habit"
      />
    </>
  )
}