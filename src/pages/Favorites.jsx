import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import GameGrid from '../components/GameGrid';
import { useFavorites } from '../hooks/useFavorites';

function Empty() {
  return (
    <div className="glass relative mx-auto max-w-xl overflow-hidden rounded-[2rem] px-6 py-16 text-center">
      <div className="absolute left-1/2 top-10 -z-0 h-40 w-40 -translate-x-1/2 rounded-full bg-pink-500/30 blur-3xl" />
      {['W', '7', '♞'].map((t, i) => (
        <motion.span key={t} aria-hidden="true" className="absolute grid h-10 w-10 place-items-center rounded-lg bg-white/10 font-display font-bold" style={{ left: `${12 + i * 36}%`, top: i === 1 ? '10%' : '24%' }}
          animate={{ y: [0, -10, 0], rotate: [i * 6 - 6, i * 6 + 6, i * 6 - 6] }} transition={{ duration: 5 + i, repeat: Infinity }}>{t}</motion.span>
      ))}
      <motion.div className="relative mx-auto mb-6 grid h-24 w-24 place-items-center rounded-full border border-pink-400/40 bg-pink-500/10 text-pink-300 shadow-[0_0_40px_rgba(244,114,182,.4)]" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2.4, repeat: Infinity }}><Heart size={44} /></motion.div>
      <h2 className="relative font-display text-3xl font-bold">No favorites yet.</h2>
      <p className="relative mx-auto mt-2 max-w-sm text-ink/70">Save games you want to come back to and they’ll appear here.</p>
      <Link to="/games" className="detour-play-link relative mt-8 inline-flex rounded-xl px-8 py-4 font-bold transition hover:scale-[1.02] active:scale-95">Explore Games</Link>
    </div>
  );
}

export default function Favorites() {
  const { games, count } = useFavorites();
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 md:px-6">
      <h1 className="font-display text-5xl font-bold md:text-7xl">Your Favorites</h1>
      <p className="mb-10 mt-2 text-ink/70">Your personal collection of puzzles worth coming back to.{count > 0 && ` ${count} saved.`}</p>
      {count ? <GameGrid games={games} /> : <Empty />}
    </div>
  );
}
