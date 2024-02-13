import type { ITrendingVideo } from '@/types';
import { type ITrendingFileOutput, type ITrendingVideosFileOutput, ServerFile } from '@/api/types';

import { getServerFileData, setServerFileData } from '@/api';

export async function getCacheControl(): Promise<RequestCache> {
  const { lastUpdate } = await getServerFileData<ITrendingFileOutput>({ file: ServerFile.TRENDING });

  if (!lastUpdate) {
    const newData = { lastUpdate: new Date().toISOString() };
    await setServerFileData({ file: ServerFile.TRENDING, newData });
    return 'no-store';
  } else if (isSameDay(new Date(lastUpdate), new Date())) {
    return 'default';
  } else return 'no-store';
}

export async function getCachedTrendingVideos(region: string): Promise<ITrendingVideo[]> {
  try {
    const { regionList, lastUpdate } = await getServerFileData<ITrendingVideosFileOutput>({
      file: ServerFile.TRENDING_VIDEOS
    });
    const cachedRegion = regionList.find((item) => item.region === region);

    if (isSameDay(new Date(lastUpdate))) return cachedRegion?.data ? cachedRegion.data : [];
    else {
      resetTrendingVideosInCache();
      return [];
    }
  } catch {
    return [];
  }
}

export async function saveTrendingVideosInCache(region: string, data: ITrendingVideo[]) {
  try {
    let { regionList } = await getServerFileData<ITrendingVideosFileOutput>({
      file: ServerFile.TRENDING_VIDEOS
    });
    if (!regionList || !regionList.length) regionList = [{ region, data }];
    else regionList.push({ region, data });

    const newData = { lastUpdate: new Date().toISOString(), regionList };
    await setServerFileData({ file: ServerFile.TRENDING_VIDEOS, newData });
  } catch {
    /*empty*/
  }
}

export async function resetTrendingVideosInCache() {
  const newData = { lastUpdate: new Date().toISOString(), regionList: [] };
  await setServerFileData({ file: ServerFile.TRENDING_VIDEOS, newData });
}

export function isSameDay(date1: Date, date2 = new Date()) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}
