import { Link } from "react-router-dom"

export type DateDisplayProps = {date?: string, lunar?:string}
export {default as JammyLoader} from "@/components/JammyLoader"

export const LunarDateCard = ({date, lunar}: DateDisplayProps) => {
    return (lunar || date) && (
        <div className="self-end text-right leading-tight">
            {(date && <p className="text-sm text-neutral-500">{date}</p>)}
            {(lunar && <p className="mt-0.5 text-xs text-neutral-500">Lunar: {lunar}</p>)}
        </div>
    )
}

export const AuthorCard = ({authorUrl = "/author"}: {authorUrl?: string}) => {
    return (
        <Link target="_blank"
            to={authorUrl}
            className="text-sm text-neutral-600 underline underline-offset-2 hover:text-neutral-900"
          >
            Wanna know more about the author?
        </Link>
    )
}

export const LoadingDots = ({prefix = "Loading", postfix=""}: {prefix?:string, postfix?:string}) => {
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