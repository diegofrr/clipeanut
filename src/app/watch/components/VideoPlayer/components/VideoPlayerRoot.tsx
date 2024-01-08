import StreamProvider from '../contexts/stream';

type VideoPlayerProps = {
  children: React.ReactNode;
  streamId: string;
};

export function VideoPlayerRoot({ children, streamId }: VideoPlayerProps) {
  return (
    <StreamProvider streamId={streamId}>
      <div className="w-[800px] flex flex-col gap-4 max-w-full-minus-2rem relative z-max">{children}</div>
    </StreamProvider>
  );
}
