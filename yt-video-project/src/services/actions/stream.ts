import streamData from '@/mocks/streamData';
import IStream from '@/types/Stream';

const FAKE_REQUEST_DELAY = 2000;

interface IStreamProps {
  id: string;
}

interface IFakeStreamProps {
  delay?: number;
}

export async function getStream(props?: IStreamProps): Promise<IStream> {
  return fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stream?v=${props?.id}`)
    .then((res) => res.json())
    .then((data) => data as IStream);
}

export async function _getStream(props?: IFakeStreamProps): Promise<IStream> {
  return new Promise((resolve) => {
    setTimeout(
      () => {
        resolve(streamData as IStream);
      },
      props?.delay || FAKE_REQUEST_DELAY
    );
  });
}
