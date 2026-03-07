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
  timezone: string,
  phoneNumber: string,
  selfIntroduction: string,
  [key: string]: string

}


export default function RegisterPage() {
  const [query, setQuery] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
  const [timezoneOpen, setTimezoneOpen] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [isPasswordMismatch, setIsPasswordMismatch] = useState(false)
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
    const password = passwordRef.current?.value ?? ""
    const confirmPassword = confirmPasswordRef.current?.value ?? ""
    const isMatch = !confirmPassword || password === confirmPassword
    setIsPasswordMismatch(!isMatch)
    return isMatch
  }

  const handleSubmit = (formData: FormData) => {
    const isMatch = validatePasswordMatch()
    if (!isMatch) {
      return
    }

    const data = Object.fromEntries(formData.entries()) as RegistrationData;

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
          <form className="space-y-4" action={handleSubmit}>
            {/* Username */}
            <div>
              <label className="block text-sm text-neutral-600 mb-1">
                Username
              </label>
              <input type="text" name="username" placeholder="yourname" required
                className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-neutral-600 mb-1">
                Email *
              </label>
              <input type="email" name="email" placeholder="your_email@gmail.com" required
                className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-200"
              />
              <p className="mt-1 text-xs text-red-600">
                Email is required.
              </p>
            </div>

            {/* Name Row */}
            <div className="grid grid-cols-2 gap-3">

              {/* First Name */}
              <div>
                <label className="block text-sm text-neutral-600 mb-1">
                  First name *
                </label>
                <input type="text" name="firstName" placeholder="John" required
                  className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-200"
                />
                <p className="mt-1 text-xs text-red-600">
                  First name is required.
                </p>
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm text-neutral-600 mb-1">
                  Last name *
                </label>
                <input type="text" name="lastName" placeholder="Doe" required
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
                />
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
                className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
              />
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
                  isPasswordMismatch
                    ? "border-red-300 focus:ring-red-200"
                    : "border-neutral-200 focus:ring-neutral-300"
                }`}
              />
              {isPasswordMismatch && (
                <p className="mt-1 text-xs text-red-600">
                  Passwords do not match.
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
                onChange={(e) => setAcceptedTerms(e.target.checked)}
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

            {/* Submit */}
            <button type="submit" disabled={!acceptedTerms} 
              className={`w-full py-2 rounded-md transition ${acceptedTerms
                ? "btn-primary"
                : "bg-neutral-200 text-neutral-500 cursor-not-allowed"
                }`}
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
