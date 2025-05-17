import clsx from "clsx";
import type { JSX } from "react";

export interface RatingProps {
  className?: string;
  label: string;
  value: number;
}

export default function Rating({ className, label, value }: RatingProps): JSX.Element {
  return (
    <div className={clsx(className)}>
      <p className="text-sm font-semibold text-gray-600">{label}</p>
      <div className="w-full bg-gray-200 h-5 rounded relative overflow-hidden">
        <div
         className={clsx(
          "h-full rounded-l text-white text-xs font-semibold flex items-center justify-center",
          "bg-[repeating-linear-gradient(-45deg,#7c7f8b,#7c7f8b_12px,#6f7484_12px,#6f7484_24px)]"
        )}
          style={{ width: `${value}%` }}
        >
          {value}%
        </div>
      </div>
    </div>
  );
}
