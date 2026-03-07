import { useState } from "react"
import { Link } from "react-router-dom"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

import { ErrorSection } from "@/pages/account/shared"
import { register as registerApi } from "@/api/auth"

const TIMEZONES = Intl.supportedValuesOf("timeZone")

const registerSchema = z.object(
  {
    username: z.string().trim().min(1, "Username is required."),
    email: z.string().trim().min(1, "Email is required.")
      .pipe(z.email("Please enter a valid email address.")),
    firstName: z.string().trim().min(1, "First name is required."),
    lastName: z.string().trim().min(1, "Last name is required."),
    password: z.string().trim().min(1, "Password is required."),
    confirmPassword: z.string().trim().min(1, "Please confirm your password."),
    timezone: z.string().refine((val) => TIMEZONES.includes(val), {
      message: "Please select a valid timezone from the list;"
    }),
    phoneNumber: z.string().optional(),
    selfIntroduction: z.string().optional(),
    acceptedTerms: z.boolean().refine((value) => value, {
      message: "You must accept the Terms and Conditions.",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  })

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterForm() {
  const [timezoneOpen, setTimezoneOpen] = useState(false)
  const navigate = useNavigate()
  const mutation = useMutation({
    onSuccess: () => {
      navigate("/login", {
        replace: true,
        state: { message: "Account created successfully. Please log in." },
      })
    },
    mutationFn: (data: RegisterFormValues) =>
      registerApi({
        email: data.email,
        password: data.password,
        username: data.username,
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.phoneNumber || undefined,
        self_introduction: data.selfIntroduction || undefined,
      }),
  })

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      phoneNumber: "",
      selfIntroduction: "",
      acceptedTerms: false,
    },
  })

  const timezoneQuery = watch("timezone") ?? ""
  const filtered = TIMEZONES.filter((tz) => tz.toLowerCase().includes(timezoneQuery.toLowerCase()))

  function selectTimezone(tz: string) {
    setValue("timezone", tz, { shouldDirty: true, shouldTouch: true, shouldValidate: true })
    setTimezoneOpen(false)
  }

  const onSubmit = (data: RegisterFormValues) => {
    mutation.mutate(data)
  }

  const inputClass = (hasError: boolean) =>
    `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
      hasError ? "border-red-300 focus:ring-red-200" : "border-neutral-200 focus:ring-neutral-300"
    }`

  return (
    <>
      {mutation.isError && 
        <ErrorSection
          title="We couldn't create your account"
          error={mutation.error instanceof Error ? mutation.error.message : "An unexpected error occurred;"}
        />
      }
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label className="block text-sm text-neutral-600 mb-1">Username *</label>
          <input type="text" placeholder="yourname" {...register("username")} className={inputClass(!!errors.username)} />
          {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username.message}</p>}
        </div>

        <div>
          <label className="block text-sm text-neutral-600 mb-1">Email *</label>
          <input type="email" placeholder="your_email@gmail.com" {...register("email")} className={inputClass(!!errors.email)} />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-neutral-600 mb-1">First name *</label>
            <input type="text" placeholder="John" {...register("firstName")} className={inputClass(!!errors.firstName)} />
            {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-neutral-600 mb-1">Last name *</label>
            <input type="text" placeholder="Doe" {...register("lastName")} className={inputClass(!!errors.lastName)} />
            {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm text-neutral-600 mb-1">Password *</label>
          <input type="password" placeholder="********" {...register("password")} className={inputClass(!!errors.password)} />
          {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block text-sm text-neutral-600 mb-1">Confirm password *</label>
          <input
            type="password"
            placeholder="********"
            {...register("confirmPassword")}
            className={inputClass(!!errors.confirmPassword)}
          />
          {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>}
        </div>

        <div className="relative">
          <label className="block text-sm text-neutral-600 mb-1">Timezone</label>
          <input type="hidden" {...register("timezone")} />

          <input
            value={timezoneQuery}
            onFocus={() => setTimezoneOpen(true)}
            onChange={(e) => {
              setValue("timezone", e.target.value, { shouldDirty: true, shouldTouch: true, shouldValidate: false })
              setTimezoneOpen(true)
            }}
            placeholder="Search timezone"
            className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
          />

          <p className="mt-1 text-xs text-neutral-500">Typing to search for your timezone...</p>

          {timezoneOpen && (
            <div className="absolute mt-1 w-full bg-white border border-neutral-200 rounded-md shadow-sm max-h-40 overflow-y-auto z-10">
              {filtered.map((tz) => (
                <button
                  className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-100"
                  key={tz}
                  type="button"
                  onClick={() => selectTimezone(tz)}
                >
                  {tz}
                </button>
              ))}

              {filtered.length === 0 && <div className="px-3 py-2 text-sm text-neutral-400">No result</div>}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm text-neutral-600 mb-1">Phone number (optional)</label>
          <input type="tel" placeholder="+84..." {...register("phoneNumber")} className={inputClass(false)} />
        </div>

        <div>
          <label className="block text-sm text-neutral-600 mb-1">Self introduction (optional)</label>
          <textarea
            rows={3}
            placeholder="A few words about yourself..."
            {...register("selfIntroduction")}
            className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
          />
        </div>

        <label className="flex items-start gap-3 text-sm text-neutral-700">
          <input
            type="checkbox"
            {...register("acceptedTerms")}
            className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-300"
          />
          <span>
            I agree to the{" "}
            <Link to="/demo/terms" className="underline underline-offset-2 hover:text-neutral-900">
              Terms and Conditions
            </Link>
            .
          </span>
        </label>
        {errors.acceptedTerms && <p className="mt-1 text-xs text-red-600">{errors.acceptedTerms.message}</p>}

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full py-2 rounded-md transition btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "Creating account..." : "Create Account"}
        </button>
      </form>
    </>
  )
}
