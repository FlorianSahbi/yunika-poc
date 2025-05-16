import clsx from "clsx";
import type { JSX } from "react";

interface RatingProps {
  className?: string;
  label: string;
  value: number;
}

export default function Rating({
  className,
  label,
  value,
}: RatingProps): JSX.Element {
  return (
    <div className={clsx(className)}>
      <p className="text-sm font-semibold text-gray-600">{label}</p>
      <div className="w-full bg-gray-200 h-5 rounded relative overflow-hidden">
        <div
          className={clsx(
            "h-full rounded-l text-white text-xs font-semibold flex items-center justify-center",
            "bg-[repeating-linear-gradient(-45deg,#991b1b,#991b1b_10px,#b91c1c_10px,#b91c1c_20px)]"
          )}
          style={{ width: `${value}%` }}
        >
          {value}%
        </div>
      </div>
    </div>
  );
}
