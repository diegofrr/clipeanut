'use client';

import Main from '@/components/Main';
import Header from '@/components/Header';
import Content from '@/components/Content';
import Icons from '@/icons';

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
