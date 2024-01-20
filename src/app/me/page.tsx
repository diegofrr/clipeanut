'use client';

import { Button } from '@nextui-org/react';
import { useState } from 'react';

import { Header } from '@/components/Header';
import { IconHeart } from '@tabler/icons-react';

export default function Me() {
  const [value, setValue] = useState<boolean>(false);

  return (
    <main className="w-full">
      <div className="max-w-9xl m-auto p-6">
        <Header.Root>
          <Header.Content>
            <Header.Title icon={<IconHeart size={24} />}>Minha página</Header.Title>
          </Header.Content>
        </Header.Root>

        <div>
          <h1>{value ? 'Verdadeiro' : 'Falso'}</h1>
          <Button onClick={() => setValue(!value)} color="primary" className="font-medium">
            Click me!
          </Button>
        </div>
      </div>
    </main>
  );
}
