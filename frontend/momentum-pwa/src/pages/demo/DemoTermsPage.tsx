import { Link } from "react-router-dom"
import { LeftAlginedHeading } from "@/components/headings"
import { AuthorCard } from "@/components/commons"

export default function DemoTermsPage() {
  return (
    <div className="h-full flex flex-col p-4">
      <div className="w-full flex-1 min-h-0 flex flex-col">
        <LeftAlginedHeading heading="Terms and Conditions" desc="Demo terms for Momentum preview flows." />

        <div className="mt-4 min-h-0 flex-1 overflow-y-auto no-scrollbar">
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
        </div>

        <div className="mt-4 pt-5 border-t border-neutral-200 text-center">
          <AuthorCard />
        </div>
      </div>
    </div>
  )
}
