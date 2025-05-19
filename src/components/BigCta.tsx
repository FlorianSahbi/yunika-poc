import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import clsx from 'clsx'

interface BigCtaProps {
  href: string
  className?: string
  children: React.ReactNode
  prefetch?: boolean
  color?: 'primary' | 'secondary' | 'outline' | 'ghost'
  variant?: 'default' | 'condensed'
}

export default function BigCta({
  href,
  className,
  children,
  prefetch = false,
  color = 'primary',
  variant = 'default',
}: BigCtaProps) {
  const baseStyle =
    'group inline-flex items-center rounded-lg overflow-hidden shadow-lg border transition-colors duration-300'

  const colorVariants = {
    primary: {
      border: 'border-[#C8102E]',
      background: 'bg-[#C8102E] hover:bg-[#9c0f29]',
      text: 'text-white',
    },
    secondary: {
      border: 'border-[#008080]',
      background: 'bg-[#008080] hover:bg-[#006666]',
      text: 'text-white',
    },
    outline: {
      border: 'border-[#C8102E]',
      background: 'bg-transparent hover:bg-[#C8102E]/10',
      text: 'text-[#C8102E]',
    },
    ghost: {
      border: 'border-white/20',
      background: 'bg-transparent hover:bg-white/5',
      text: 'text-white',
    },
  }

  const variantStyles = {
    default: 'px-4 py-2 text-base',
    condensed: 'px-3 py-1 text-sm',
  }

  const cv = colorVariants[color]

  return (
    <Link
      target="_blank"
      prefetch={prefetch}
      href={href}
      className={clsx(baseStyle, cv.border, className)}
    >
      <span
        className={clsx(
          'inline-flex items-center gap-2 transition-colors duration-300',
          cv.background,
          cv.text,
          variantStyles[variant],
        )}
      >
        {children}
        <ArrowRight
          size={14}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>
    </Link>
  )
}
