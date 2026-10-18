import { Search } from 'lucide-react';
import { filters, sorts } from '../data/games';
export default function FilterBar({ query, setQuery, filter, setFilter, sort, setSort }) {
  return (
    <div className="sticky top-16 z-30 -mx-4 space-y-3 bg-[#0b0a1f]/80 px-4 py-4 backdrop-blur md:mx-0 md:rounded-3xl">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Search games</span>
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/50" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search games… try “hard” or “5 minutes”"
            className="w-full rounded-full glass py-3 pl-11 pr-4 shadow ring-1 ring-ink/10 placeholder:text-ink/40" />
        </label>
        <label className="flex items-center gap-2 text-sm font-bold">
          Sort
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full glass px-4 py-3 shadow ring-1 ring-ink/10">
            {sorts.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </select>
        </label>
      </div>
      <div className="noscroll -mx-4 flex gap-2 overflow-x-auto px-4 pb-1" role="group" aria-label="Filter by category">
        {filters.map(([k, l]) => (
          <button key={k} onClick={() => setFilter(k)} aria-pressed={filter === k}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition active:scale-95 ${filter === k ? 'bg-grape text-white' : 'glass ring-1 ring-ink/10 hover:bg-ink/5'}`}>{l}</button>
        ))}
      </div>
    </div>
  );
}
