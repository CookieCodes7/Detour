import { useState } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFavorites } from '../hooks/useFavorites';

export default function FavButton({ game, label = false, className = '' }) {
  const { has, toggle } = useFavorites();
  const [pop, setPop] = useState(0);
  const on = has(game.id);
  return (
    <motion.button type="button" whileTap={{ scale: 0.82 }} aria-pressed={on}
      aria-label={on ? `Remove ${game.name} from favorites` : `Add ${game.name} to favorites`}
      onClick={(e) => { e.stopPropagation(); setPop((n) => n + 1); toggle(game.id); }}
      className={`inline-flex items-center justify-center gap-2 rounded-full border text-sm font-bold backdrop-blur transition ${on ? 'border-pink-400/60 bg-pink-500/20 text-pink-300 shadow-[0_0_18px_rgba(244,114,182,.45)]' : 'border-white/15 bg-black/35 text-white/80 hover:border-white/40 hover:text-white'} ${label ? 'px-5 py-3' : 'h-10 w-10'} ${className}`}>
      <motion.span key={pop} className="grid place-items-center" initial={pop ? { scale: 0.4, rotate: -25 } : false} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 500, damping: 12 }}>
        <Heart size={18} fill={on ? 'currentColor' : 'none'} />
      </motion.span>
      {label && (on ? 'Favorited' : 'Add to Favorites')}
    </motion.button>
  );
}
