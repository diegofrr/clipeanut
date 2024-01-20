import Musics from './Musics';

export default function Aside() {
  return (
    <aside className="mx-6 sm:mx-0 h-fit min-w-0 sm:max-w-full md:sticky md:min-w-[200px] lg:min-w-[240px] md:top-[calc(65px+1.5rem)]">
      <Musics />
    </aside>
  );
}
