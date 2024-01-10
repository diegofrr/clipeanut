'use client';

import { useCallback, useContext, useEffect, useState } from 'react';

import CustomSpinner from '@/components/CustomSpinner';
import ITrendingVideo from '@/types/TrendingVideo';
import NavBar from '@/components/Navbar';

import { FetchTrendingVideosOptionsType, fetchTrendingVideos } from '@/services/actions/fetchTrendingVideosData';
import { PipedInstanceContext } from '@/contexts/pipedInstance';
import { TrendingVideo } from '@/app/components/TrendingVideo';
import { isFakeDataFetch } from '@/environments';

import { HOME_PAGE_VALUES, PIPED_VALUES } from '@/constants';
const { INITIAL_STATE } = HOME_PAGE_VALUES.TRENDING_VIDEO;

let boundLoadTrendingVideos = () => {};
export default function Home() {
  const { endpoint, region, setInstance, instance } = useContext(PipedInstanceContext);

  const [loading, setLoading] = useState<boolean>(INITIAL_STATE.LOADING);
  const [trendingVideos, setTrendingVideos] = useState<ITrendingVideo[]>(INITIAL_STATE.TRENDING_VIDEOS);
  const [pipedInstanceList, setPipedInstanceList] = useState<string[]>(INITIAL_STATE.pipedInstanceList);

  const loadTrendingVideos = useCallback(async () => {
    setLoading(true);
    const options = { endpoint, region, isFake: isFakeDataFetch, delay: 1 } as FetchTrendingVideosOptionsType;

    await fetchTrendingVideos({ options })
      .then((data) => {
        setTrendingVideos(data);
        setLoading(false);
        setPipedInstanceList(PIPED_VALUES.INSTANCES);
        setInstance(instance);
      })
      .catch(() => {
        boundLoadTrendingVideos();
      });
  }, [endpoint, region, setInstance, instance]);

  boundLoadTrendingVideos = useCallback(() => {
    if (!pipedInstanceList.length) return;
    setInstance(pipedInstanceList[0]);
    setPipedInstanceList(pipedInstanceList.slice(1));
    loadTrendingVideos();
  }, [loadTrendingVideos, pipedInstanceList, setInstance]);

  useEffect(() => {
    if (window?.document) loadTrendingVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar />
      <main className="w-full  min-h-screen">
        <div className="flex flex-col items-center max-w-7xl m-auto p-6">
          <header className="w-full mb-6">
            <h1 className="text-3xl font-bold">Vídeos em alta</h1>
          </header>

          {loading && <CustomSpinner size="lg" stroke="md" />}
          {!loading && trendingVideos.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
              {trendingVideos.map((video, index) => (
                <TrendingVideo key={index} data={video} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
