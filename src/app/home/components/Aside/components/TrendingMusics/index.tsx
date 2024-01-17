'use client';

import { IconMusic } from '@tabler/icons-react';

export default function TrendingMusics() {
  return (
    <div>
      <header className="w-full flex flex-row items-center gap-2 text-base font-medium">
        <IconMusic size={16} />
        <h2>Músicas</h2>
      </header>
    </div>
  );
}
