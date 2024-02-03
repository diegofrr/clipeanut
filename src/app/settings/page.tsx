'use client';

import Main from '@/components/Main';
import Header from '@/components/Header';
import Content from '@/components/Content';

export default function Settings() {
  return (
    <Main>
      <Content>
        <Header.Root>
          <Header.Content className="flex flex-row justify-between items-center">
            <Header.Title>Configurações</Header.Title>
          </Header.Content>
        </Header.Root>
      </Content>
    </Main>
  );
}
