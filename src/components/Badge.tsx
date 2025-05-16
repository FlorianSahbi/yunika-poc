import clsx from 'clsx';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function SocialLinks({ className, items }: { className: string, items: Array<{ _uid: string; link: { url: string }; iconName: string }> }) {
  const iconMap: Record<string, React.FC<{ size?: number }>> = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
  };

  return (
    <div className={clsx(className, "flex space-x-4")}>
      {items.map(item => {
        const Icon = iconMap[item.iconName] || Twitter;
        return (
          <a
            key={item._uid}
            href={item.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75 transition-opacity"
          >
            <Icon size={24} />
          </a>
        );
      })}
    </div>
  );
}
