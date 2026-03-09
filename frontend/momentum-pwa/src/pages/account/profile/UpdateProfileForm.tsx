import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { type CurrentUser } from "@/api/user"
import { ErrorSection, MessageCard } from "@/components/commons"
import { useUpdateProfile } from "@/hooks"
import { TIMEZONES, updateProfileSchema, type UpdateProfileFormValues } from "@/lib/schemas"

type UpdateProfileFormProps = {
  user: CurrentUser
}

const inputClass = (hasError: boolean) =>
  `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
    hasError ? "border-red-300 focus:ring-red-200" : "border-neutral-200 focus:ring-neutral-300"
  }`

export default function UpdateProfileForm({ user }: UpdateProfileFormProps) {
  const [timezoneOpen, setTimezoneOpen] = useState(false)
  const { updateProfile, isLoading, isSuccess, isError, error: formError } = useUpdateProfile()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    mode: "onBlur",
    defaultValues: {
      username: user.username ?? "",
      firstName: user.first_name ?? "",
      lastName: user.last_name ?? "",
      timezone: user.timezone,
      phoneNumber: user.phone_number ?? "",
      selfIntroduction: user.self_introduction ?? "",
    },
  })

  const timezoneQuery = watch("timezone") ?? ""
  const filtered = useMemo(
    () => TIMEZONES.filter((tz) => tz.toLowerCase().includes(timezoneQuery.toLowerCase())),
    [timezoneQuery]
  )

  useEffect(() => {
    reset({
      username: user.username ?? "",
      firstName: user.first_name ?? "",
      lastName: user.last_name ?? "",
      timezone: user.timezone,
      phoneNumber: user.phone_number ?? "",
      selfIntroduction: user.self_introduction ?? "",
    })
  }, [reset, user])

  return (
    <>
      {isSuccess && <MessageCard message="Profile updated successfully." />}
      {isError && <ErrorSection title="Update profile failed" error={formError} />}

      <form className="space-y-4" onSubmit={handleSubmit((data) => updateProfile(data))} noValidate>
        <div>
          <label className="mb-1 block text-sm text-neutral-600">Username</label>
          <input type="text" {...register("username")} className={inputClass(!!errors.username)} />
          {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm text-neutral-600">Email</label>
          <input type="email" value={user.email} readOnly
            className="w-full rounded-md border border-neutral-200 bg-neutral-100 px-3 py-2 text-neutral-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-neutral-600">First name</label>
          <input type="text" {...register("firstName")} className={inputClass(!!errors.firstName)} />
          {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm text-neutral-600">Last name</label>
          <input type="text" {...register("lastName")} className={inputClass(!!errors.lastName)} />
          {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>}
        </div>

        <div className="relative">
          <label className="mb-1 block text-sm text-neutral-600">Timezone</label>
          <input
            value={timezoneQuery}
            onFocus={() => setTimezoneOpen(true)}
            onChange={(event) => {
              setValue("timezone", event.target.value, { shouldValidate: false })
              setTimezoneOpen(true)
            }}
            className={inputClass(!!errors.timezone)}
          />
          <p className="mt-1 text-xs text-neutral-500">
            Your timezone determines when a new day begins for your habit streaks.
          </p>

          {timezoneOpen && (
            <div className="absolute z-50 mt-1 max-h-40 w-full overflow-y-auto rounded-md border border-neutral-200 bg-white shadow-lg">
              {filtered.map((tz) => (
                <button
                  key={tz}
                  type="button"
                  className="w-full px-3 py-2 text-left text-sm hover:bg-neutral-100"
                  onClick={() => {
                    setValue("timezone", tz, { shouldValidate: true })
                    setTimezoneOpen(false)
                  }}
                >
                  {tz}
                </button>
              ))}
            </div>
          )}

          {errors.timezone && <p className="mt-1 text-xs text-red-600">{errors.timezone.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm text-neutral-600">Phone number (optional)</label>
          <input type="tel" placeholder="+84..." {...register("phoneNumber")} className={inputClass(false)} />
        </div>

        <div>
          <label className="mb-1 block text-sm text-neutral-600">Self introduction (optional)</label>
          <textarea rows={3} placeholder="A few words about yourself..."
            {...register("selfIntroduction")}
            className="w-full rounded-md border border-neutral-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-300"
          />
        </div>

        <button type="submit" disabled={isLoading} className="btn-primary w-full rounded-md py-2 transition disabled:opacity-60">
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </>
  )
}
