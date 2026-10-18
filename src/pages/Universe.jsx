import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { categories, games } from '../data/games';

const positions = {
  word: [18, 25], logic: [48, 16], geography: [78, 29], media: [74, 68], crosswords: [43, 79], strategy: [19, 69], weird: [51, 48], gems: [88, 80],
};

export default function Universe() {
  return <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 md:px-6">
    <div className="mx-auto max-w-3xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-200"><Sparkles size={13} /> DISCOVERY MAP</span>
      <h1 className="mt-5 font-pixel text-3xl leading-relaxed md:text-5xl">THE PUZZLE UNIVERSE</h1>
      <p className="mx-auto mt-5 max-w-2xl text-ink/65">Every category is a different planet. Pick a world, find a game, fall down a rabbit hole.</p>
    </div>
    <div className="universe-map relative mx-auto mt-12 h-[620px] max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 glass">
      <div className="absolute inset-0 universe-stars" />
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <motion.div animate={{ boxShadow: ['0 0 30px rgba(124,92,255,.35)', '0 0 80px rgba(34,211,238,.45)', '0 0 30px rgba(124,92,255,.35)'] }} transition={{ duration: 4, repeat: Infinity }} className="grid h-28 w-28 place-items-center rounded-full border border-white/20 bg-[#151133]/90 text-center backdrop-blur-xl">
          <div><div className="font-pixel text-xs">PV</div><div className="mt-1 text-[10px] text-white/50">HOME</div></div>
        </motion.div>
      </div>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {Object.entries(positions).map(([slug, [x, y]]) => <line key={slug} x1="50" y1="50" x2={x} y2={y} stroke="rgba(255,255,255,.12)" strokeWidth="0.18" strokeDasharray="1 1" />)}
      </svg>
      {Object.entries(positions).map(([slug, [x, y]]) => {
        const c = categories[slug]; const total = games.filter((g) => g.category === slug).length;
        return <Link key={slug} to={`/games/${slug}`} style={{ left: `${x}%`, top: `${y}%`, '--planet': c.accent }} className="absolute z-20 -translate-x-1/2 -translate-y-1/2">
          <motion.div whileHover={{ scale: 1.12 }} className="group relative grid h-28 w-28 place-items-center rounded-full border border-white/15 bg-[#11102a]/90 text-center shadow-[0_0_34px_-8px_var(--planet)] backdrop-blur-xl transition">
            <div className="absolute inset-2 rounded-full border border-white/10" style={{ borderColor: `${c.accent}55` }} />
            <div className="relative px-2"><div className="font-pixel text-[9px] leading-relaxed">{c.short.toUpperCase()}</div><div className="mt-2 text-[10px] text-white/50">{total} games</div></div>
            <span className="absolute -bottom-7 whitespace-nowrap rounded-full bg-black/60 px-2 py-1 text-[9px] font-bold opacity-0 transition group-hover:opacity-100">ENTER →</span>
          </motion.div>
        </Link>;
      })}
    </div>
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Link to="/games" className="glass rounded-3xl p-6 transition hover:-translate-y-1 hover:border-white/30"><p className="text-sm font-bold text-cyan-200">LOST IN SPACE?</p><h2 className="mt-2 font-pixel text-lg leading-relaxed">SEE ALL GAMES</h2><p className="mt-3 text-sm text-ink/60">Browse the whole catalogue.</p><ArrowRight className="mt-5" size={18} /></Link>
      <Link to="/favorites" className="glass rounded-3xl p-6 transition hover:-translate-y-1 hover:border-white/30"><p className="text-sm font-bold text-pink-200">YOUR CONSTELLATION</p><h2 className="mt-2 font-pixel text-lg leading-relaxed">FAVORITES</h2><p className="mt-3 text-sm text-ink/60">Your saved worlds in one place.</p><ArrowRight className="mt-5" size={18} /></Link>
      <Link to="/games?f=daily" className="glass rounded-3xl p-6 transition hover:-translate-y-1 hover:border-white/30"><p className="text-sm font-bold text-amber-200">NEW SIGNAL</p><h2 className="mt-2 font-pixel text-lg leading-relaxed">DAILY PUZZLES</h2><p className="mt-3 text-sm text-ink/60">Fresh challenges waiting today.</p><ArrowRight className="mt-5" size={18} /></Link>
    </div>
  </div>;
}
