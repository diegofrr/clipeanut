'use client';

import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { fetchSearchResults, type FetchSearchResultsOptionsType } from '@/services/actions/fetchSearchResultsData';
import type { ISearchResultRoot } from '@/types';

import Main from '@/components/Main';
import Header from '@/components/Header';
import Content from '@/components/Content';

import { PipedInstanceContext } from '@/contexts/pipedInstance';
import { isFakeDataFetch } from '@/environments';
import { FoundVideo } from './components/FoundVideo';

export default function Results() {
  const query = useSearchParams().get('q');
  const { instanceList } = useContext(PipedInstanceContext);

  const [results, setResults] = useState<ISearchResultRoot>();

  let oldInstanceList = instanceList;

  function retryGetResults() {
    if (!oldInstanceList?.length) oldInstanceList = instanceList;
    oldInstanceList = oldInstanceList.slice(1);

    getSearchResults();
  }

  async function getSearchResults() {
    const instance = oldInstanceList[0];

    const options = { instance, query, isFake: isFakeDataFetch, delay: 1 } as FetchSearchResultsOptionsType;

    try {
      const data = await fetchSearchResults({ options });
      setResults(data);
    } catch {
      retryGetResults();
    }
  }

  useEffect(() => {
    getSearchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <Main>
      <Content>
        <Header.Root>
          <Header.Content>
            <Header.Title>Resultados para {`"${query}"`}</Header.Title>
          </Header.Content>
        </Header.Root>

        <div>
          {results?.items.map((item, index) =>
            item.type === 'channel' ? null : <FoundVideo key={index} data={item} />
          )}
        </div>
      </Content>
    </Main>
  );
}