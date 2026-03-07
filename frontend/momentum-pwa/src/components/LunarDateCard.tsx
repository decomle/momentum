import { useState } from "react";

const getLunarString = (): string => {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat("en-u-ca-chinese", {
    day: "2-digit",
    month: "2-digit",
  });
  
  const parts = formatter.formatToParts(date);
  const month = parts.find(p => p.type === "month")?.value;
  const day = parts.find(p => p.type === "day")?.value;
  
  return `${day} / ${month}`;
};

export default function LunarDateCard() {
  const [date] = useState(() => new Date().toISOString().split('T')[0]);
  const [lunar] = useState(() => getLunarString());

  return (
    <div className="self-end text-right leading-tight">
      <p className="text-sm text-neutral-500">
        {date}
      </p>
      <p className="mt-0.5 text-xs text-neutral-500">
        Lunar: <span className="text-neutral-500">{lunar}</span>
      </p>
    </div>
  );
}