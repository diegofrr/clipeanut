'use client';

import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

import '@/styles/custom-oplayer-ui.css';

import Icons from '@/icons';
import StreamDescriptionModal from '@/components/StreamDescriptionModal';

import type { IStream } from '@/types';
import { Button, Image, Tooltip, useDisclosure } from '@nextui-org/react';
import { useWindowSize } from 'usehooks-ts';

import { HighlighStreamContext } from '../../contexts/highlightStream';

import { isFakeDataFetch } from '@/environments';
import { StreamUtils } from '@/utils';
import { getHighlightStreamData } from '@/services/utils';

import { useTheme } from 'next-themes';
import { isFavoriteStream, toggleFavoriteStream } from '@/services/actions/LocalStorage/favoriteStreams';
import { myToast } from '@/components/Toaster';

export default function HomeHeader() {
  const { resolvedTheme } = useTheme();
  const { width } = useWindowSize();

  const { highlightStreamId, highlightStream } = useContext(HighlighStreamContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [stream, setStream] = useState<IStream | null>();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  function handleToggleFavorite() {
    if (!stream) return;
    const isSaved = toggleFavoriteStream({ stream });
    setIsFavorite(!isFavorite);

    const message = isSaved ? 'Vídeo salvo nos favoritos.' : 'Vídeo removido dos favoritos.';
    const icon = isSaved ? (
      <Icons.HeartSolid color="#e70e0e" size={20} />
    ) : (
      <Icons.HeartBrokenSolid color="#e70e0e" size={20} />
    );

    myToast(message, {
      icon,
      isDarkMode: resolvedTheme === 'dark',
      radius: 'full'
    });
  }

  function handleClickWatchLater() {
    if (!stream) return;

    myToast('Salvo para assistir depois', {
      icon: <Icons.ClockSolid size={18} />,
      isDarkMode: resolvedTheme === 'dark',
      radius: 'full'
    });
  }

  useEffect(() => {
    if (!window?.document || !highlightStreamId) return;
    (async () => {
      setStream(null);
      setStream(await getHighlightStreamData(highlightStreamId));
    })();
  }, [highlightStreamId]);

  function getStreamImage(type: 'thumbnail' | 'avatar') {
    if (type === 'avatar') return highlightStream.uploaderAvatar;
    else if (isFakeDataFetch) return highlightStream.thumbnail;
    else return `https://i.ytimg.com/vi/${highlightStream.url.split('v=')[1]}/mqdefault.jpg`;
  }

  useEffect(() => {
    if (stream) setIsFavorite(isFavoriteStream({ stream }));
  }, [stream]);

  return (
    <header className="hidden sm:flex flex-row w-full bg-neutral-200 dark:bg-neutral-950 p-6 gap-6 rounded-xl relative">
      <div className="rounded-lg relative overflow-hidden w-full max-h-[400px] max-w-[720px]">
        <Image
          isLoading={!highlightStream}
          width={720}
          height={400}
          loading="lazy"
          src={stream ? stream.thumbnailUrl : highlightStream.thumbnail}
          alt="Thumbnail"
        />

        {stream && (
          <>
            <Button
              title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              onClick={handleToggleFavorite}
              isIconOnly
              className="absolute left-2 bottom-2 z-50"
              variant="light"
              size={width > 1280 ? 'md' : 'sm'}
              radius="full"
              startContent={isFavorite ? <Icons.HeartSolid color="#e70e0e" /> : <Icons.Heart />}
            ></Button>

            <div className="absolute flex gap-4 items-center justify-end left-0 right-0 bottom-0 p-4 z-20"></div>
            <span className="absolute left-0 bottom-0 right-0 shadow-[0px_0px_6em_8em_#000000] z-[10]" />
          </>
        )}
      </div>
      <div className="bg-netral-850 flex flex-col gap-4 w-full z-10 mb-auto">
        <div className="flex flex-row gap-4 items-center">
          <div className="bg-default-200 relative min-w-[40px] min-h-[40px] w-10 h-10 rounded-full">
            <Image
              isLoading={!highlightStream}
              alt={highlightStream.uploaderName + ' avatar'}
              src={getStreamImage('avatar')}
              height={40}
              width={40}
              radius="full"
              className="z-[1] overflow-hidden"
            />
            {highlightStream.uploaderVerified && (
              <Icons.VerifiedSolid
                size={18}
                className="absolute rounded-full p-[1px] bottom-[-2px] right-[-2px] bg-neutral-200 dark:bg-neutral-950 text-app_orange-600 z-[2]"
              />
            )}
          </div>

          <div>
            <p className="sm:text-sm md:text-base text-lg font-bold">{highlightStream.uploaderName}</p>

            {stream && (
              <p className="break-all text-xs text-gray-800 dark:text-gray-300  inline-flexowrap">
                {StreamUtils.translateUploadedDate(highlightStream.uploadedDate || '')}
              </p>
            )}
          </div>
        </div>

        <p className="md:text-lg lg:text-3xl xl:text-5xl font-bold line-clamp-3 overflow-hidden leading-1">
          {highlightStream.title}
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

          {stream && (
            <Button
              onPress={onOpen}
              className="bg-transparent border-1 border-foreground dark:border-foreground-300"
              size={width > 1280 ? 'md' : 'sm'}
              radius="full"
              startContent={<Icons.ClapperboardTextSolid size={18} />}
            >
              Ver descrição
            </Button>
          )}

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
              onClick={handleClickWatchLater}
              isIconOnly
              className="bg-transparent border-1 border-foreground dark:border-foreground-300"
              size={width > 1280 ? 'md' : 'sm'}
              radius="full"
              startContent={<Icons.ClockSolid size={18} />}
            ></Button>
          </Tooltip>

          <StreamDescriptionModal data={stream} isOpen={isOpen} onOpenChange={onOpenChange} />
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
