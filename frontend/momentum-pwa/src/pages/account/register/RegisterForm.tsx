import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ErrorSection } from "@/pages/account/shared";
import { registerSchema, type RegisterFormValues, TIMEZONES } from "@/lib/schemas";
import { useRegister } from "@/hooks";

export default function RegisterForm() {
  const [timezoneOpen, setTimezoneOpen] = useState(false);
  const { registerUser, isLoading, error: formError, isError } = useRegister();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      username: "", email: "", firstName: "", lastName: "",
      password: "", confirmPassword: "", phoneNumber: "", selfIntroduction: "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      acceptedTerms: false,
    },
  });

  const timezoneQuery = watch("timezone") ?? "";
  const filtered = useMemo(() => 
    TIMEZONES.filter((tz) => tz.toLowerCase().includes(timezoneQuery.toLowerCase())),
    [timezoneQuery]
  );

  const inputClass = (hasError: boolean) =>
    `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
      hasError ? "border-red-300 focus:ring-red-200" : "border-neutral-200 focus:ring-neutral-300"
    }`;

  return (
    <>
      {isError && <ErrorSection title="Registration Failed" error={formError} />}
      
      <form className="space-y-4" onSubmit={handleSubmit((data) => registerUser(data))} noValidate>
        {/* Username */}
        <div>
          <label className="block text-sm text-neutral-600 mb-1">Username *</label>
          <input type="text" {...register("username")} className={inputClass(!!errors.username)} />
          {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-neutral-600 mb-1">Email *</label>
          <input type="email" {...register("email")} className={inputClass(!!errors.email)} />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>

        {/* Names Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-neutral-600 mb-1">First name *</label>
            <input type="text" placeholder="John" {...register("firstName")} className={inputClass(!!errors.firstName)} />
            {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>}
          </div>
          <div>
            <label className="block text-sm text-neutral-600 mb-1">Last name *</label>
            <input type="text" {...register("lastName")} className={inputClass(!!errors.lastName)} />
            {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>}
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm text-neutral-600 mb-1">Password *</label>
          <input type="password" {...register("password")} className={inputClass(!!errors.password)} />
          {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm text-neutral-600 mb-1">Confirm password *</label>
          <input type="password" {...register("confirmPassword")} className={inputClass(!!errors.confirmPassword)} />
          {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>}
        </div>

        {/* Timezone Search */}
        <div className="relative">
          <label className="block text-sm text-neutral-600 mb-1">Timezone</label>
          <input
            value={timezoneQuery}
            onFocus={() => setTimezoneOpen(true)}
            onChange={(e) => {
              setValue("timezone", e.target.value, { shouldValidate: false });
              setTimezoneOpen(true);
            }}
            className={inputClass(!!errors.timezone)}
          />
          <p className="mt-1 text-xs text-neutral-500">
            Your timezone determines when a new day begins for your habit streaks. Leave it as default if unsure
          </p>
          {timezoneOpen && (
            <div className="absolute mt-1 w-full bg-white border border-neutral-200 rounded-md shadow-lg max-h-40 overflow-y-auto z-50">
              {filtered.map((tz) => (
                <button
                  key={tz}
                  type="button"
                  className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-100"
                  onClick={() => {
                    setValue("timezone", tz, { shouldValidate: true });
                    setTimezoneOpen(false);
                  }}
                >
                  {tz}
                </button>
              ))}
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

        {/* Terms */}
        <label className="flex items-start gap-3 text-sm text-neutral-700">
          <input type="checkbox" {...register("acceptedTerms")} className="mt-0.5 h-4 w-4" />
          <span>
            I agree to the{" "}
            <Link to="/demo/terms" className="underline underline-offset-2 hover:text-neutral-900">
              Terms and Conditions
            </Link>
          </span>
        </label>
        {errors.acceptedTerms && <p className="text-xs text-red-600">{errors.acceptedTerms.message}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 rounded-md bg-neutral-900 text-white disabled:opacity-50"
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </button>
      </form>
    </>
  );
}