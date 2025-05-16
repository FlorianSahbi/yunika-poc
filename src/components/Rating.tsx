import clsx from "clsx";
import type { JSX } from "react";

export interface RatingProps {
  className?: string;
  label: string;
  value: number; // 0 to 100
}

export default function Rating({ className, label, value }: RatingProps): JSX.Element {
  return (
    <div className={clsx(className)}>
      <p className="text-sm font-semibold text-gray-600">{label}</p>
      <div className="w-full bg-gray-200 h-5 rounded relative overflow-hidden">
        <div
          className={clsx(
            // Darker background stripes with white text for contrast
            "h-full rounded-l text-white text-xs font-semibold flex items-center justify-center",
            "bg-[repeating-linear-gradient(-45deg,#4b5563,#4b5563_15px,#6b7280_15px,#6b7280_30px)]"
          )}
          style={{ width: `${value}%` }}
        >
          {value}%
        </div>
      </div>
    </div>
  );
}
