function JammyLoader({desc = "Perfecting Yolk..."} : {desc?: string | React.ReactNode}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      {/* 1. The Egg Outer Shell (White) */}
      <div className="relative w-24 h-32 bg-slate-50 border-4 border-slate-200 shadow-xl overflow-hidden rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%]">
        
        {/* 2. The Jammy Yolk (Animated) */}
        {/* We use a large inner div and the custom animation handles centering/oozing */}
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-amber-400 border-4 border-amber-300 rounded-full shadow-inner animate-ooze">
          {/* Optional: Add a little 'gloss' to the yolk */}
        <div className="absolute top-2 left-2 w-4 h-4 bg-white/40 rounded-full blur-[1px]"></div>
        </div>

      </div>

      <p className="text-neutral-600 text-sm tracking-tight">{desc}</p>
    </div>
  );
}

export default JammyLoader;