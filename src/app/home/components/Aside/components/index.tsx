import TrendingMusics from './TrendingMusics';
export default function Aside() {
  return (
    <aside
      className="
    mx-6 sm:mx-0 min-w-0 sm:max-w-full md:sticky border-1 border-foreground-50 md:min-w-[200px]
    rounded-lg p-6 md:top-[calc(65px+1.5rem)] h-32 md:h-[400px] bg-purple-950"
    >
      <TrendingMusics />
    </aside>
  );
}
