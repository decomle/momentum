export type DateDisplayProps = {date?: string, lunar?:string}

export const LunarDateCard = ({date, lunar}: DateDisplayProps) => {
    return (lunar || date) && (
        <div className="self-end text-right leading-tight">
            {(date && <p className="text-sm text-neutral-500">{date}</p>)}
            {(lunar && <p className="mt-0.5 text-xs text-neutral-500">Lunar: {lunar}</p>)}
        </div>
    )
}