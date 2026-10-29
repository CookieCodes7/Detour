import { Link } from 'react-router-dom';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { Shuffle } from 'lucide-react';
import { useUI } from '../hooks/useUI';

const SYMBOLS = ['◆', '●', '✦', '▲', '■', '7', '?', '+', '◇', '○', '✧', '△'];
const COLORS = ['#F4C84A', '#F6E8C2', '#8BB9B4', '#C26A5C', '#315E6A'];
const rnd = (i) => (Math.imul(i + 7, 2654435761) >>> 0) % 1000 / 1000;
const floaters = SYMBOLS.map((g, i) => ({
  g,
  x: 5 + rnd(i) * 90,
  y: 12 + rnd(i + 40) * 76,
  sz: 12 + rnd(i + 80) * 16,
  c: COLORS[i % COLORS.length],
  r: Math.round((rnd(i + 5) - 0.5) * 30),
}));

function Layer({ mx, my, k, children, className = '' }) {
  const x = useTransform(mx, (v) => v * k);
  const y = useTransform(my, (v) => v * k);
  return <motion.div style={{ x, y }} className={className}>{children}</motion.div>;
}

function Cloud({ className = '' }) {
  return <div className={`detour-clean-cloud ${className}`} aria-hidden="true"><i /><i /><i /></div>;
}

export default function Hero() {
  const { surprise } = useUI();
  const reduce = useReducedMotion();
  const mx = useSpring(useMotionValue(0), { stiffness: 55, damping: 20 });
  const my = useSpring(useMotionValue(0), { stiffness: 55, damping: 20 });
  const move = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section onPointerMove={move} className="detour-clean-hero">
      <div className="detour-clean-world" aria-hidden="true">
        <div className="detour-clean-sun" />
        <Cloud className="detour-clean-cloud-a" />
        <Cloud className="detour-clean-cloud-b" />
        <div className="detour-clean-island detour-clean-island-left" />
        <div className="detour-clean-island detour-clean-island-right" />
        <div className="detour-clean-water" />
        <div className="detour-clean-wave wave-a" />
        <div className="detour-clean-wave wave-b" />
        <div className="detour-clean-wave wave-c" />
      </div>

      <Layer mx={mx} my={my} k={5} className="detour-clean-floaters">
        {floaters.map((p, i) => <span key={i} style={{ left: `${p.x}%`, top: `${p.y}%`, color: p.c, fontSize: p.sz, '--r': `${p.r}deg` }}>{p.g}</span>)}
      </Layer>

      <Layer mx={mx} my={my} k={9} className="detour-clean-decor">
        <div className="detour-mini-card detour-mini-word">
          <div className="mini-label">TODAY</div>
          <div className="mini-word-row"><b>W</b><b>O</b><b className="muted">R</b><b>D</b><b className="gold">?</b></div>
        </div>
        <div className="detour-mini-card detour-mini-grid">
          <div className="mini-label">QUICK PUZZLE</div>
          <div className="mini-grid">{[1,0,3,0,7,0,0,9,2].map((n,i)=><span key={i}>{n || ''}</span>)}</div>
        </div>
        <div className="detour-mini-card detour-mini-chess">
          <div className="mini-label">MAKE A MOVE</div>
          <div className="mini-chess">♞</div>
        </div>
        <div className="detour-mini-badge detour-badge-left">◆ NEW PUZZLE</div>
        <div className="detour-mini-badge detour-badge-right">✦ 56 GAMES</div>
      </Layer>

      <div className="detour-clean-content">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="detour-clean-title"
        >
          DETOUR
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.5 }}
          className="detour-clean-tagline"
        >
          FIND SOMETHING WORTH PLAYING.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.5 }}
          className="detour-clean-actions"
        >
          <Link to="/games" className="detour-clean-primary">EXPLORE GAMES</Link>
          <button onClick={surprise} className="detour-clean-secondary"><Shuffle size={16} /> SURPRISE ME</button>
        </motion.div>
      </div>

      <div className="detour-clean-scroll" aria-hidden="true">↓ SCROLL TO EXPLORE</div>
    </section>
  );
}
