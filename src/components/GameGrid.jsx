import GameCard from './GameCard';
export default function GameGrid({ games }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {games.map((g, i) => <GameCard key={g.id} game={g} index={i} />)}
    </div>
  );
}
