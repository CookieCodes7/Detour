import { Link } from 'react-router-dom';
import { Shuffle } from 'lucide-react';
import { useUI } from '../hooks/useUI';

export default function NotFound() {
  const { surprise } = useUI();
  return (
    <div className="mx-auto grid max-w-2xl place-items-center gap-6 px-4 py-24 text-center">
      <div className="flex gap-2" aria-hidden="true">{['4', '0', '4'].map((n, i) => <span key={i} className="grid h-20 w-20 rotate-3 place-items-center rounded-2xl bg-grape font-display text-5xl font-bold text-white shadow-lg even:-rotate-6 even:bg-pop">{n}</span>)}</div>
      <h1 className="font-display text-4xl font-bold md:text-6xl">Looks like this puzzle doesn’t exist.</h1>
      <p className="text-ink/70">The page you wanted isn’t here. Try the full catalogue or let us pick for you.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link to="/games" className="detour-play-link rounded-xl px-7 py-3.5 font-bold">Back to Games</Link>
        <button onClick={surprise} className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold ring-1 ring-ink/20 hover:bg-ink/5"><Shuffle size={16} /> Random Game</button>
      </div>
    </div>
  );
}
