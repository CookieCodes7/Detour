import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import Overlay from './Overlay';
import EmptyState from './EmptyState';
import { games, categories } from '../data/games';
import { useGameSearch } from '../hooks/useGameSearch';

const ideas = ['word', 'sudoku', 'geography', 'hard', '5 minutes', 'daily'];

export default function SearchBar({ open, onClose, onPick }) {
  const [q, setQ] = useState('');
  const ref = useRef(null);
  const results = useGameSearch(games, { query: q }).slice(0, 8);
  useEffect(() => { if (open) { setQ(''); setTimeout(() => ref.current?.focus(), 50); } }, [open]);
  return (
    <Overlay open={open} onClose={onClose} label="Search games" top max="max-w-2xl">
      <div className="flex items-center gap-3 border-b border-ink/10 px-5 py-4">
        <Search size={20} className="text-ink/50" />
        <input ref={ref} value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search games"
          onKeyDown={(e) => e.key === 'Enter' && results[0] && onPick(results[0])}
          placeholder="Search by name, mood, difficulty or time" className="flex-1 bg-transparent text-lg outline-none" />
        <kbd className="hidden rounded bg-ink/5 px-2 py-1 text-xs font-bold sm:block">Esc</kbd>
      </div>
      <div className="flex flex-wrap gap-2 px-5 pt-4">
        {ideas.map((i) => <button key={i} onClick={() => setQ(i)} className="rounded-full bg-ink/5 px-3 py-1.5 text-sm font-bold hover:bg-ink/10">{i}</button>)}
      </div>
      <div className="max-h-[50vh] overflow-y-auto p-3">
        {results.length === 0 ? (
          <EmptyState title="No games match that" body="Try a broader word like “word”, “daily” or “logic”." />
        ) : results.map((g) => (
          <button key={g.id} onClick={() => onPick(g)} className="flex w-full items-center gap-3 rounded-2xl p-3 text-left hover:bg-ink/5">
            <span className="h-10 w-10 shrink-0 rounded-xl" style={{ background: g.accent }} />
            <span className="min-w-0 flex-1">
              <span className="block font-display font-bold">{g.name}</span>
              <span className="block truncate text-sm text-ink/60">{g.description}</span>
            </span>
            <span className="hidden text-xs font-bold text-ink/50 sm:block">{categories[g.category].short} · {g.duration}</span>
          </button>
        ))}
      </div>
    </Overlay>
  );
}
