import clsx from 'clsx';
import type { JSX } from 'react';
import Guard from '@/components/Guard';
import type { TableStoryblok } from '@/types/storyblok';

export type TableColor = 'teal' | 'red' | 'dark';

export interface StoryblokTableProps {
  table?: TableStoryblok;
  className?: string;
  color?: TableColor;
}

export default function StoryblokTable({
  table,
  className,
  color = 'dark',
}: StoryblokTableProps): JSX.Element | null {
  if (!table || !Array.isArray(table.thead) || table.thead.length === 0) {
    return null;
  }

  const { thead, tbody } = table;

  const colorMap: Record<TableColor, string> = {
    teal: '#05AB94',
    red: '#AA1F21',
    dark: '#231F20',
  };
  const accent = colorMap[color];

  return (
    <Guard cond={!!tbody && tbody.length > 0}>
      <div
        className="overflow-x-auto w-full rounded-lg border"
        style={{ borderColor: accent }}
      >
        <table className={clsx('min-w-full divide-y divide-gray-200', className)}>
          <thead style={{ backgroundColor: accent }}>
            <tr>
              {thead.map((col) => (
                <th
                  key={col._uid}
                  className="px-4 py-3 text-left text-sm font-semibold text-white uppercase whitespace-nowrap"
                >
                  {col.value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tbody.map((row, rowIdx) => (
              <tr key={row._uid ?? rowIdx} className="hover:bg-gray-50">
                {row.body.map((cell, cellIdx) => (
                  <td
                    key={cell._uid ?? cellIdx}
                    className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap"
                  >
                    {cell.value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Guard>
  );
}
