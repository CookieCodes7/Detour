import { Link, useParams } from 'react-router-dom';
import GameGrid from '../components/GameGrid';
import EmptyState from '../components/EmptyState';
import Motif from '../components/Motif';
import NotFound from './NotFound';
import { categories, games } from '../data/games';

export default function Category() {
  const { cat } = useParams();
  const c = categories[cat];
  if (!c) return <NotFound />;
  const list = cat === 'gems' ? games.filter((g) => g.gem) : games.filter((g) => g.category === cat);
  return (
    <div className={`pat pat-${cat}`} style={{ backgroundImage: `radial-gradient(60% 40% at 80% 0%, ${c.accent}2e, transparent 70%)` }}>
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 md:px-6">
        <div className="detour-category-hero relative grid overflow-hidden rounded-2xl border md:grid-cols-2" style={{ '--a': c.accent }}>
          <div className="p-8 md:p-12">
            <Link to="/games" className="text-sm font-bold text-white/80 hover:underline">← All games</Link>
            <h1 className={`mt-4 text-5xl font-bold leading-none md:text-7xl ${cat === 'crosswords' ? 'font-serif font-bold' : 'font-display'}`}>{c.label}</h1>
            <p className="mt-4 max-w-md text-lg text-white/85">{c.blurb}</p>
          </div>
          <div className="relative min-h-40 md:min-h-64"><div className="absolute inset-0 origin-center scale-125 md:scale-150"><Motif game={{ category: cat, name: c.short, tags: [] }} /></div></div>
        </div>
        <div className="mt-10">
          {list.length ? <GameGrid games={list} /> : (
            <EmptyState title="No games here yet" body="This category is empty. Browse everything instead.">
              <Link to="/games" className="detour-play-link rounded-xl px-6 py-3 font-bold">Back to Games</Link>
            </EmptyState>
          )}
        </div>
      </div>
    </div>
  );
}
