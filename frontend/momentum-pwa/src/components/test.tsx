type HabitProgressProps = {
    completed: number,
    total: number,
    message?: string 
}

export const HabitProgress = ({ completed, total }: HabitProgressProps) => {
  const percentage = total > 0 ? (completed / total) * 100 : 0;
  const size = 120;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-900 rounded-3xl shadow-xl border border-slate-800">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background Circle */}
        <svg className="absolute transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-slate-800"
          />
          {/* Progress Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 0.5s ease' }}
            className="text-blue-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{Math.round(percentage)}%</span>
        </div>
      </div>
      <p className="mt-4 text-slate-400 text-sm font-medium">
        {completed} / {total} HABITS DONE
      </p>
    </div>
  );
};


export const HabitLinearProgress = ({ completed, total, message }: HabitProgressProps) => {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    /* Updated bg-neutral-900 and border-neutral-800 */
    <div className="w-full p-5 bg-neutral-700 rounded-2xl border border-neutral-600 shadow-lg">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h3 className="text-white font-bold text-lg">Daily Goal</h3>
          <p className="text-neutral-50 text-xs uppercase tracking-wider">
            {completed} of {total} habits completed
          </p>
        </div>
        <span className="text-blue-400 font-mono font-bold text-xl">
          {Math.round(percentage)}%
        </span>
      </div>

      {/* Progress Track - Updated to bg-neutral-800 */}
      <div className="w-full h-3 bg-neutral-800 rounded-full overflow-hidden">
        {/* Progress Fill - Kept your original gradient */}
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* AI Message Area */}
      {message && (
        <p className="mt-4 text-neutral-100 text-sm italic border-l-2 border-blue-500/30 pl-3">
          "{message}"
        </p>
      )}
    </div>
  );
};