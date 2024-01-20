type TrendingGamesProps = {
  isHidden?: boolean;
};

export default function TrendingGames({ isHidden }: TrendingGamesProps) {
  return (
    <div className={`px-6 sm:p-0 ${isHidden ? 'hidden' : ''}`}>
      <h1>Trending Games</h1>
    </div>
  );
}
