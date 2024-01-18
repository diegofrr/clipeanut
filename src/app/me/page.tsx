'use client';

import { Header } from '@/components/Header';
import { IconHeart } from '@tabler/icons-react';

export default function Me() {
  return (
    <main className="w-full">
      <div className="max-w-9xl m-auto p-6">
        <Header.Root>
          <Header.Content>
            <Header.Title icon={<IconHeart size={24} />}>Minha página</Header.Title>
          </Header.Content>
        </Header.Root>
      </div>
    </main>
  );
}
