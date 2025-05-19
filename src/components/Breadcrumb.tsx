import clsx from 'clsx'
import type { JSX } from 'react'

interface BreadcrumbProps {
  className?: string
}

export default function Breadcrumb({
  className,
}: BreadcrumbProps): JSX.Element {
  return <nav className={clsx(className, 'text-sm text-gray-600')} />
}
