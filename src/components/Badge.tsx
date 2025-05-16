import clsx from 'clsx';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import type { FC } from 'react';

export interface SocialLinkItem {
  _uid: string;
  link: { url: string };
  iconName: string;
}

interface SocialLinksProps {
  className?: string;
  items: SocialLinkItem[];
}

const iconMap: Record<string, FC<{ size?: number }>> = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
};

export default function SocialLinks({ className, items }: SocialLinksProps) {
  return (
    <div className={clsx(className, 'flex space-x-4')}>
      {items.map((item) => {
        const Icon = iconMap[item.iconName.toLowerCase()] || Twitter;
        const label = `Visit us on ${item.iconName.charAt(0).toUpperCase()}${item.iconName.slice(1)}`;

        return (
          <a
            key={item._uid}
            href={item.link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="hover:opacity-75 transition-opacity"
          >
            <Icon size={24} />
          </a>
        );
      })}
    </div>
  );
}
