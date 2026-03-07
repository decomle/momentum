import { useRef, useState } from "react"
import { Link } from "react-router-dom"

import { CenterAlginedHeading } from "@/components/headings"
import { ErrorSection } from "@/pages/account/register/RegisterSections"
import { AuthorCard } from "@/components/commons"
import { useMutation } from "@tanstack/react-query"

const TIMEZONES = Intl.supportedValuesOf('timeZone');

type RegistrationData = {
  username : string,
  email: string, 
  firstName: string,
  lastName: string,
  password: string,
  confirmPassword: string,
  timezone: string,
  phoneNumber: string,
  selfIntroduction: string,
  [key: string]: string

}

type FieldErrors = Partial<Record<
  "username" | "email" | "firstName" | "lastName" | "password" | "confirmPassword" | "terms",
  string
>>


export default function RegisterPage() {
  const [query, setQuery] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
  const [timezoneOpen, setTimezoneOpen] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)
  const mutation = useMutation({});

  const filtered = TIMEZONES.filter((tz) =>
    tz.toLowerCase().includes(query.toLowerCase())
  )

  function selectTimezone(tz: string) {
    setQuery(tz)
    setTimezoneOpen(false)
  }

  function validatePasswordMatch() {
    const password = passwordRef.current?.value?.trim() ?? ""
    const confirmPassword = confirmPasswordRef.current?.value?.trim() ?? ""
    return password === confirmPassword
  }

  function handleTermsChange(checked: boolean) {
    setAcceptedTerms(checked)
    if (checked) {
      setErrors((prev) => ({ ...prev, terms: undefined }))
    }
  }

  const handleSubmit = (formData: FormData) => {
    const data = Object.fromEntries(formData.entries()) as RegistrationData;
    const nextErrors: FieldErrors = {}

    if (!data.username?.trim()) nextErrors.username = "Username is required."
    if (!data.email?.trim()) {
      nextErrors.email = "Email is required."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      nextErrors.email = "Please enter a valid email address."
    }
    if (!data.firstName?.trim()) nextErrors.firstName = "First name is required."
    if (!data.lastName?.trim()) nextErrors.lastName = "Last name is required."
    if (!data.password?.trim()) nextErrors.password = "Password is required."
    if (!data.confirmPassword?.trim()) {
      nextErrors.confirmPassword = "Please confirm your password."
    } else if (!validatePasswordMatch()) {
      nextErrors.confirmPassword = "Passwords do not match."
    }
    if (!acceptedTerms) nextErrors.terms = "You must accept the Terms and Conditions."

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    console.log("Form Data:", data);
  }

  return (
    <div className="min-h-full flex items-start px-6 pt-12 pb-6">
      <div className="w-full space-y-8">
        <CenterAlginedHeading />

        <div className="pt-6 border-t border-neutral-200 space-y-4">

          {/* FORM ERROR */}
          { mutation.isError && (
              <ErrorSection title="We couldn't create your account"
                error={mutation.error instanceof Error ? mutation.error.message : "An unexpected error occurred;"}
              />
            )
          }
          <form className="space-y-4" action={handleSubmit} noValidate>
            {/* Username */}
            <div>
              <label className="block text-sm text-neutral-600 mb-1">
                Username *
              </label>
              <input type="text" name="username" placeholder="yourname" required
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.username ? "border-red-300 focus:ring-red-200" : "border-neutral-200 focus:ring-neutral-300"
                }`}
              />
              {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-neutral-600 mb-1">
                Email *
              </label>
              <input type="email" name="email" placeholder="your_email@gmail.com" required
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.email ? "border-red-300 focus:ring-red-200" : "border-neutral-200 focus:ring-neutral-300"
                }`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            {/* Name Row */}
            <div className="grid grid-cols-2 gap-3">

              {/* First Name */}
              <div>
                <label className="block text-sm text-neutral-600 mb-1">
                  First name *
                </label>
                <input type="text" name="firstName" placeholder="John" required
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.firstName ? "border-red-300 focus:ring-red-200" : "border-neutral-200 focus:ring-neutral-300"
                  }`}
                />
                {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm text-neutral-600 mb-1">
                  Last name *
                </label>
                <input type="text" name="lastName" placeholder="Doe" required
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.lastName ? "border-red-300 focus:ring-red-200" : "border-neutral-200 focus:ring-neutral-300"
                  }`}
                />
                {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
              </div>

            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-neutral-600 mb-1">
                Password *
              </label>
              <input ref={passwordRef} type="password" name="password" 
                placeholder="********" required
                onInput={validatePasswordMatch}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.password ? "border-red-300 focus:ring-red-200" : "border-neutral-200 focus:ring-neutral-300"
                }`}
              />
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm text-neutral-600 mb-1">
                Confirm password *
              </label>
              <input ref={confirmPasswordRef} 
                type="password" name="confirmPassword" 
                placeholder="********" required
                onInput={validatePasswordMatch}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.confirmPassword
                    ? "border-red-300 focus:ring-red-200"
                    : "border-neutral-200 focus:ring-neutral-300"
                }`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Timezone Combobox */}
            <div className="relative">
              <label className="block text-sm text-neutral-600 mb-1">
                Timezone
              </label>

              <input value={query} onFocus={() => setTimezoneOpen(true)}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setTimezoneOpen(true)
                }}
                name="timezone"
                placeholder="Search timezone"
                className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
              />

              <p className="mt-1 text-xs text-neutral-500">
                Typing to search for your timezone...
              </p>

              {timezoneOpen && (
                <div className="absolute mt-1 w-full bg-white border border-neutral-200 rounded-md shadow-sm max-h-40 overflow-y-auto z-10">
                  {filtered.map((tz) => (
                    <button className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-100"
                      key={tz} type="button" onClick={() => selectTimezone(tz)}
                    >
                      {tz}
                    </button>
                  ))}

                  {filtered.length === 0 && (
                    <div className="px-3 py-2 text-sm text-neutral-400">
                      No result
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm text-neutral-600 mb-1">
                Phone number (optional)
              </label>
              <input className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
                type="tel" name="phoneNumber" placeholder="+84..." />
            </div>

            {/* Self intro */}
            <div>
              <label className="block text-sm text-neutral-600 mb-1">
                Self introduction (optional)
              </label>
              <textarea className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
                name="selfIntroduction" rows={3} placeholder="A few words about yourself..." />
            </div>

            {/* Terms and conditions */}
            <label className="flex items-start gap-3 text-sm text-neutral-700">
              <input type="checkbox" checked={acceptedTerms}
                onChange={(e) => handleTermsChange(e.target.checked)}
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
            {errors.terms && <p className="mt-1 text-xs text-red-600">{errors.terms}</p>}

            {/* Submit */}
            <button type="submit"
              className="w-full py-2 rounded-md transition btn-primary"
            >
              Create Account
            </button>
          </form>
        </div>

        <div className="pt-5 border-t border-neutral-200 text-center">
          <AuthorCard />
        </div>
      </div>
    </div>
  )
}
