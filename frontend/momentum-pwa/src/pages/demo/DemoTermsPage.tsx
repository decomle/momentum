import { Link } from "react-router-dom"
import { LeftAlginedHeading } from "@/components/Heading"

export default function DemoTermsPage() {
  return (
    <div className="min-h-full flex items-start px-6 pt-12 pb-8">
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <LeftAlginedHeading heading="Terms and Conditions" desc="Demo terms for Momentum preview flows." />

        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm space-y-4 text-sm text-neutral-700">
          <p>
            By creating an account, you agree to use Momentum responsibly and
            provide accurate account information.
          </p>
          <p>
            Demo content may not reflect final product behavior. Features and
            policies can change before release.
          </p>
          <p>
            You are responsible for maintaining the confidentiality of your
            credentials and all activity under your account.
          </p>
          <p>
            We may update these terms at any time. Continued use of the product
            indicates acceptance of updates.
          </p>
        </div>

        <Link
          to="/demo/register"
          className="inline-block text-sm text-neutral-700 underline underline-offset-2 hover:text-neutral-900"
        >
          Back to registration
        </Link>
      </div>
    </div>
  )
}
