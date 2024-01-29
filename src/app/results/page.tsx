'use client';

import { useSearchParams } from 'next/navigation';

import Main from '@/components/Main';
import Header from '@/components/Header';
import Content from '@/components/Content';

export default function Results() {
  const searchQuery = useSearchParams().get('query');

  console.log(searchQuery);

  return (
    <Main>
      <Content>
        <Header.Root>
          <Header.Content>
            <Header.Title>Resultados para {`"${searchQuery}"`}</Header.Title>
          </Header.Content>
        </Header.Root>
      </Content>
    </Main>
  );
}
