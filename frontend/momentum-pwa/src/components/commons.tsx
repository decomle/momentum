export type DateDisplayProps = {date?: string, lunar?:string}

import { Link } from "react-router-dom"

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