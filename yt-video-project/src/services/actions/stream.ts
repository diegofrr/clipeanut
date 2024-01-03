import IPipedInstance from '@/types/PipedInstance';
import streamData from '@/mocks/streamData';
import IStream from '@/types/Stream';

import { DEFAULT_VALUES } from '@/constants';

interface IStreamProps {
  id: string;
  instance: IPipedInstance;
}

interface IFakeStreamProps {
  delay?: number;
}

export async function getStream({ id, instance }: IStreamProps): Promise<IStream> {
  return fetch(`${instance.endpoint}/stream?v=${id}`)
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
