import { Link } from "react-router-dom";
import { type HabitFormValues } from "@/lib/schemas";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { habitSchema, HABIT_FREQUENCIES } from "@/lib/schemas";
import { useEffect } from "react";
import useUpdateHabit from "@/hooks/habit/useUpdateHabit";
import type { HabitSummary } from "@/api/habit";
import { ErrorSection, MessageCard } from "@/components/commons";


const inputClass = (hasError: boolean) =>
  `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${hasError ? "border-red-300 focus:ring-red-200" : "border-neutral-200 focus:ring-neutral-300"
  }`

export default function UpdateHabitForms({ habit }: { habit: HabitSummary }) {
  const { updateHabit, isLoading, isSuccess, isError, error: formError } = useUpdateHabit(habit.id)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HabitFormValues>({
    resolver: zodResolver(habitSchema),
    mode: "onBlur",
    defaultValues: {
      habitName: habit?.name ?? "",
      description: habit?.description ?? "",
      frequency: (habit?.frequency ?? "DAILY"),
      targetPerPeriod: Number(habit?.targetPerPeriod ?? 1),
    },
  })

  useEffect(() => {
    reset({
      habitName: habit?.name ?? "",
      description: habit?.description ?? "",
      frequency: habit?.frequency ?? "DAILY",
      targetPerPeriod: habit?.targetPerPeriod ?? 1
    })
  }, [reset, habit])
  

  return (
    <>
      {isSuccess && <MessageCard message="Habit updated successfully." />}
      {isError && <ErrorSection title="Update habit failed" error={formError} />}
      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit((data) => updateHabit(data))} noValidate>

        {/* Habit name */}
        <div className="space-y-1">
          <label className="mb-1 block text-sm text-neutral-600">Habit name</label>
          <input type="text" className={inputClass(!!errors.habitName)} {...register("habitName")} />
          {errors.habitName && <p className="mt-1 text-xs text-red-600">{errors.habitName.message}</p>}

        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="mb-1 block text-sm text-neutral-600">Description</label>
          <textarea {...register("description")} className={inputClass(!!errors.description)} rows={3} />
          {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>}

          <p className="text-xs text-neutral-500">
            Optional short explanation of the habit.
          </p>
        </div>

        {/* Frequency */}
        <div className="space-y-1">
          <div className="flex gap-4">
            {HABIT_FREQUENCIES.map(freq => (
              <label key={freq} className="inline-flex items-center gap-2 text-sm text-neutral-700">
                <input type="radio" {...register("frequency")}
                  value={freq}
                  className="w-4 h-4"
                />
                {freq}
              </label>
            ))}
          </div>
          {errors.frequency && <p className="mt-1 text-xs text-red-600">{errors.frequency.message}</p>}
          <p className="text-xs text-neutral-500">
            How often this habit should be completed.
          </p>
        </div>

        {/* Target per period */}
        <div className="space-y-1">
          <label className="text-sm text-neutral-600">Target per period</label>
          <input type="number" {...register("targetPerPeriod", { valueAsNumber: true })} min={1} className={inputClass(!!errors.targetPerPeriod)} />
          {errors.targetPerPeriod && <p className="mt-1 text-xs text-red-600">{errors.targetPerPeriod.message}</p>}
          <p className="text-xs text-neutral-500">
            Example: 5 time per week.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link to="/dashboard" className="text-center flex-1 py-3 border border-neutral-300 rounded-md text-sm hover:bg-neutral-100">
            Cancel
          </Link>

          <button type="submit" disabled={isLoading} className="text-center flex-1 py-3 btn-primary rounded-md transition">
            {isLoading ? "Saving..." : "Update Habit"}
          </button>
        </div>
      </form>
    </>
  )
}