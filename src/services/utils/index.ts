import { getServerFileData, setServerFileData } from '@/api';
import { ITrendingFileOutput, ServerFile } from '@/api/types';
import { isSameDay } from '@/utils/Common';

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
