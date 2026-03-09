import { Link } from "react-router-dom"

export { default as ActionsButton } from "@/components/ActionsButton"
export { default as LogoutCard} from '@/components/LogoutCard'
export { default as LunarDateCard } from "@/components/LunarDateCard"
export { default as JammyLoader } from "@/components/JammyLoader"


export const AuthorCard = ({ authorUrl = "/author" }: { authorUrl?: string }) => {
  return (
    <Link target="_blank"
      to={authorUrl}
      className="text-sm text-neutral-600 underline underline-offset-2 hover:text-neutral-900"
    >
      Wanna know more about the author?
    </Link>
  )
}

export const MessageCard = ({ message }: { message: string }) => {
  return (
    <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
      {message}
    </div>
  )
}

export const LoadingDots = ({ prefix = "Loading", postfix = "" }: { prefix?: string, postfix?: string }) => {
  return (
    <>
      {prefix + " "}
      <span className="inline-flex ml-1">
        <span className="animate-dot-blink">.</span>
        {/* Use negative delays so they start at different points in the loop immediately */}
        <span className="animate-dot-blink [animation-delay:0.2s]">.</span>
        <span className="animate-dot-blink [animation-delay:0.4s]">.</span>

      </span>
      {postfix ? " " + postfix : ""}
    </>
  )
}

export const ErrorSection = ({ title, error }: { title?: string, error: string }) => {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {title && (
        <p className="font-medium">
          {title}
        </p>
      )}
      <p className="text-red-600 mt-1">
        {error}
      </p>
    </div>
  )
}
