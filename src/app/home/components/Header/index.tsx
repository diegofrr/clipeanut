'use client';

import Link from 'next/link';
import { createRef, useCallback, useContext, useEffect, useState } from 'react';

import '@/styles/custom-oplayer-ui.css';
import './styles/video-description.css';

import Icons from '@/icons';

import type { IStream } from '@/types';
import { fetchStream, type FetchStreamOptionsType } from '@/services/actions/fetchStreamData';
import { Button, Image, Modal, ModalBody, ModalContent, ModalHeader, Tooltip, useDisclosure } from '@nextui-org/react';
import { useWindowSize } from 'usehooks-ts';

import { HighlighStreamContext } from '../../contexts/highlightStream';

import { isFakeDataFetch } from '@/environments';
import { StreamUtils } from '@/utils';
import { useLocalStorageWithExpiration } from '@/hooks';
import { highlightStreamData } from '@/mocks/highlightStreamData';

import { PIPED_VALUES, LOCALSTORAGE_KEYS } from '@/constants';
const { DEFAULT_INSTANCE_LIST } = PIPED_VALUES;

export default function HomeHeader() {
  let oldInstanceList = DEFAULT_INSTANCE_LIST;
  const descriptionRef = createRef<HTMLDivElement>();

  const { width } = useWindowSize();
  const { isExistsItem, getStoragedItem, setStoragedItem } = useLocalStorageWithExpiration();
  const { highlightStreamId, highlightStream } = useContext(HighlighStreamContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [stream, setStream] = useState<IStream>();

  useEffect(() => {
    if (descriptionRef.current && stream) {
      descriptionRef.current.innerHTML = stream.description;
    }
  }, [stream, descriptionRef]);

  function retryGetStreamData() {
    if (!oldInstanceList?.length) oldInstanceList = DEFAULT_INSTANCE_LIST;
    oldInstanceList = oldInstanceList.slice(1);

    getStreamData();
  }

  const getStreamData = useCallback(async () => {
    const instance = oldInstanceList[0];

    const options = {
      streamId: highlightStreamId,
      instance,
      isFake: isFakeDataFetch,
      delay: 1
    } as FetchStreamOptionsType;

    const boundFetchStream = async () => {
      try {
        const data = await fetchStream({ options });
        setStoragedItem(LOCALSTORAGE_KEYS.HIGHLIGTH_STREAM, { data, highlightStreamId }, { minutes: 15 });
        setStream(data);
      } catch {
        retryGetStreamData();
      }
    };

    try {
      if (isExistsItem(LOCALSTORAGE_KEYS.HIGHLIGTH_STREAM)) {
        const storagedHighlightStream = getStoragedItem<{ data: IStream; highlightStreamId: string }>(
          LOCALSTORAGE_KEYS.HIGHLIGTH_STREAM
        );
        if (storagedHighlightStream?.value) {
          if (storagedHighlightStream.value.highlightStreamId === highlightStreamId) {
            setStream(storagedHighlightStream.value.data);
          } else await boundFetchStream();
        } else await boundFetchStream();
      } else await boundFetchStream();

      if (isFakeDataFetch) setStream(highlightStreamData as IStream);
    } catch {
      retryGetStreamData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oldInstanceList, highlightStreamId]);

  useEffect(() => {
    if (window?.document && highlightStreamId) getStreamData();
  }, [highlightStreamId, getStreamData]);

  return (
    <header className="hidden sm:flex flex-row w-full bg-neutral-200 dark:bg-neutral-950 p-6 gap-6 rounded-xl relative">
      <div className="rounded-lg relative overflow-hidden w-full max-h-[400px] max-w-[720px]">
        <Image
          isLoading={!highlightStream}
          width={720}
          height={400}
          loading="lazy"
          src={stream?.thumbnailUrl}
          alt="Thumbnail"
        />

        <>
          <div className="absolute flex gap-4 items-center justify-end left-0 right-0 bottom-0 p-4 z-20"></div>
          <span className="absolute left-0 bottom-0 right-0 shadow-[0px_0px_6em_8em_#000000] z-[10]" />
        </>
      </div>
      <div className="bg-netral-850 flex flex-col gap-4 w-full z-10 mb-auto">
        <div className="flex flex-row gap-4 items-center">
          <div className="bg-default-200 relative min-w-[40px] min-h-[40px] w-10 h-10 rounded-full">
            <Image
              isLoading={!highlightStream}
              alt={stream?.uploader + ' avatar'}
              src={stream?.uploaderAvatar}
              height={40}
              width={40}
              radius="full"
              className="z-[1] overflow-hidden"
            />
            {stream?.uploaderVerified && (
              <Icons.VerifiedSolid
                size={18}
                className="absolute rounded-full p-[1px] bottom-[-2px] right-[-2px] bg-neutral-200 dark:bg-neutral-950 text-app_orange-600 z-[2]"
              />
            )}
          </div>

          <div>
            <p className="sm:text-sm md:text-base text-lg font-bold">{stream?.uploader}</p>

            {stream && (
              <p className="break-all text-xs text-gray-800 dark:text-gray-300  inline-flexowrap">
                {StreamUtils.translateUploadedDate(highlightStream.uploadedDate || '')}
              </p>
            )}
          </div>
        </div>

        <p className="md:text-lg lg:text-3xl xl:text-5xl font-bold line-clamp-3 overflow-hidden leading-1">
          {stream?.title}
        </p>

        <div className="flex flex-row gap-4">
          <Button
            as={Link}
            size={width > 1280 ? 'md' : 'sm'}
            radius="full"
            href={highlightStream.url || ''}
            className="font-medium"
            startContent={<Icons.ClapperboardSolid size={20} />}
            color="warning"
          >
            Assistir
          </Button>

          <Button
            onPress={onOpen}
            className="bg-transparent border-1 border-foreground dark:border-foreground-300"
            size={width > 1280 ? 'md' : 'sm'}
            radius="full"
            startContent={<Icons.ClapperboardTextSolid size={18} />}
          >
            Ver descrição
          </Button>

          <Tooltip
            className="bg-foreground text-background"
            classNames={{
              base: 'before:bg-foreground before:text-background'
            }}
            content="Assistir depois"
            radius="full"
            placement="bottom"
            showArrow
          >
            <Button
              isIconOnly
              className="bg-transparent border-1 border-foreground dark:border-foreground-300"
              size={width > 1280 ? 'md' : 'sm'}
              radius="full"
              startContent={<Icons.ClockSolid size={18} />}
            ></Button>
          </Tooltip>

          <Modal
            className="overflow-hidden"
            scrollBehavior="inside"
            size={width < 768 ? 'lg' : '4xl'}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          >
            <ModalContent>
              <ModalHeader>Descrição</ModalHeader>
              <ModalBody>
                <div
                  className={`dark:bg-neutral-900 bg-white bg-opacity-10 rounded-md p-2 video-description-container ${
                    width < 768 ? 'text-xs' : 'text-base'
                  }`}
                  ref={descriptionRef}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      </div>

      {
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={highlightStream.thumbnail}
          alt="Thumbnail background"
          className="blur-3xl opacity-20 absolute max-h-[50vh] w-full max-w-[80vw] top-[20%] right-0 object-cover pointer-events-none"
        />
      }
    </header>
  );
}
