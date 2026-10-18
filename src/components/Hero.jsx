import { Link } from 'react-router-dom';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Bell, Flame, MapPin, Shuffle } from 'lucide-react';
import { useUI } from '../hooks/useUI';

const rnd = (i) =>
  (Math.imul(i + 7, 2654435761) >>> 0) % 1000 / 1000;

const GL = [
  '♞',
  '7',
  'W',
  '■',
  '●',
  '▲',
  '?',
  '+',
  '✦',
  'A',
  '9',
  '◆',
  '♟',
  'Q',
  '3',
  '#',
  '✦',
  'R',
  '5',
  '○',
];

const COL = [
  '#7C5CFF',
  '#22D3EE',
  '#E849A9',
  '#A3E635',
  '#FB923C',
];

const floaters = GL.map((g, i) => ({
  g,
  x: rnd(i) * 96,
  y: rnd(i + 40) * 92,
  sz: 14 + rnd(i + 80) * 26,
  cls: ['f1', 'f2', 'f3'][i % 3],
  d: 10 + rnd(i + 3) * 14,
  dl: -rnd(i + 9) * 10,
  c: COL[i % 5],
  r: Math.round((rnd(i + 5) - 0.5) * 50),
}));

function Layer({ mx, my, k, className = '', children }) {
  const x = useTransform(mx, (v) => v * k);
  const y = useTransform(my, (v) => v * k);

  return (
    <motion.div style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}

const Tile = ({ c, children }) => (
  <span
    style={{ background: c }}
    className="grid h-7 w-7 place-items-center rounded font-pixel text-[9px] text-white"
  >
    {children}
  </span>
);

const cards = [
  {
    cls: 'left-2 top-2 lg:left-[3%] lg:top-[10%]',
    glow: '#538d4e',
    tip: 'Wordle · 5 letters',
    node: (
      <div className="flex gap-1">
        <Tile c="#538d4e">W</Tile>
        <Tile c="#b59f3b">O</Tile>
        <Tile c="#3a3a4c">R</Tile>
        <Tile c="#538d4e">D</Tile>
        <Tile c="transparent">?</Tile>
      </div>
    ),
  },
  {
    cls: 'hidden lg:block lg:left-[6%] lg:top-[48%]',
    glow: '#22D3EE',
    tip: 'Sudoku · fill 1–9',
    node: (
      <div className="grid grid-cols-3 gap-0.5">
        {[5, 3, 0, 0, 7, 0, 1, 0, 9].map((n, i) => (
          <span
            key={i}
            className="grid h-6 w-6 place-items-center rounded-sm bg-white/10 text-xs font-bold"
          >
            {n || ''}
          </span>
        ))}
      </div>
    ),
  },
  {
    cls: 'hidden lg:block lg:left-[12%] lg:top-[78%]',
    glow: '#E0475B',
    tip: 'Chess · mate in two',
    node: <span className="text-4xl">♞</span>,
  },
  {
    cls: 'hidden lg:block lg:right-[4%] lg:top-[8%]',
    glow: '#F59E42',
    tip: 'Crossword · 3 down',
    node: (
      <div className="grid grid-cols-3 gap-px bg-white/40 p-px">
        {[0, 1, 1, 1, 0, 1, 1, 1, 0].map((b, i) => (
          <span
            key={i}
            className={`h-6 w-6 ${b ? 'bg-white/90' : 'bg-black'}`}
          />
        ))}
      </div>
    ),
  },
  {
    cls: 'hidden lg:block lg:right-[7%] lg:top-[42%]',
    glow: '#3B82F6',
    tip: 'Worldle · guess the country',
    node: (
      <div className="flex items-center gap-2 text-xs font-bold">
        <MapPin
          className="text-pink-400"
          size={22}
          fill="currentColor"
        />
        <span className="font-mono">
          35.68°N
          <br />
          139.69°E
        </span>
      </div>
    ),
  },
  {
    cls: 'hidden lg:block lg:right-[14%] lg:top-[70%]',
    glow: '#FB923C',
    tip: '2048 · keep merging',
    node: (
      <div className="flex gap-1">
        {[
          ['2', '#eee4da', '#776e65'],
          ['8', '#f2b179', '#fff'],
          ['64', '#f65e3b', '#fff'],
        ].map(([n, b, c]) => (
          <span
            key={n}
            style={{ background: b, color: c }}
            className="grid h-8 w-8 place-items-center rounded font-bold"
          >
            {n}
          </span>
        ))}
      </div>
    ),
  },
  {
    cls: 'hidden lg:block lg:right-[26%] lg:top-[-2%]',
    glow: '#FB923C',
    tip: 'Keep it going',
    node: (
      <div className="flex items-center gap-2 text-sm font-bold">
        <Flame className="text-orange-400" size={20} />
        DAILY STREAK 7
      </div>
    ),
  },
  {
    cls: 'bottom-2 right-2 lg:bottom-auto lg:right-[3%] lg:top-[88%]',
    glow: '#E849A9',
    tip: 'Fresh from the daily set',
    node: (
      <div className="flex items-center gap-2 text-sm font-bold">
        <Bell className="text-pink-400" size={18} />
        NEW PUZZLE
      </div>
    ),
  },
];

export default function Hero() {
  const { surprise } = useUI();
  const reduce = useReducedMotion();

  const mx = useSpring(useMotionValue(0), {
    stiffness: 50,
    damping: 20,
  });

  const my = useSpring(useMotionValue(0), {
    stiffness: 50,
    damping: 20,
  });

  const move = (e) => {
    if (reduce) return;

    const r = e.currentTarget.getBoundingClientRect();

    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const f = reduce ? 0 : 1;

  return (
    <section
      onPointerMove={move}
      className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden px-4 py-3 md:py-4"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 -z-20 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage:
            'radial-gradient(70% 70% at 50% 40%,#000,transparent)',
        }}
      />

      {/* Floating symbols */}
      <Layer
        mx={mx}
        my={my}
        k={6 * f}
        className="absolute inset-0 -z-10"
      >
        {floaters.map((p, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`${
              p.cls
            } absolute font-display font-bold ${
              i > 8 ? 'hidden md:block' : ''
            }`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontSize: p.sz,
              color: p.c,
              opacity: 0.22,
              '--r': `${p.r}deg`,
              '--d': `${p.d}s`,
              '--dl': `${p.dl}s`,
            }}
          >
            {p.g}
          </span>
        ))}
      </Layer>

      {/* Floating puzzle cards */}
      <Layer
        mx={mx}
        my={my}
        k={22 * f}
        className="absolute inset-0"
      >
        {cards.map((c, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1, y: -4 }}
            style={{ '--g': c.glow }}
            className={`group glass absolute z-10 rounded-2xl p-3 transition-shadow hover:shadow-[0_0_34px_var(--g)] ${c.cls}`}
          >
            <div className="scale-75 lg:scale-100">
              {c.node}
            </div>

            <p className="max-h-0 overflow-hidden text-[10px] font-bold text-white/70 opacity-0 transition-all group-hover:mt-2 group-hover:max-h-6 group-hover:opacity-100">
              {c.tip}
            </p>
          </motion.div>
        ))}
      </Layer>

      {/* Main hero */}
      <Layer
        mx={mx}
        my={my}
        k={10 * f}
        className="relative z-20 mx-auto w-full max-w-4xl"
      >
        <div className="absolute -inset-10 -z-10 rounded-full bg-gradient-to-r from-grape/40 via-fuchsia-500/25 to-cyan-400/30 blur-3xl" />

        <div className="glass rounded-[2rem] px-5 py-6 text-center md:px-12 md:py-8">

          {/* DETOUR wordmark */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
            className="mb-4"
          >
            <h1
              className="font-pixel text-[2.1rem] leading-none tracking-[0.08em] text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.18)] sm:text-4xl md:text-5xl lg:text-[4rem]"
            >
              DETOUR
            </h1>

            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-orange-300 opacity-80" />
          </motion.div>

          {/* Main headline */}
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.6,
            }}
            className="font-pixel text-[1.35rem] font-bold leading-[1.35] tracking-tight sm:text-2xl md:text-4xl lg:text-[3rem]"
          >
            Find Your Next
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-orange-300 bg-clip-text text-transparent">
              Puzzle Obsession.
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.3,
              duration: 0.6,
            }}
            className="mx-auto mt-3 max-w-2xl text-xs leading-5 text-ink/70 sm:text-sm sm:leading-6 md:text-base"
          >
            Word games, logic puzzles, daily challenges and weird little
            games worth losing an hour to.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.6,
            }}
            className="mt-4 flex flex-col justify-center gap-2 sm:flex-row"
          >
            <Link
              to="/games"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-grape to-fuchsia-500 px-6 py-3 font-bold text-white shadow-[0_0_30px_rgba(109,76,255,.55)] transition hover:scale-105 hover:shadow-[0_0_44px_rgba(232,73,169,.6)] active:scale-95"
            >
              Explore Games
            </Link>

            <button
              onClick={surprise}
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-bold ring-1 ring-white/25 transition hover:bg-white/10 hover:shadow-[0_0_30px_rgba(34,211,238,.35)] active:scale-95"
            >
              <Shuffle size={18} />
              Surprise Me
            </button>
          </motion.div>
        </div>
      </Layer>
    </section>
  );
}