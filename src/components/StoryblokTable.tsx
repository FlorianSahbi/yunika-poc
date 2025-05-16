import clsx from 'clsx';
import type { JSX } from 'react';
import Guard from '@/components/Guard';
import type { TableStoryblok } from '@/types/storyblok';

export interface StoryblokTableProps {
  table?: TableStoryblok;
  className?: string;
}

export default function StoryblokTable({ table, className }: StoryblokTableProps): JSX.Element | null {
  if (!table || !Array.isArray(table.thead) || table.thead.length === 0) {
    return null;
  }

  const { thead, tbody } = table;

  return (
    <Guard cond={!!tbody && tbody.length > 0}>
      <table className={clsx('min-w-full text-left', className)}>
        <thead>
          <tr>
            {thead.map((col) => (
              <th key={col._uid} className="px-4 py-2 font-semibold">
                {col.value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tbody.map((row) => (
            <tr key={row._uid}>
              {row.body.map((cell, idx) => (
                <td key={cell._uid ?? idx} className="px-4 py-2">
                  {cell.value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Guard>
  );
}
