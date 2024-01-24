'use client';

import Main from '@/components/Main';
import Header from '@/components/Header';
import Content from '@/components/Content';

export default function Me() {
  return (
    <Main>
      <Content>
        <Header.Root>
          <Header.Content>
            <Header.Title>Minha página</Header.Title>
          </Header.Content>
        </Header.Root>
      </Content>
    </Main>
  );
}
