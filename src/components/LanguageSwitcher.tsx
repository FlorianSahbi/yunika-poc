'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const segments = pathname.split('/').filter(Boolean);

  const current = segments[0] === 'en' ? 'en' : 'fr';
  const target = current === 'en' ? 'fr' : 'en';

  const rest = segments.slice(1).join('/');
  const nextPath = `/${target}${rest ? `/${rest}` : ''}`;

  return (
    <button
      aria-label={`Passer en ${target.toUpperCase()}`}
      onClick={() => router.push(nextPath)}
      className="flex items-center space-x-1 px-2 py-1 text-xs font-semibold uppercase rounded hover:bg-gray-100 transition"
    >
      <Globe className="h-5 w-5" />
      <span>{target}</span>
    </button>
  );
}
