import { useState } from 'react';

import Icons from '@/icons';
import StreamDescriptionModal from '@/components/StreamDescriptionModal';

import type { IStream, ITrendingVideo } from '@/types';

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from '@nextui-org/react';
import { getStreamData } from '@/services/utils';

type VideoMenuDropdownProps = {
  video: ITrendingVideo;
};

export function VideoMenuDropdown({ video }: VideoMenuDropdownProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [stream, setStream] = useState<IStream>();

  async function handleViewDescription() {
    onOpen();

    const streamId = video.url.split('v=')[1];
    const stream = await getStreamData(streamId);

    setStream(stream);
  }

  return (
    <>
      <Dropdown backdrop="opaque">
        <DropdownTrigger>
          <Button
            startContent={<Icons.MenuDotsVertical size={18} />}
            isIconOnly
            variant="light"
            radius="full"
            size="sm"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Video options">
          <DropdownItem key="playlist" startContent={<Icons.PlaylistSolid size={18} />}>
            Adicionar a playlist
          </DropdownItem>

          <DropdownItem key="later" startContent={<Icons.Clock size={18} />}>
            Salvar em "Assistir depois"
          </DropdownItem>

          <DropdownItem
            key="description"
            onClick={handleViewDescription}
            startContent={<Icons.ClapperboardText size={18} />}
          >
            Ver descrição
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <StreamDescriptionModal.Video data={stream} isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
