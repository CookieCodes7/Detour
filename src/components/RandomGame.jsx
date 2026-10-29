import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Dices, ExternalLink, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Overlay from './Overlay';
import Motif from './Motif';
import { diffStyle } from './GameCard';
import { categories } from '../data/games';
import { randomGame } from '../utils/randomGame';
import { useUI } from '../hooks/useUI';

export default function RandomGame({ open, onClose }) {
  const [game, setGame] = useState(null);
  const { playGame } = useUI();
  const [rolling, setRolling] = useState(false);
  const [tick, setTick] = useState('');
  const timer = useRef(null);
  const gameRef = useRef(null);
  const spin = useCallback(() => {
    clearInterval(timer.current);
    setRolling(true);
    let n = 0;
    timer.current = setInterval(() => {
      setTick(randomGame().name);
      if (++n > 8) {
        clearInterval(timer.current);
        const next = randomGame(gameRef.current);
        gameRef.current = next; setGame(next); setRolling(false);
      }
    }, 90);
  }, []);
  useEffect(() => { if (open) spin(); return () => clearInterval(timer.current); }, [open, spin]);
  return (
    <Overlay open={open} onClose={onClose} label="Random game">
      <div className="relative grid h-44 place-items-center" style={{ background: rolling || !game ? '#5B3DF5' : game.accent }}>
        {rolling || !game ? (
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}><Dices size={56} className="text-white" /></motion.div>
        ) : <Motif game={game} />}
        <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full glass shadow"><X size={18} /></button>
      </div>
      <div className="space-y-4 p-6" aria-live="polite">
        {rolling || !game ? (
          <p className="py-6 text-center font-display text-3xl font-bold text-ink/40">{tick || 'Rolling…'}</p>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <h2 className="font-display text-3xl font-bold">{game.name}</h2>
            <div className="flex flex-wrap gap-2 text-xs font-bold">
              <span className="rounded-full bg-ink/5 px-3 py-1.5">{categories[game.category].short}</span>
              <span className={`rounded-full px-3 py-1.5 ${diffStyle[game.difficulty]}`}>{game.difficulty}</span>
              <span className="rounded-full bg-ink/5 px-3 py-1.5">{game.duration}</span>
            </div>
            <p className="text-ink/75">{game.description}</p>
          </motion.div>
        )}
        <div className="flex flex-col gap-3 sm:flex-row">
          <a onClick={() => game && !rolling && playGame(game)} href={game && !rolling ? game.url : undefined} target="_blank" rel="noopener noreferrer" aria-disabled={rolling || !game}
            className={`detour-play-link inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-bold transition active:scale-95 ${rolling || !game ? 'pointer-events-none opacity-40' : ''}`}>
            Play Now <ExternalLink size={16} />
          </a>
          <button onClick={spin} disabled={rolling} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 font-bold ring-1 ring-ink/20 transition hover:bg-ink/5 active:scale-95 disabled:opacity-40">
            Spin Again <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </Overlay>
  );
}
