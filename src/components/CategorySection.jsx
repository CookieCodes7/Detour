import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import GameGrid from './GameGrid';
import { categories } from '../data/games';

export default function CategorySection({ slug, games }) {
  const c = categories[slug];
  return (
    <section className={`pat pat-${slug} py-12 md:py-16`} style={{ backgroundImage: `radial-gradient(50% 60% at 90% 0%, ${c.accent}26, transparent 70%)` }}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className={`font-display text-4xl font-bold md:text-5xl ${slug === 'crosswords' ? 'font-serif' : ''}`} style={{ textShadow: `0 0 40px ${c.accent}88` }}>{c.label}</h2>
            <p className="mt-2 max-w-xl text-ink/70">{c.blurb}</p>
          </div>
          <Link to={`/games/${slug}`} className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white ring-1 ring-white/20 transition hover:bg-white/10 hover:shadow-[0_0_24px_var(--a)]" style={{ '--a': c.accent }}>See all <ArrowRight size={16} /></Link>
        </div>
        <GameGrid games={games} />
      </div>
    </section>
  );
}
