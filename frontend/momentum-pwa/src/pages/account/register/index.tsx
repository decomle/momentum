import { CenterAlginedHeading } from "@/components/headings"
import { AuthorCard } from "@/components/commons"
import RegisterForm from "@/pages/account/register/RegisterForm"

export default function RegisterPage() {
  return (
    <div className="min-h-full flex items-start px-6 pt-12 pb-6">
      <div className="w-full space-y-8">
        <CenterAlginedHeading />

        <div className="pt-6 border-t border-neutral-200 space-y-4">
          <RegisterForm />
        </div>

        <div className="pt-5 border-t border-neutral-200 text-center">
          <AuthorCard />
        </div>
      </div>
    </div>
  )
}
