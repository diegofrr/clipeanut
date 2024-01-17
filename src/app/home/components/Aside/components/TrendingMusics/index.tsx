'use client';

import { IconMusic } from '@tabler/icons-react';

export default function TrendingMusics() {
  return (
    <div className="rounded-lg p-6 border-1 dark:border-neutral-900 min-h-[400px]">
      <header className="w-full flex flex-row items-center gap-2 text-base font-medium">
        <IconMusic size={16} />
        <h2>Músicas</h2>
      </header>
    </div>
  );
}
