'use client';

import '@/components/CustomSpinner/custom-spinner.css';

import { Spinner } from '@nextui-org/react';

export function VideoPlayerLoading() {
  return (
    <div className="w-full h-full absolute flex items-center justify-center">
      <Spinner color="warning" />
    </div>
  );
}
