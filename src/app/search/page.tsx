'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { fetchSearchResults, type FetchSearchResultsOptionsType } from '@/services/actions/fetchSearchResultsData';
import type { ISearchResultRoot } from '@/types';

import Main from '@/components/Main';
import Header from '@/components/Header';
import Content from '@/components/Content';

import { useLocalStorage } from 'usehooks-ts';
import { isFakeDataFetch } from '@/environments';
import { FoundVideo } from './components/FoundVideo';

import { LOCALSTORAGE_KEYS, PIPED_VALUES } from '@/constants';
const { DEFAULT_INSTANCE_LIST } = PIPED_VALUES;

export default function Results() {
  const query = useSearchParams().get('q');

  const [results, setResults] = useState<ISearchResultRoot>();
  const [, setSearchHistory] = useLocalStorage<string[]>(LOCALSTORAGE_KEYS.SEARCH_HISTORY, []);

  let oldInstanceList = DEFAULT_INSTANCE_LIST;

  function retryGetResults() {
    if (!oldInstanceList?.length) oldInstanceList = DEFAULT_INSTANCE_LIST;
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
    setSearchHistory((history) => [query as string, ...history.filter((h) => h !== query)]);
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
