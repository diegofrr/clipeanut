'use client';

import { Spinner } from '@nextui-org/react';

export function LoadingVideo() {
  return (
    <div className="w-full h-full absolute flex items-center justify-center">
      <Spinner color="warning" className="custom-nextjs-spinner" />
    </div>
  );
}
