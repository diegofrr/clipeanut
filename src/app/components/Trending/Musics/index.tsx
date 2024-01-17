'use client';

import { IconMusic } from '@tabler/icons-react';

export default function TrendingMusics() {
  return (
    <aside
      className="
  mx-6 sm:mx-0 min-w-0 sm:max-w-full md:sticky border-1 border-foreground-50 md:min-w-[200px]
  rounded-lg p-6 lg:min-w-[280px] md:top-[calc(65px+1.5rem)] h-32 md:h-[400px] bg-purple-950"
    >
      <header className="w-full flex flex-row items-center gap-2 text-base font-medium">
        <IconMusic size={16} />
        <h2>Músicas agora</h2>
      </header>
    </aside>
  );
}
