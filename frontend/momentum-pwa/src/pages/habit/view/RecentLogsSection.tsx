import { type Habit } from "@/api/habit"

type RecentPeriodsSectionProps = {
  habit: Habit
}

const moodEmojiByScore: Record<number, string> = {
    "-3": "😫",
    "-2": "😟",
    "-1": "🙁",
    "0": "🙂",
    "1": "😄",
    "2": "😁",
    "3": "🤩",
  }

export default function RecentLogsSection({ habit }: RecentPeriodsSectionProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100 space-y-3">

      <p className="text-sm font-medium text-neutral-600">
        Recent logs
      </p>

      <div className="space-y-2">

        {habit.recentLogs.map((log, i) => (
          <div
            key={i}
            className="flex justify-between text-sm text-neutral-600"
          >
            <span>{log.logDate}</span>
            <span>{moodEmojiByScore[log.moodScore] ?? "🙂"}</span>
          </div>
        ))}

      </div>

    </div>

  )
}