import { AuthorCard, ErrorSection, JammyLoader, LoadingDots } from "@/components/commons"
import { LeftAlginedHeading } from "@/components/headings"
import { useUser } from "@/hooks"
import UpdateProfileForm from "@/pages/account/profile/UpdateProfileForm"

export default function ProfilePage() {
  const { user, isLoading } = useUser()

  return (
    <div className="flex min-h-full items-start justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <LeftAlginedHeading heading="Update profile" desc="Tell me a little more about you..." />

        <div className="space-y-4 border-t border-neutral-200 pt-6">
          {isLoading && <JammyLoader desc={<LoadingDots prefix="Loading profile..." />} />}
          {!isLoading && !user && <ErrorSection error="Unable to load profile." />}
          {!isLoading && user && <UpdateProfileForm user={user} />}
        </div>

        <div className="border-t border-neutral-200 pt-5 text-center">
          <AuthorCard />
        </div>
      </div>
    </div>
  )
}
