import { CalendarDays, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import GamePreview from './GamePreview';
import FavButton from './FavButton';
import { categories } from '../data/games';
import { useUI } from '../hooks/useUI';

export const diffStyle = { Easy: 'detour-diff-easy', Medium: 'detour-diff-medium', Hard: 'detour-diff-hard' };

export default function GameCard({ game, index = 0, big = false, className = '' }) {
  const { openGame, playGame } = useUI();
  const variant = big ? 'featured' : game.gem ? 'gem' : game.daily ? 'daily' : game.category === 'weird' ? 'weird' : 'standard';
  return (
    <motion.article data-card-variant={variant} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }}
      whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }} style={{ '--a': game.accent }}
      className={`detour-game-card group relative flex flex-col overflow-hidden rounded-2xl transition ${big ? 'lg:col-span-2 lg:row-span-2' : ''} ${className}`}>
      <div className={`detour-card-preview relative shrink-0 border-b ${big ? 'h-56 lg:h-auto lg:flex-1 lg:min-h-[22rem]' : variant === 'daily' ? 'h-32' : 'h-36'}`}>
        {variant === 'gem' && <span className="absolute left-3 top-3 z-10 rounded-full border border-amber-200/20 bg-amber-200/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-amber-100 backdrop-blur">◆ Hidden Gem</span>}
        {variant === 'weird' && <span className="absolute left-3 top-3 z-10 -rotate-2 rounded-md bg-yellow-300 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-black shadow-lg">WHY?</span>}
        <GamePreview game={game} size={big ? 'lg' : 'md'} />
        <div className="absolute right-3 top-3 z-10 detour-fav-wrap"><FavButton game={game} /></div>
        {game.daily && <span className="detour-daily-tag absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold"><CalendarDays size={12} /> Daily</span>}
      </div>
      <div className="detour-game-info flex flex-col gap-3 p-5">
        <button onClick={() => openGame(game)} className={`text-left font-display font-bold leading-tight hover:underline ${big ? 'text-3xl' : 'text-xl'}`}>{game.name}</button>
        <p className="detour-game-description text-sm leading-relaxed">{game.description}</p>
        <div className="flex flex-wrap gap-1.5 text-xs font-bold">
          <span className="detour-meta-pill rounded-lg px-2.5 py-1">{categories[game.category].short}</span>
          <span className={`rounded-full px-2.5 py-1 ${diffStyle[game.difficulty]}`}>{game.difficulty}</span>
          <span className="detour-meta-pill rounded-lg px-2.5 py-1">{game.duration}</span>
        </div>
        <div className="mt-auto flex gap-2 pt-2">
          <a onClick={() => playGame(game)} href={game.url} target="_blank" rel="noopener noreferrer" aria-label={`Play ${game.name} (opens in a new tab)`}
            className="detour-play-link inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold transition active:scale-95">
            Play Now <ExternalLink size={15} />
          </a>
          <button onClick={() => openGame(game)} className="detour-details-link rounded-xl px-4 py-2.5 text-sm font-bold transition active:scale-95">Details</button>
        </div>
      </div>
    </motion.article>
  );
}
