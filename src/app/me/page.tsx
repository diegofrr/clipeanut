'use client';

import Main from '@/components/Main';
import Content from '@/components/Content';
import Icons from '@/icons';

import { Header } from '@/components/Header';

export default function Me() {
  return (
    <Main>
      <Content>
        <Header.Root>
          <Header.Content>
            <Header.Title icon={<Icons.Heart />}>Minha página</Header.Title>
          </Header.Content>
        </Header.Root>
      </Content>
    </Main>
  );
}
