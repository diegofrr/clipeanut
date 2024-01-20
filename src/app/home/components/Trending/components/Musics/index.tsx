type TrendingMusicsProps = {
  isHidden?: boolean;
};

export default function TrendingMusics({ isHidden }: TrendingMusicsProps) {
  return (
    <div className={`px-6 sm:p-0 ${isHidden ? 'hidden' : ''}`}>
      <h1>Trending Musics</h1>
    </div>
  );
}
