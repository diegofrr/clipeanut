import type { ITrendingVideo } from '@/types';
import { type ITrendingVideosFileOutput, ServerFile } from '@/api/types';

import { isSameDay } from '.';
import { getServerFileData, setServerFileData } from '@/api';

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
