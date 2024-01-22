'use client';

import { useState } from 'react';

import Main from '@/components/Main';
import Content from '@/components/Content';

import { IconFlame } from '@tabler/icons-react';
import { Trending } from './components/Trending';
import { Header } from '@/components/Header';

import { HOME_PAGE_VALUES } from '@/constants';
const { INITIAL_STATE } = HOME_PAGE_VALUES.TRENDING_VIDEO;

export default function Home() {
  const [tab, setTab] = useState<string | number>(INITIAL_STATE.TAB);

  return (
    <Main>
      <Content className="flex flex-col justify-center pr-0 sm:pr-6 lg:pr-12">
        <Header.Root className="px-6 sm:px-0">
          <Header.Content className="flex flex-row justify-between items-center">
            <Header.Title icon={<IconFlame size={24} />}>Em alta</Header.Title>

            <Trending.Tabs tab={tab} setTab={setTab} />
          </Header.Content>
        </Header.Root>

        <div className="flex flex-col-reverse w-full md:flex-row gap-6">
          <Trending.Videos isHidden={tab !== 'videos'} />
          <Trending.Musics isHidden={tab !== 'musics'} />
          <Trending.Games isHidden={tab !== 'games'} />
        </div>
      </Content>
    </Main>
  );
}
