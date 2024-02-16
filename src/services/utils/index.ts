import type { IStream } from '@/types';

import { isFakeDataFetch } from '@/environments';
import { FetchStreamOptionsType, fetchStream } from '../actions/fetchStreamData';

import { PIPED_VALUES } from '@/constants';
const { DEFAULT_INSTANCE_LIST } = PIPED_VALUES;

let oldInstanceList = DEFAULT_INSTANCE_LIST;
export async function getStreamData(streamId: string): Promise<IStream> {
  const instance = oldInstanceList[0];

  const options = {
    streamId,
    instance,
    isFake: isFakeDataFetch,
    delay: 1
  } as FetchStreamOptionsType;

  try {
    const data = await fetchStream({ options });
    return data;
  } catch {
    if (!oldInstanceList?.length) oldInstanceList = DEFAULT_INSTANCE_LIST;
    oldInstanceList = oldInstanceList.slice(1);

    return getStreamData(streamId);
  }
}

export function getCurrentRegion() {
  const region = JSON.parse(localStorage.getItem('@piped-current-region') || '"BR"');
  return region;
}
