import streamData from '@/mocks/streamData';
import IStream from '@/types/Stream';

import { DEFAULT_VALUES } from '@/constants';

interface IStreamProps {
  videoId: string;
  endpoint: string;
}

interface IFakeStreamProps {
  delay?: number;
}

export async function getStream(props: IStreamProps): Promise<IStream> {
  return fetch(`${props.endpoint}/streams/${props.videoId}`)
    .then((res) => res.json())
    .then((data) => data as IStream);
}

export async function _getStream(props?: IFakeStreamProps): Promise<IStream> {
  return new Promise((resolve) => {
    setTimeout(
      () => {
        resolve(streamData as IStream);
      },
      props?.delay || DEFAULT_VALUES.FAKE_REQUEST_DELAY
    );
  });
}
