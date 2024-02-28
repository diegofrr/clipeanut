import { useWindowSize } from 'usehooks-ts';

export default function DescriptionModalSkeleton() {
  const { width } = useWindowSize();

  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <span className="inline-flex gap-4">
        <span className="w-1/4 h-3 rounded-full bg-foreground-200"></span>
        <span className="w-1/4 h-3 rounded-full bg-foreground-200"></span>
        <span className="w-1/6 h-3 rounded-full bg-foreground-200"></span>
        <span className="w-1/6 h-3 rounded-full bg-foreground-200"></span>
      </span>

      <span className="inline-flex gap-4 mb-8">
        <span className="w-1/6 h-3 rounded-full bg-foreground-200"></span>
        <span className="w-1/4 h-3 rounded-full bg-foreground-200"></span>
      </span>

      <span className="inline-flex gap-4">
        <span className="w-1/6 h-3 rounded-full bg-foreground-200"></span>
        <span className="w-1/4 h-3 rounded-full bg-foreground-200"></span>
        <span className="w-1/3 h-3 rounded-full bg-foreground-200"></span>
      </span>

      <span className="inline-flex gap-4">
        <span className="w-1/12 h-3 rounded-full bg-foreground-200"></span>
        <span className="w-1/2 h-3 rounded-full bg-foreground-200"></span>
        <span className="w-1/5 h-3 rounded-full bg-foreground-200"></span>
      </span>

      <span className="inline-flex gap-4">
        <span className="w-1/3 h-3 rounded-full bg-foreground-200"></span>
        <span className="w-1/12 h-3 rounded-full bg-foreground-200"></span>
        <span className="w-1/4 h-3 rounded-full bg-foreground-200"></span>
        <span className="w-1/5 h-3 rounded-full bg-foreground-200"></span>
      </span>

      <span className="inline-flex gap-4 mb-8">
        <span className="w-1/6 h-3 rounded-full bg-foreground-200"></span>
        <span className="w-1/5 h-3 rounded-full bg-foreground-200"></span>
        <span className="w-1/5 h-3 rounded-full bg-foreground-200"></span>
      </span>

      <span className="inline-flex gap-4">
        <span className="w-1/3 h-3 rounded-full bg-foreground-200"></span>
        <span className="w-1/2 h-3 rounded-full bg-foreground-200"></span>
      </span>

      <span className="inline-flex gap-4">
        <span className="w-1/3 h-3 rounded-full bg-foreground-200"></span>
        <span className="w-1/2 h-3 rounded-full bg-foreground-200"></span>
        <span className="w-1/4 h-3 rounded-full bg-foreground-200"></span>
      </span>

      {width >= 768 && (
        <>
          <span className="inline-flex gap-4 mb-8">
            <span className="w-1/6 h-3 rounded-full bg-foreground-200"></span>
            <span className="w-1/4 h-3 rounded-full bg-foreground-200"></span>
            <span className="w-1/3 h-3 rounded-full bg-foreground-200"></span>
          </span>

          <span className="inline-flex gap-4">
            <span className="w-1/4 h-3 rounded-full bg-foreground-200"></span>
            <span className="w-1/6 h-3 rounded-full bg-foreground-200"></span>
            <span className="w-1/12 h-3 rounded-full bg-foreground-200"></span>
          </span>

          <span className="inline-flex gap-4">
            <span className="w-1/2 h-3 rounded-full bg-foreground-200"></span>
            <span className="w-1/3 h-3 rounded-full bg-foreground-200"></span>
          </span>

          <span className="inline-flex gap-4">
            <span className="w-1/5 h-3 rounded-full bg-foreground-200"></span>
            <span className="w-1/3 h-3 rounded-full bg-foreground-200"></span>
          </span>

          <span className="inline-flex gap-4">
            <span className="w-1/3 h-3 rounded-full bg-foreground-200"></span>
            <span className="w-1/3 h-3 rounded-full bg-foreground-200"></span>
          </span>
        </>
      )}
    </div>
  );
}
