import { useMutation } from "@tanstack/react-query"

import { CenterAlginedHeading } from "@/components/headings"
import { AuthorCard } from "@/components/commons"
import { ErrorSection } from "@/pages/account/register/RegisterSections"
import RegisterForm from "@/pages/account/register/RegisterForm"

export default function RegisterPage() {
  const mutation = useMutation({})

  return (
    <div className="min-h-full flex items-start px-6 pt-12 pb-6">
      <div className="w-full space-y-8">
        <CenterAlginedHeading />

        <div className="pt-6 border-t border-neutral-200 space-y-4">
          {mutation.isError && (
            <ErrorSection
              title="We couldn't create your account"
              error={mutation.error instanceof Error ? mutation.error.message : "An unexpected error occurred;"}
            />
          )}

          <RegisterForm />
        </div>

        <div className="pt-5 border-t border-neutral-200 text-center">
          <AuthorCard />
        </div>
      </div>
    </div>
  )
}
