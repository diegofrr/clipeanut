import { createRef, useEffect } from 'react';

import Icons from '@/icons';
import CustomSpinner from '../CustomSpinner';
import DescriptionModalSkeleton from './Skeleton';

import type { IStream } from '@/types';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react';
import { useWindowSize } from 'usehooks-ts';

type VideoDescriptionModalProps = {
  data: IStream | undefined | null;
  isOpen: boolean;
  onOpenChange: () => void;
};

export function VideoDescriptionModal({ data, isOpen, onOpenChange }: VideoDescriptionModalProps) {
  const descriptionRef = createRef<HTMLDivElement>();
  const { width } = useWindowSize();

  function addTargetBlankForDescriptionLinks(container: HTMLElement) {
    container.querySelectorAll('a').forEach((link) => {
      link.setAttribute('target', '_blank');
    });
  }

  useEffect(() => {
    if (descriptionRef.current && data) {
      descriptionRef.current.innerHTML = data.description || 'Este vídeo não tem descrição...';
      data.description && addTargetBlankForDescriptionLinks(descriptionRef.current);
    }
  }, [data, descriptionRef]);

  return (
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
          {!data ? (
            <>
              <CustomSpinner size="sm" />
              <span className="ml-4">Um momento...</span>
            </>
          ) : data && data.description ? (
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
          {!data && <DescriptionModalSkeleton />}
          <div
            className={`dark:bg-neutral-900 bg-white bg-opacity-10 rounded-md p-2 video-description-container
        ${width < 768 ? 'text-xs' : 'text-base'}
        ${!data ? 'hidden' : ''}`}
            ref={descriptionRef}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
