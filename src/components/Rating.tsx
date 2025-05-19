import clsx from 'clsx'
import type { JSX } from 'react'

export interface RatingProps {
  className?: string
  label: string
  value: number
}

export default function Rating({
  className,
  label,
  value,
}: RatingProps): JSX.Element {
  return (
    <div className={clsx(className)}>
      <p className="text-sm font-semibold text-gray-600">{label}</p>
      <div className="relative h-5 w-full overflow-hidden rounded bg-gray-200">
        <div
          className={clsx(
            'flex h-full items-center justify-center rounded-l text-xs font-semibold text-white',
            'bg-[repeating-linear-gradient(-45deg,#7c7f8b,#7c7f8b_12px,#6f7484_12px,#6f7484_24px)]',
          )}
          style={{ width: `${value}%` }}
        >
          {/* eslint-disable-next-line react/jsx-no-literals */}
          {value}%
        </div>
      </div>
    </div>
  )
}
