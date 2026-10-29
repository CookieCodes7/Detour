import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import GameGrid from '../components/GameGrid';
import EmptyState from '../components/EmptyState';
import { filters, games } from '../data/games';
import { useGameSearch } from '../hooks/useGameSearch';

export default function Games() {
  const [params, setParams] = useSearchParams();
  const f = params.get('f');
  const filter = filters.some(([k]) => k === f) ? f : 'all';
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('popular');
  const results = useGameSearch(games, { query, filter, sort });
  const setFilter = (k) => setParams(k === 'all' ? {} : { f: k });
  const reset = () => { setQuery(''); setFilter('all'); };
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 md:px-6">
      <h1 className="font-display text-5xl font-bold md:text-7xl">All Games</h1>
      <p className="mt-2 text-ink/70">{results.length} of {games.length} games. Every one opens on its own official site.</p>
      <FilterBar {...{ query, setQuery, filter, setFilter, sort, setSort }} />
      <div className="mt-6">
        {results.length ? <GameGrid games={results} /> : (
          <EmptyState title="No games found" body="Nothing matches those filters. Clear them and try a broader search.">
            <button onClick={reset} className="detour-play-link rounded-xl px-6 py-3 font-bold">Clear filters</button>
          </EmptyState>
        )}
      </div>
    </div>
  );
}
