import { useRef, useState } from 'react';
import { ArrowRight, Check, Copy, ExternalLink, X } from 'lucide-react';
import Overlay from './Overlay';
import GamePreview from './GamePreview';
import FavButton from './FavButton';
import { diffStyle } from './GameCard';
import { categories, host } from '../data/games';
import { useUI } from '../hooks/useUI';

export default function GameModal({ game, onClose }) {
  const last = useRef(null);
  if (game) last.current = game;
  const g = game || last.current;
  const [copied, setCopied] = useState(false);
  const { playGame } = useUI();
  const copy = async () => {
    try { await navigator.clipboard.writeText(g.url); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { window.prompt('Copy this link', g.url); }
  };
  return (
    <Overlay open={!!game} onClose={onClose} label={g ? `${g.name} details` : 'Game details'}>
      {g && (
        <>
          <div className="relative h-52">
            <GamePreview game={g} size="lg" />
            <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full glass shadow hover:scale-105"><X size={18} /></button>
          </div>
          <div className="space-y-4 p-6">
            <div>
              <h2 className="font-display text-3xl font-bold">{g.name}</h2>
              <p className="mt-2 text-ink/75">{g.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-bold">
              <span className="rounded-full bg-ink/5 px-3 py-1.5">{categories[g.category].label}</span>
              <span className={`rounded-full px-3 py-1.5 ${diffStyle[g.difficulty]}`}>{g.difficulty}</span>
              <span className="rounded-full bg-ink/5 px-3 py-1.5">About {g.duration}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 text-sm text-ink/60">{g.tags.map((t) => <span key={t}>#{t}</span>)}</div>
            <FavButton game={g} label className="w-full sm:w-auto" />
            <div className="flex flex-col gap-3 sm:flex-row">
              <a onClick={() => playGame(g)} href={g.url} target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-grape px-6 py-3.5 font-bold text-white transition hover:bg-grape active:scale-95">
                PLAY GAME <ArrowRight size={18} />
              </a>
              <a href={new URL(g.url).origin} target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 font-bold ring-1 ring-ink/20 transition hover:bg-ink/5 active:scale-95">
                VISIT WEBSITE <ExternalLink size={16} />
              </a>
            </div>
            <p className="flex flex-wrap items-center gap-2 text-sm text-ink/60">
              Opens in a new tab on {host(g.url)}.
              <button onClick={copy} className="inline-flex items-center gap-1 rounded-full bg-ink/5 px-3 py-1 font-bold text-ink hover:bg-ink/10">
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Link copied' : 'Copy link'}
              </button>
            </p>
          </div>
        </>
      )}
    </Overlay>
  );
}
