'use client';

import CustomSpinner from '@/components/CustomSpinner';
import '@/components/CustomSpinner/custom-spinner.css';

export function VideoPlayerLoading() {
  return (
    <div className="w-full h-full absolute flex items-center justify-center">
      <CustomSpinner size="lg" />
    </div>
  );
}
