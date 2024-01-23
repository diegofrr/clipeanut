import { useContext } from 'react';

import type { ITrendingVideo } from '@/types';
import { HighlighStreamContext } from '../../contexts/highlightStream';

export default function HomeHeader() {
  const { streamId } = useContext(HighlighStreamContext);

  return <div>Vídeo ID: {streamId}</div>;
}
