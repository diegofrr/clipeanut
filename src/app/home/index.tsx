'use client';

import { useState } from 'react';

import { IconFlame } from '@tabler/icons-react';
import { Trending } from './components/Trending';
import { Header } from '@/components/Header';

import { HOME_PAGE_VALUES } from '@/constants';
const { INITIAL_STATE } = HOME_PAGE_VALUES.TRENDING_VIDEO;

export default function Home() {
  const [tab, setTab] = useState<string | number>(INITIAL_STATE.TAB);

  return (
    <main className="w-full min-h-screen-minus-navbar">
      <div className="max-w-9xl m-auto py-6 sm:p-6 flex flex-col justify-center">
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
      </div>
    </main>
  );
}
