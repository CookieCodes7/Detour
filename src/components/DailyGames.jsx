import { CalendarDays, ExternalLink } from 'lucide-react';
import GamePreview from './GamePreview';
import FavButton from './FavButton';
import { diffStyle } from './GameCard';
import { games } from '../data/games';
import { useUI } from '../hooks/useUI';

export default function DailyGames() {
  const { openGame } = useUI();
  const list = games.filter((g) => g.daily && g.hint);
  const today = new Date().toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
  return (
    <section id="daily" className="bg-grape py-16 text-white md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl font-bold md:text-6xl">Your Daily Dose</h2>
            <p className="mt-2 max-w-xl text-white/70">New puzzles land every day. Here is what is waiting for {today}.</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold"><CalendarDays size={16} /> {today}</span>
        </div>
      </div>
      <div className="noscroll flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 md:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
        {list.map((g) => (
          <article key={g.id} className="flex w-[84%] shrink-0 snap-start flex-col overflow-hidden rounded-3xl glass text-ink sm:w-[360px]">
            <div className="flex items-center gap-4 p-5" style={{ background: g.accent }}>
              <div className="relative h-24 w-36 shrink-0 overflow-hidden rounded-2xl bg-black/10"><GamePreview game={g} size="sm" /></div>
              <div className="min-w-0">
                <div className="mb-1"><FavButton game={g} className="!h-8 !w-8" /></div><h3 className="font-display text-2xl font-bold leading-tight text-white drop-shadow">{g.name}</h3>
                <p className="mt-1 text-sm font-bold text-white/95">{g.hint}</p>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <p className="text-sm text-ink/70">{g.description}</p>
              <div className="flex gap-2 text-xs font-bold"><span className={`rounded-full px-2.5 py-1 ${diffStyle[g.difficulty]}`}>{g.difficulty}</span><span className="rounded-full bg-ink/5 px-2.5 py-1">{g.duration}</span></div>
              <div className="mt-auto flex gap-2 pt-1">
                <a href={g.url} target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold text-white transition active:scale-95 hover:brightness-110" style={{ background: '#5B3DF5' }}>Play today <ExternalLink size={14} /></a>
                <button onClick={() => openGame(g)} className="rounded-full px-4 py-2.5 text-sm font-bold ring-1 ring-ink/15 hover:bg-ink/5">Details</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
