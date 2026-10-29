import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import GameGrid from '../components/GameGrid';
import GameCard from '../components/GameCard';
import DailyGames from '../components/DailyGames';
import CategorySection from '../components/CategorySection';
import Motif from '../components/Motif';
import { categories, games } from '../data/games';
import { useFavorites } from '../hooks/useFavorites';
import { useRecentlyPlayed } from '../hooks/useRecentlyPlayed';

const slugs = Object.keys(categories);
const by = (cat, n = 4) => games.filter((g) => g.category === cat).slice(0, n);

function Stats() {
  const stats = [[games.length, 'hand-picked games'], [slugs.length, 'categories'], [games.filter((g) => g.daily).length, 'daily puzzles'], [games.filter((g) => g.gem).length, 'hidden gems']];
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-12 md:grid-cols-4 md:px-6">
      {stats.map(([n, l]) => (
        <div key={l} className="detour-stat-card rounded-2xl p-6 text-center">
          <p className="bg-gradient-to-r from-cyan-300 to-fuchsia-400 bg-clip-text font-display text-5xl font-bold text-transparent">{n}</p>
          <p className="mt-1 text-sm font-bold text-ink/60">{l}</p>
        </div>
      ))}
    </section>
  );
}

export default function Home() {
  const { games: favs } = useFavorites();
  const { games: recent } = useRecentlyPlayed();
  const feat = games.filter((g) => g.featured);
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <h2 className="font-pixel text-2xl leading-relaxed md:text-4xl">Today’s Picks</h2>
        <p className="mb-8 mt-2 max-w-xl text-ink/70">Eight games we would send a friend, curated rather than ranked.</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <GameCard game={feat[0]} big />
          {feat.slice(1).map((g, i) => <GameCard key={g.id} game={g} index={i + 1} />)}
          <Link to="/games" className="detour-more-card group grid min-h-40 place-items-center rounded-2xl p-6 text-center transition">
            <span className="font-pixel text-[11px] leading-relaxed">All {games.length} games<ArrowRight className="ml-2 inline transition group-hover:translate-x-1" /></span>
          </Link>
        </div>
      </section>
      {favs.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12 md:px-6" aria-label="Your picks">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-pixel text-2xl leading-relaxed md:text-3xl">Your Picks</h2>
              <p className="mt-2 text-ink/70">Games you’ve saved for later.</p>
            </div>
            <Link to="/favorites" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold ring-1 ring-pink-400/40 transition hover:bg-pink-500/10 hover:shadow-[0_0_24px_rgba(244,114,182,.35)]">View All Favorites <ArrowRight size={16} /></Link>
          </div>
          <GameGrid games={favs.slice(0, 6)} />
        </section>
      )}
      {recent.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12 md:px-6" aria-label="Recently played">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div><h2 className="font-pixel text-2xl leading-relaxed md:text-3xl">Continue Exploring</h2><p className="mt-2 text-ink/60">Games you opened recently. Pick up the rabbit hole again.</p></div>
            <Link to="/games" className="text-sm font-bold text-cyan-200 hover:text-white">Browse everything →</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{recent.slice(0, 4).map((g) => <GameCard key={g.id} game={g} />)}</div>
        </section>
      )}
      <DailyGames />
      <section id="categories" className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <h2 className="font-pixel text-2xl leading-relaxed md:text-4xl">Pick a playground</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {slugs.map((s) => (
            <Link key={s} to={`/games/${s}`} style={{ '--a': categories[s].accent }} className="detour-category-card group relative h-44 overflow-hidden rounded-2xl border transition">
              <Motif game={{ category: s, name: categories[s].short, tags: [] }} />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#fff3d2] via-[#fff3d2]/85 to-transparent p-4 pt-10 font-pixel text-[10px] leading-relaxed text-[#263a3e]">{categories[s].label}</span>
            </Link>
          ))}
        </div>
      </section>
      <CategorySection slug="word" games={by('word')} />
      <CategorySection slug="logic" games={by('logic')} />
      <CategorySection slug="crosswords" games={by('crosswords')} />
      <CategorySection slug="strategy" games={by('strategy')} />
      <CategorySection slug="weird" games={by('weird')} />
      <CategorySection slug="gems" games={games.filter((g) => g.gem).slice(0, 4)} />
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <Link to="/universe" className="detour-universe-teaser group relative block overflow-hidden rounded-2xl border p-8 transition md:p-12">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#78b9b2]/25 blur-3xl transition group-hover:bg-[#f4c84a]/30" />
          <div className="relative max-w-2xl"><span className="text-xs font-black uppercase tracking-[0.25em] text-[#6b7d72]">New way to explore</span><h2 className="mt-4 font-pixel text-2xl leading-relaxed md:text-4xl">ENTER THE PUZZLE UNIVERSE</h2><p className="mt-4 text-[#5c6b68]">Navigate a constellation of categories instead of scrolling a list. Pick a planet and see what lives there.</p><span className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#f4c84a] px-5 py-3 text-sm font-bold text-[#24363b] shadow-[4px_4px_0_#24363b]">Explore the map <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span></div>
        </Link>
      </section>
      <Stats />
    </>
  );
}
