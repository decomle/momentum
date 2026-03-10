import { ErrorSection } from "@/components/commons";
import HabitForm from "@/pages/habit/shared/HabitForms";
import useCreateHabit from "@/hooks/habit/useCreateHabit";


export default function CreateHabitForm() {
  const { createHabit, isLoading, isError, error: formError } = useCreateHabit()

  return (
    <>
      {isError && <ErrorSection title="Update habit failed" error={formError} />}
      {/* Form */}
      <HabitForm
        onSubmit={(data) => { createHabit(data) }}
        isLoading={isLoading}
        submitText="Create Habit"
      />
    </>
  )
}