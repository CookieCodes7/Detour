import { motion } from 'framer-motion';
import { Lock, Trophy } from 'lucide-react';
import { ACHIEVEMENTS, useAchievements } from '../hooks/useAchievements';

export default function Achievements({ compact = false }) {
  const { unlocked, count } = useAchievements();
  return (
    <section className={compact ? 'py-8' : 'mx-auto max-w-7xl px-4 py-12 md:px-6'}>
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs font-bold text-amber-200"><Trophy size={13} /> {count}/{ACHIEVEMENTS.length} unlocked</div>
          <h2 className="font-pixel text-2xl leading-relaxed md:text-3xl">Achievements</h2>
          <p className="mt-2 text-sm text-ink/60">Little reasons to explore one more puzzle.</p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENTS.map((a) => {
          const on = unlocked[a.id];
          return <motion.div key={a.id} whileHover={{ y: -3 }} className={`glass relative overflow-hidden rounded-2xl p-4 ${on ? 'border-amber-300/25 shadow-[0_0_28px_-14px_rgba(251,191,36,.8)]' : 'opacity-65'}`}>
            <div className={`grid h-12 w-12 place-items-center rounded-xl text-xl ${on ? 'bg-amber-300/15 text-amber-200' : 'bg-white/5 text-white/30'}`}>{on ? a.icon : <Lock size={18} />}</div>
            <h3 className="mt-3 font-bold">{a.title}</h3>
            <p className="mt-1 text-sm text-ink/60">{a.body}</p>
            {on && <span className="absolute right-3 top-3 text-[10px] font-black uppercase tracking-widest text-amber-200">Unlocked</span>}
          </motion.div>;
        })}
      </div>
    </section>
  );
}
