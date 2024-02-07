'use client';

import { useState } from 'react';

import Main from '@/components/Main';
import Content from '@/components/Content';
import HomeHeader from './components/Header';
import Trending from './components/Trending';

import HighlighStreamProvider from './contexts/highlightStream';

import { HOME_PAGE_VALUES } from '@/constants';
const { INITIAL_STATE } = HOME_PAGE_VALUES.TRENDING_VIDEO;

export default function Home() {
  const [tab, setTab] = useState<string | number>(INITIAL_STATE.TAB);

  return (
    <Main>
      <HighlighStreamProvider>
        <Content className="flex flex-col gap-6 justify-center pr-0 sm:pr-6 lg:pr-12">
          <HomeHeader />
          <Trending.Tabs className="mr-6 sm:mr-0" tab={tab} setTab={setTab} />

          <div className="flex flex-col-reverse w-full md:flex-row gap-6">
            <Trending.Videos isHidden={tab !== 'videos'} />
            <Trending.Musics isHidden={tab !== 'musics'} />
            <Trending.Games isHidden={tab !== 'games'} />
          </div>
        </Content>
      </HighlighStreamProvider>
    </Main>
  );
}
