import Icons from '@/icons';

import { IStream, ITrendingVideo } from '@/types';

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react';
import { createRef, useEffect, useState } from 'react';
import { DescriptionModalSkeleton } from './DescriptionModalSkeleton';

import { getStreamData } from '@/services/utils';
import { useWindowSize } from 'usehooks-ts';
import CustomSpinner from '@/components/CustomSpinner';

type VideoMenuDropdownProps = {
  video: ITrendingVideo;
};

export function VideoMenuDropdown({ video }: VideoMenuDropdownProps) {
  const descriptionRef = createRef<HTMLDivElement>();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { width } = useWindowSize();

  const [stream, setStream] = useState<IStream>();

  async function handleViewDescription() {
    onOpen();

    const streamId = video.url.split('v=')[1];
    const stream = await getStreamData(streamId);

    setStream(stream);
  }

  function addTargetBlankForDescriptionLinks(container: HTMLElement) {
    container.querySelectorAll('a').forEach((link) => {
      link.setAttribute('target', '_blank');
    });
  }

  useEffect(() => {
    if (descriptionRef.current && stream) {
      descriptionRef.current.innerHTML = stream.description || 'Este vídeo não tem descrição...';
      stream.description && addTargetBlankForDescriptionLinks(descriptionRef.current);
    }
  }, [stream, descriptionRef]);

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

      <Modal
        className="overflow-hidden h-auto max-h-[70vh]"
        placement="bottom-center"
        classNames={{
          base: 'w-screen',
          wrapper: 'w-screen'
        }}
        scrollBehavior="inside"
        size={width < 640 ? 'full' : '4xl'}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex items-center">
            {!stream ? (
              <>
                <CustomSpinner size="sm" />
                <span className="ml-4">Um momento...</span>
              </>
            ) : stream && stream.description ? (
              <>
                <Icons.ClapperboardTextSolid />
                <span className="ml-4">Descrição</span>
              </>
            ) : (
              <>
                <Icons.HeartBrokenSolid />
                <span className="ml-4">Sorry :(</span>
              </>
            )}
          </ModalHeader>
          <ModalBody className="pb-6">
            {!stream && <DescriptionModalSkeleton />}
            <div
              className={`dark:bg-neutral-900 bg-white bg-opacity-10 rounded-md p-2 video-description-container
              ${width < 768 ? 'text-xs' : 'text-base'}
              ${!stream ? 'hidden' : ''}`}
              ref={descriptionRef}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
