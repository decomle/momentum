type ActionButtonsSectionProps = {
  onLogHabit: () => void
  onUpdateHabit: () => void
}

export default function ActionButtonsSection({ onLogHabit, onUpdateHabit }: ActionButtonsSectionProps) {
  return (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={onLogHabit}
        className="btn-primary flex flex-1 items-center justify-center gap-2 rounded-md py-3 transition"
      >
        <span>✏️</span>
        <span>Log Habit</span>
      </button>

      <button
        type="button"
        onClick={onUpdateHabit}
        className="flex flex-1 items-center justify-center gap-2 rounded-md border border-neutral-300 py-3 transition hover:bg-neutral-100"
      >
        <span>⚙️</span>
        <span>Update Habit</span>
      </button>
    </div>
  )
}
