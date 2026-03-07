import { Link } from "react-router-dom"
import { LunarDateCard, type DateDisplayProps } from "@/components/commons"

type HeadingProps = { heading?: string, desc?: string}

const DEFAULT_DESCS = [
  "Build good habits - good life - good self",
  "Small daily steps create lasting momentum.",
  "Lightweight, installable habit tracking apps",
  "Powerful digital utilities, free for everyone.",
  "Simplifying your workflow with no-cost and no-ads.",
  "Free tracking tool for everyone."
]


export const LeftAlginedHeading = ({heading = "omentum", desc = DEFAULT_DESCS[Math.floor(Math.random() * DEFAULT_DESCS.length)]}: HeadingProps) => {
    return (
        <Link to="/demo/dashboard" className="block space-y-1">
          <div className="flex items-center gap-1">
            <img
              src="/icons/generated/m-mark-neutral-120.png"
              alt="Momentum M icon"
              className="w-10 h-10 object-contain"
            />
            <h1 className="text-2xl font-semibold tracking-tight">{heading}</h1>
          </div>
          <p className="text-sm text-neutral-500">
            {desc}
          </p>
        </Link>
    )
}

export const CenterAlginedHeading =  ({heading = "omentum", desc = DEFAULT_DESCS[Math.floor(Math.random() * DEFAULT_DESCS.length)]}: HeadingProps) => {
    return (
        <Link to="/demo/dashboard" className="block space-y-2">
            <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-1">
                    <img
                    src="/icons/generated/m-mark-neutral-120.png"
                    alt="Momentum M icon"
                    className="w-11 h-11 object-contain"
                    />
                    <h1 className="-ml-1 text-3xl font-bold tracking-tight leading-none">{heading}</h1>
                </div>

                <p className="text-neutral-600 text-sm">
                    {desc}
                </p>
            </div>
        </Link>
    )
}

export const DashboardHeading = ({date, lunar}: DateDisplayProps) => {
    return (
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-1">
              <img
                src="/icons/generated/m-mark-neutral-120.png"
                alt="Momentum M icon"
                className="w-12 h-12 object-contain"
              />
              <h1 className="-ml-1 text-4xl font-bold tracking-tight leading-none">omentum</h1>
            </div>
            <p className="text-xs text-neutral-500">{DEFAULT_DESCS[0]}</p>
          </div>
          <LunarDateCard {...{date, lunar}}/>
        </div>
    )
}