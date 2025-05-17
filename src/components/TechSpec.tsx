import clsx from 'clsx';
import Guard from '@/components/Guard';
import StoryblokTable from '@/components/StoryblokTable';
import type { JSX } from 'react';
import type { TechStoryblok } from '@/types/storyblok';

interface TechSpecProps {
  className?: string;
  tech: TechStoryblok[];
}

export default function TechSpec({
  className,
  tech,
}: TechSpecProps): JSX.Element | null {
  return (
    <Guard cond={tech.length > 0}>
      <section className={clsx(className)}>
        <h2 className="text-3xl font-bold">{tech[0].title}</h2>
        <div className="h-px bg-gray-400 mb-8" />
        {tech.map((block) => (
          <div key={block._uid} className="mb-8">
            <StoryblokTable table={block.table} />
          </div>
        ))}
      </section>
    </Guard>
  );
}
