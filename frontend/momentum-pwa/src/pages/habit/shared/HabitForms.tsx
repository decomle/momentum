import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { habitSchema, type HabitFormValues, HABIT_FREQUENCIES } from "@/lib/schemas";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const inputClass = (hasError: boolean) =>
  `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
    hasError ? "border-red-300 focus:ring-red-200" : "border-neutral-200 focus:ring-neutral-300"
  }`;

interface HabitFormProps {
  initialData?: Partial<HabitFormValues>;
  onSubmit: (data: HabitFormValues) => void;
  isLoading: boolean;
  submitText: string;
}

export default function HabitForm({ initialData, onSubmit, isLoading, submitText }: HabitFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HabitFormValues>({
    resolver: zodResolver(habitSchema),
    mode: "onBlur",
    defaultValues: {
      name: initialData?.name ?? "",
      description: initialData?.description ?? "",
      frequency: initialData?.frequency ?? "DAILY",
      targetPerPeriod: initialData?.targetPerPeriod ?? 1,
    },
  });

  // Sync if initialData changes (e.g. after a fetch)
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Habit name */}
      <div className="space-y-1">
        <label className="mb-1 block text-sm text-neutral-600">Habit name*</label>
        <input type="text" className={inputClass(!!errors.name)} {...register("name")} />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label className="mb-1 block text-sm text-neutral-600">Description</label>
        <textarea {...register("description")} className={inputClass(!!errors.description)} rows={3} />
        {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>}
      </div>

      {/* Frequency */}
      <div className="space-y-1">
        <div className="flex gap-4">
          {HABIT_FREQUENCIES.map((freq) => (
            <label key={freq} className="inline-flex items-center gap-2 text-sm text-neutral-700">
              <input type="radio" {...register("frequency")} value={freq} className="w-4 h-4" />
              {freq}
            </label>
          ))}
        </div>
        {errors.frequency && <p className="mt-1 text-xs text-red-600">{errors.frequency.message}</p>}
      </div>

      {/* Target */}
      <div className="space-y-1">
        <label className="text-sm text-neutral-600">Target per period*</label>
        <input 
            type="number" 
            {...register("targetPerPeriod", { valueAsNumber: true })} 
            className={inputClass(!!errors.targetPerPeriod)} 
        />
        {errors.targetPerPeriod && <p className="mt-1 text-xs text-red-600">{errors.targetPerPeriod.message}</p>}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Link to="/dashboard" className="text-center flex-1 py-3 border border-neutral-300 rounded-md text-sm hover:bg-neutral-100">
          Cancel
        </Link>
        <button type="submit" disabled={isLoading} className="text-center flex-1 py-3 btn-primary rounded-md transition">
          {isLoading ? "Saving..." : submitText}
        </button>
      </div>
    </form>
  );
}