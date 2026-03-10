import { DashboardHeading } from "@/components/headings"
import { LunarDateCard } from "@/components/commons"
import { JammyLoader, AuthorCard, LoadingDots } from "@/components/commons"
import { HomeDescriptions, HomeActions } from "./HomeSections"
import { getAccessToken } from "@/lib/tokenStore"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


export default function () {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const hasAccessToken = !!getAccessToken()
    setIsLoggedIn(hasAccessToken);
    if(hasAccessToken) {
      setTimeout(() => {
        navigate("/dashboard", {replace: true});
      }, 2500)
    }
  }, []);

  return (
    <div className="min-h-full flex justify-center">
      <div className="w-full max-w-md p-6 flex flex-col min-h-full">
        <div className="space-y-8">

          {/* Title */}
          <DashboardHeading additionalComponent={<LunarDateCard/>}/>

          <div className="border-t border-neutral-200" />

          <JammyLoader desc={isLoggedIn ? <LoadingDots prefix="You're already logged in" /> : "Perfecting york...."} />

          {/* Description Card */}
          <HomeDescriptions />

          {/* Action */}
          <HomeActions isLoggedIn={isLoggedIn} />
        </div>

        <div className="mt-auto pt-5 border-t border-neutral-200 text-center">
          <AuthorCard />
        </div>
      </div>
    </div>
  )
}