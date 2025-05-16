import clsx from "clsx";
import type { JSX } from "react";

interface BreadcrumbProps {
  className?: string;
}

export default function Breadcrumb({
  className,
}: BreadcrumbProps): JSX.Element {
  return (
    <nav className={clsx("col-start-2 col-end-[-2] text-sm text-gray-600", className)}>
      Accueil / Snowboard / Home
    </nav>
  );
}
