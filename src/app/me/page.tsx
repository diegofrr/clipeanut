'use client';

import { useState } from 'react';

import Main from '@/components/Main';
import Content from '@/components/Content';

import { Button } from '@nextui-org/react';
import { Header } from '@/components/Header';
import { IconHeart } from '@tabler/icons-react';

export default function Me() {
  const [value, setValue] = useState<boolean>(false);

  return (
    <Main>
      <Content>
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
      </Content>
    </Main>
  );
}
