import { Bomb, Check, Flag, MapPin, Play, Puzzle, X } from 'lucide-react';

// Mini HTML/CSS/SVG compositions per game mechanic. Deterministic per game id; hover animates via `group-hover`.
const hash = (t) => [...t].reduce((a, c) => (Math.imul(a, 31) + c.charCodeAt(0)) >>> 0, 7);
const rnd = (s, i) => (Math.imul(s + i * 374761393, 2654435761) >>> 0) % 1000 / 1000;
const pick = (a, s, o = 0) => a[(s + o * 7) % a.length];
const Fill = ({ children, className = '' }) => <div className={`flex h-full w-full items-center justify-center ${className}`}>{children}</div>;
const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function Wordle({ s }) {
  const w = pick(['WORDS', 'CRANE', 'PIZZA', 'GHOST', 'LUCKY', 'BRAIN', 'SMART', 'QUEST', 'PLUMB'], s);
  const col = { g: '#538d4e', y: '#b59f3b', x: '#3a3a4c' };
  return (
    <Fill className="flex-col gap-1.5">
      {[0, 1, 2].map((r) => (
        <div key={r} className="flex gap-1.5">
          {[...w].map((l, i) => (
            <span key={i} style={r === 0 ? { background: col['gyx'[Math.floor(rnd(s, i) * 3)]], transitionDelay: `${i * 70}ms` } : undefined}
              className={`grid h-8 w-8 place-items-center rounded font-display text-base font-bold text-white transition duration-500 ${r === 0 ? 'group-hover:[transform:rotateX(360deg)]' : 'border-2 border-white/15'}`}>{r === 0 ? l : r === 1 && i === 0 ? '?' : ''}</span>
          ))}
        </div>
      ))}
    </Fill>
  );
}
const SETS = [['APPLE', 'MARS', 'BASS', 'BLUE'], ['PLUM', 'KIWI', 'LIME', 'PEAR'], ['DRUM', 'HORN', 'LUTE', 'OBOE'], ['RED', 'TEAL', 'GOLD', 'PINK']];
function Conn({ s }) {
  return (
    <div className="grid h-full grid-cols-4 content-center gap-1 px-5">
      {[0, 1, 2, 3].flatMap((r) => SETS[(s + r) % 4].map((w) => (
        <span key={r + w} style={r === 0 ? { background: '#f9df6d', color: '#222' } : undefined}
          className={`grid h-7 place-items-center rounded text-[9px] font-bold transition duration-300 ${r === 0 ? '' : 'bg-white/12'} ${r === 1 ? 'group-hover:bg-[#a0c35a] group-hover:text-black' : ''}`}>{w}</span>
      )))}
    </div>
  );
}
function Sudoku({ s, g }) {
  const sh = s % 3;
  return (
    <Fill>
      <div className="grid grid-cols-9 border-2 border-white/40">
        {Array.from({ length: 81 }, (_, i) => {
          const r = Math.floor(i / 9), c = i % 9, v = ((r * 3 + Math.floor(r / 3) + c + sh) % 9) + 1, hi = r === 4 && c === 4;
          return <span key={i} style={hi ? { background: g.accent } : undefined}
            className={`grid h-[13px] w-[13px] place-items-center text-[8px] font-bold ${c % 3 === 2 && c < 8 ? 'border-r-2 border-r-white/40' : 'border-r border-r-white/10'} ${r % 3 === 2 && r < 8 ? 'border-b-2 border-b-white/40' : 'border-b border-b-white/10'}`}>
            {hi ? <span className="opacity-0 transition group-hover:opacity-100">{v}</span> : rnd(s, i) > 0.62 ? v : ''}</span>;
        })}
      </div>
    </Fill>
  );
}
function Crossword({ s, g }) {
  return (
    <Fill>
      <div className="grid grid-cols-7 gap-px bg-white/30 p-px">
        {Array.from({ length: 49 }, (_, i) => {
          const k = Math.min(i, 48 - i), r = Math.floor(i / 7), black = k !== 24 && rnd(s, k) > 0.7, row = r === 3, row2 = r === 1;
          return <span key={i} style={row && !black ? { background: g.accent } : undefined}
            className={`relative h-[15px] w-[15px] ${black ? 'bg-black' : 'bg-white/90'} ${row2 && !black ? 'transition duration-300 group-hover:bg-amber-200' : ''}`}>
            {!black && i % 5 === 0 && <span className="absolute left-px top-0 text-[5px] font-bold text-black">{(i % 9) + 1}</span>}</span>;
        })}
      </div>
    </Fill>
  );
}
function Cryptic({ s }) {
  const clue = pick(['Stirred pot, mostly hot, for a snack (5)', 'Odd tea set rearranged for a fine view (6)', 'Lost ring found in a tidy plan (5)'], s);
  return (
    <Fill className="flex-col gap-2">
      <div className="w-[190px] -rotate-2 rounded-sm bg-[#f3ead3] p-2.5 font-serif text-[10px] leading-snug text-[#222] shadow-lg transition group-hover:rotate-0"><b>1 Across</b> {clue}</div>
      <div className="flex">{Array.from({ length: 5 }, (_, i) => <span key={i} className={`h-5 w-5 border border-black/60 ${i === 2 ? 'bg-amber-300' : 'bg-white/90'}`} />)}</div>
    </Fill>
  );
}
function Nerdle({ s }) {
  const eq = pick(['7*6=42', '9+8=17', '5*5=25', '48/6=8', '12-7=5'], s).replace('*', '×').replace('/', '÷');
  const c = ['#1f8a70', '#a455d6', '#2a2a3a'];
  return (
    <Fill className="flex-col gap-2">
      <div className="flex gap-1">{[...eq].map((ch, i) => <span key={i} style={{ background: c[Math.floor(rnd(s, i) * 3)] }} className="grid h-8 w-7 place-items-center rounded-md font-mono text-sm font-bold text-white shadow group-hover:-translate-y-0.5">{ch}</span>)}</div>
      <div className="grid grid-cols-4 gap-1">{['7', '8', '9', '+', '4', '5', '6', '−'].map((k) => <span key={k} className="grid h-4 w-7 place-items-center rounded bg-white/10 font-mono text-[9px]">{k}</span>)}</div>
    </Fill>
  );
}
function Globe({ s, g }) {
  const glow = g.id === 'globle';
  const pts = Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2, r = 11 + rnd(s, i) * 13; return `${60 + Math.cos(a) * r},${60 + Math.sin(a) * r}`; }).join(' ');
  return (
    <Fill>
      <div className="relative h-32 w-32">
        <svg viewBox="0 0 120 120" className="h-full w-full">
          <defs><radialGradient id={`gl${glow}`} cx=".35" cy=".3"><stop offset="0" stopColor={glow ? '#24306a' : '#3b82c4'} /><stop offset="1" stopColor={glow ? '#070a1f' : '#0e2a5c'} /></radialGradient></defs>
          <circle cx="60" cy="60" r="54" fill={`url(#gl${glow})`} stroke="rgba(255,255,255,.3)" />
          {[18, 36].map((rx) => <ellipse key={rx} cx="60" cy="60" rx={rx} ry="54" fill="none" stroke="rgba(255,255,255,.16)" />)}
          {[-30, 0, 30].map((y) => <ellipse key={y} cx="60" cy={60 + y} rx={Math.sqrt(54 * 54 - y * y)} ry="6" fill="none" stroke="rgba(255,255,255,.16)" />)}
          <polygon points={pts} fill={glow ? '#ff9f43' : '#f4f4f4'} style={glow ? { filter: 'drop-shadow(0 0 7px #ff9f43)' } : undefined} />
        </svg>
        <span className="absolute left-1/2 top-1/2 -ml-2 -mt-5"><span className="absolute inset-0 rounded-full bg-pink-400/50 group-hover:animate-ping" /><MapPin className="relative text-pink-400" size={20} fill="currentColor" /></span>
        <span className="absolute -right-9 bottom-1 rounded-full bg-black/60 px-2 py-0.5 font-mono text-[9px] text-cyan-200">{1000 + Math.floor(rnd(s, 3) * 8000)} km</span>
      </div>
    </Fill>
  );
}
const LOC = ['35.68°N 139.69°E', '48.85°N 2.35°E', '33.86°S 151.2°E', '40.71°N 74.0°W', '28.61°N 77.2°E'];
function MapV({ s }) {
  return (
    <Fill>
      <div className="relative h-28 w-52 overflow-hidden rounded-xl border border-white/15" style={{ backgroundColor: 'rgba(59,130,196,.2)', backgroundImage: 'repeating-linear-gradient(0deg,rgba(255,255,255,.1) 0 1px,transparent 1px 18px),repeating-linear-gradient(90deg,rgba(255,255,255,.1) 0 1px,transparent 1px 18px)' }}>
        <svg viewBox="0 0 208 112" className="absolute inset-0"><path d="M10 90 Q70 10 120 60 T198 30" stroke="rgba(255,255,255,.5)" strokeDasharray="4 4" fill="none" /></svg>
        <span className="absolute" style={{ left: `${20 + rnd(s, 1) * 55}%`, top: `${35 + rnd(s, 2) * 35}%` }}><span className="absolute -inset-2 rounded-full bg-cyan-400/40 group-hover:animate-ping" /><MapPin className="relative -translate-y-1/2 text-pink-400" size={22} fill="currentColor" /></span>
        <span className="absolute bottom-1 left-2 font-mono text-[9px] text-white/75">{pick(LOC, s)}</span>
      </div>
    </Fill>
  );
}
const POS = [
  { st: [[7, 6, '♚', 1], [6, 5, '♟', 1], [6, 6, '♟', 1], [0, 4, '♚', 0], [1, 5, '♟', 0]], mv: [5, 2, -2, 1, '♞'] },
  { st: [[7, 4, '♚', 1], [4, 4, '♜', 1], [0, 6, '♚', 0], [1, 6, '♟', 0], [1, 7, '♟', 0]], mv: [6, 1, -5, 0, '♛'] },
  { st: [[7, 7, '♚', 1], [5, 5, '♝', 1], [0, 3, '♚', 0], [2, 2, '♞', 0], [1, 3, '♟', 0]], mv: [6, 0, 0, 5, '♜'] },
];
function Chess({ s }) {
  const p = POS[s % 3], [r, c, dr, dc, gl] = p.mv;
  const pc = (row, col, ch, white, extra = {}, cls = '') => (
    <span key={`${row}${col}${ch}`} className={`absolute grid h-[12.5%] w-[12.5%] place-items-center text-[15px] leading-none ${cls}`} style={{ left: `${col * 12.5}%`, top: `${row * 12.5}%`, color: white ? '#fff' : '#111', textShadow: white ? '0 0 2px #000' : '0 0 2px #fff', ...extra }}>{ch}</span>
  );
  return (
    <Fill>
      <div className="relative h-32 w-32 overflow-hidden rounded-md border border-white/30" style={{ background: 'conic-gradient(#e8d9b5 25%,#7b61a8 0 50%,#e8d9b5 0 75%,#7b61a8 0) 0 0/25% 25%' }}>
        {[[r, c], [r + dr, c + dc]].map(([a, b], i) => <span key={i} className="absolute h-[12.5%] w-[12.5%] bg-yellow-300/60" style={{ left: `${b * 12.5}%`, top: `${a * 12.5}%` }} />)}
        {p.st.map(([a, b, ch, w]) => pc(a, b, ch, w))}
        {pc(r, c, gl, 1, { '--mv': `translate(${dc * 100}%,${dr * 100}%)` }, 'transition duration-500 group-hover:[transform:var(--mv)]')}
      </div>
    </Fill>
  );
}
const T48 = { 2: '#eee4da', 4: '#ede0c8', 8: '#f2b179', 16: '#f59563', 32: '#f67c5f', 64: '#f65e3b', 128: '#edcf72' };
function Tiles({ s }) {
  const v = [0, 2, 4, 8, 16, 32, 64, 128];
  return (
    <Fill>
      <div className="grid grid-cols-4 gap-1 rounded-lg bg-white/10 p-1.5">
        {Array.from({ length: 16 }, (_, i) => { const n = i === 5 ? 0 : v[Math.floor(rnd(s, i) * 8)]; return (
          <span key={i} style={n ? { background: T48[n], color: n < 8 ? '#776e65' : '#fff' } : undefined} className={`relative grid h-[26px] w-[26px] place-items-center rounded text-[11px] font-bold ${n ? '' : 'bg-white/10'}`}>
            {n || (i === 5 && <span className="grid h-full w-full scale-0 place-items-center rounded bg-[#eee4da] text-[#776e65] transition group-hover:scale-100">2</span>)}</span>); })}
      </div>
    </Fill>
  );
}
function Mines({ s }) {
  const flag = s % 35, bomb = (s >> 3) % 35;
  return (
    <Fill>
      <div className="grid grid-cols-7 gap-0.5">
        {Array.from({ length: 35 }, (_, i) => { const r = rnd(s, i), num = r > 0.4 ? Math.floor(r * 4) : 0;
          const base = 'grid h-[19px] w-[19px] place-items-center rounded-sm text-[10px] font-bold';
          if (i === flag) return <span key={i} className={`${base} bg-white/25`}><Flag size={11} className="text-red-400" fill="currentColor" /></span>;
          if (i === bomb) return <span key={i} className={`${base} bg-white/25 transition group-hover:bg-red-500/60`}><Bomb size={11} className="opacity-0 group-hover:opacity-100" /></span>;
          return <span key={i} className={`${base} ${num ? 'bg-white/8 ' + ['', 'text-blue-300', 'text-green-300', 'text-red-300'][num] : 'bg-white/25'}`}>{num || ''}</span>; })}
      </div>
    </Fill>
  );
}
function WS({ s, g }) {
  const word = g.name.replace(/[^a-z]/gi, '').toUpperCase().slice(0, 6), row = 1 + (s % 5);
  return (
    <Fill>
      <div className="grid grid-cols-7 gap-px font-mono text-[11px] font-bold">
        {Array.from({ length: 49 }, (_, i) => { const r = Math.floor(i / 7), c = i % 7, hit = r === row && c < word.length;
          return <span key={i} style={hit ? { background: g.accent, color: '#0b0a1f' } : undefined} className={`grid h-[17px] w-[17px] place-items-center rounded-sm ${hit ? 'transition group-hover:scale-110' : 'text-white/60'}`}>{hit ? word[c] : ALPHA[Math.floor(rnd(s, i) * 26)]}</span>; })}
      </div>
    </Fill>
  );
}
function Hive({ s }) {
  const L = pick(['PLANETS', 'RAINBOW', 'GARDENS', 'MUSICAL'], s);
  const hex = { clipPath: 'polygon(25% 5%,75% 5%,100% 50%,75% 95%,25% 95%,0 50%)' };
  return (
    <Fill>
      <div className="relative h-32 w-32">
        {[...L].map((l, i) => { const a = (i - 1) * (Math.PI / 3), x = i ? Math.cos(a) * 33 : 0, y = i ? Math.sin(a) * 33 : 0;
          return <span key={i} style={{ ...hex, left: `calc(50% + ${x}px - 16px)`, top: `calc(50% + ${y}px - 16px)`, background: i ? 'rgba(255,255,255,.18)' : '#f2c230', color: i ? '#fff' : '#111' }} className="absolute grid h-8 w-8 place-items-center font-display text-sm font-bold transition group-hover:scale-110">{l}</span>; })}
      </div>
    </Fill>
  );
}
function Box({ s }) {
  const L = pick(['TRACEBOXLINK', 'PLANETSWORDS'], s);
  return (
    <Fill>
      <svg viewBox="0 0 120 120" className="h-32 w-32">
        <rect x="24" y="24" width="72" height="72" rx="4" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.5)" strokeWidth="2" />
        <polyline points="36,24 84,96 24,60 96,36" fill="none" strokeWidth="2" className="stroke-yellow-300/70 transition group-hover:stroke-yellow-200" strokeDasharray="6 4" />
        {Array.from({ length: 12 }, (_, i) => { const side = Math.floor(i / 3), k = (i % 3) * 24 + 36 - 12 + 12; const pos = [[k, 24], [96, k], [120 - k, 96], [24, 120 - k]][side];
          return <g key={i}><circle cx={pos[0]} cy={pos[1]} r="7" fill="#0b0a1f" stroke="rgba(255,255,255,.6)" /><text x={pos[0]} y={pos[1] + 3} fontSize="8" fill="#fff" textAnchor="middle" fontWeight="700">{L[i]}</text></g>; })}
      </svg>
    </Fill>
  );
}
function Similar({ s }) {
  const W = pick([['planet', 'orbit', 'comet', 'star'], ['apple', 'pear', 'plum', 'fig'], ['river', 'lake', 'creek', 'stone']], s), w = [100, 76, 52, 28], n = [1, 12, 340, 2051];
  return (
    <Fill className="flex-col gap-1.5 px-6">
      {W.map((x, i) => <div key={x} className="relative flex h-6 w-full items-center overflow-hidden rounded bg-white/10 px-2 text-[10px] font-bold"><span className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-400/70 to-cyan-400/40 transition-all duration-500" style={{ width: `${w[i]}%` }} /><span className="relative flex-1">{x}</span><span className="relative font-mono">{n[i]}</span></div>)}
    </Fill>
  );
}
function Movie({ g }) {
  return (
    <Fill>
      <div className="relative h-28 w-48 overflow-hidden rounded-md border border-white/25 shadow-xl" style={{ background: `linear-gradient(135deg,${g.accent}99,#0b0a1f)` }}>
        <span className="absolute inset-x-0 top-0 h-4 bg-black" style={{ backgroundImage: 'repeating-linear-gradient(90deg,rgba(255,255,255,.7) 0 6px,transparent 6px 14px)', backgroundSize: '100% 4px', backgroundRepeat: 'no-repeat', backgroundPosition: '0 6px' }} />
        <span className="absolute inset-x-0 bottom-0 h-4 bg-black" />
        <span className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-black transition group-hover:scale-125"><Play size={18} fill="currentColor" /></span>
        <span className="absolute bottom-0.5 left-2 font-mono text-[8px] tracking-widest text-white">FILM</span>
        <span className="absolute right-2 top-5 font-display text-xl font-bold text-white/90">? </span>
      </div>
    </Fill>
  );
}
function Music({ g, s }) {
  return (
    <Fill className="gap-3">
      <div className="relative grid h-20 w-20 place-items-center rounded-xl text-3xl shadow-xl" style={{ background: `linear-gradient(135deg,${g.accent},#1b1440)` }}>♪<span className="absolute bottom-1 right-1.5 text-sm">♪</span></div>
      <div className="flex h-16 items-center gap-[3px]">{Array.from({ length: 12 }, (_, i) => <span key={i} className="bar w-1 rounded-full bg-pink-300" style={{ height: 14 + rnd(s, i) * 40, animationDelay: `${i * 70}ms` }} />)}</div>
    </Fill>
  );
}
function Nono({ s, g }) {
  return (
    <Fill>
      <div className="grid grid-cols-6 gap-0.5 text-[9px] font-bold text-white/70">
        {Array.from({ length: 36 }, (_, i) => { const r = Math.floor(i / 6), c = i % 6;
          if (!r && !c) return <span key={i} />;
          if (!r || !c) return <span key={i} className="grid h-5 w-5 place-items-center">{1 + Math.floor(rnd(s, i) * 3)}</span>;
          return <span key={i} style={rnd(s, i) > 0.45 ? { background: g.accent } : undefined} className={`h-5 w-5 rounded-sm transition ${rnd(s, i) > 0.45 ? 'group-hover:brightness-125' : 'bg-white/10'}`} />; })}
      </div>
    </Fill>
  );
}
function Nodes({ s }) {
  const N = Array.from({ length: 7 }, (_, i) => [20 + (i / 6) * 160 + (rnd(s, i) - 0.5) * 24, 20 + rnd(s, i + 9) * 70]);
  return (
    <Fill>
      <svg viewBox="0 0 200 110" className="h-28 w-52">
        {N.slice(1).map((p, i) => <line key={i} x1={N[i][0]} y1={N[i][1]} x2={p[0]} y2={p[1]} strokeWidth="2" className="stroke-white/25 transition group-hover:stroke-cyan-300" />)}
        <line x1={N[0][0]} y1={N[0][1]} x2={N[3][0]} y2={N[3][1]} strokeDasharray="3 4" className="stroke-white/20" />
        {N.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r={i % 3 ? 5 : 8} className={i % 3 ? 'fill-white/80' : 'fill-pink-400'} />)}
      </svg>
    </Fill>
  );
}
function NumGrid({ g, s }) {
  const bin = g.id === 'binairo', n = bin ? 6 : 4;
  return (
    <Fill>
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${n},1fr)` }}>
        {Array.from({ length: n * n }, (_, i) => { const v = bin ? String(Math.floor(rnd(s, i) * 2)) : String(1 + Math.floor(rnd(s, i) * 4)), show = rnd(s, i + 50) > 0.4;
          return <span key={i} className={`grid h-6 w-6 place-items-center rounded font-mono text-xs font-bold ${!show ? 'bg-white/8 text-transparent' : bin ? (v === '0' ? 'bg-cyan-400/80 text-black' : 'bg-pink-400/80 text-black') : 'bg-white/20'} ${i === 5 ? 'group-hover:text-white' : ''}`}>{v}</span>; })}
      </div>
    </Fill>
  );
}
function Discs({ s }) {
  const H = Array.from({ length: 7 }, (_, c) => Math.floor(rnd(s, c) * 5) + 1);
  return (
    <Fill>
      <div className="grid grid-cols-7 gap-1 rounded-xl bg-blue-600/60 p-1.5">
        {Array.from({ length: 42 }, (_, i) => { const r = Math.floor(i / 7), c = i % 7, filled = 5 - r < H[c];
          return <span key={i} className={`h-4 w-4 rounded-full ${filled ? (rnd(s, i) > 0.5 ? 'bg-red-500' : 'bg-yellow-300') : 'bg-[#0b0a1f]'} ${i === 2 ? 'transition group-hover:bg-yellow-300' : ''}`} />; })}
      </div>
    </Fill>
  );
}
function Go({ s }) {
  return (
    <Fill>
      <svg viewBox="0 0 120 120" className="h-32 w-32 rounded-md bg-amber-700/30">
        {Array.from({ length: 7 }, (_, i) => <g key={i}><line x1="14" x2="106" y1={14 + i * 15.3} y2={14 + i * 15.3} stroke="rgba(255,255,255,.35)" /><line y1="14" y2="106" x1={14 + i * 15.3} x2={14 + i * 15.3} stroke="rgba(255,255,255,.35)" /></g>)}
        {Array.from({ length: 11 }, (_, i) => <circle key={i} cx={14 + Math.floor(rnd(s, i) * 7) * 15.3} cy={14 + Math.floor(rnd(s, i + 20) * 7) * 15.3} r="6" fill={i % 2 ? '#f5f5f5' : '#111'} stroke="rgba(255,255,255,.5)" />)}
        <circle cx="60.4" cy="60.4" r="6" className="fill-cyan-300 opacity-0 transition group-hover:opacity-100" />
      </svg>
    </Fill>
  );
}
function Quiz({ s }) {
  const ok = s % 4;
  return (
    <Fill className="flex-col gap-1.5 px-6">
      <div className="h-6 w-full rounded bg-white/15 px-2 py-1.5"><span className="block h-2 w-3/4 rounded bg-white/50" /></div>
      <div className="grid w-full grid-cols-2 gap-1.5">{['A', 'B', 'C', 'D'].map((l, i) => <span key={l} className={`rounded px-2 py-1.5 text-[10px] font-bold transition ${i === ok ? 'bg-white/10 group-hover:bg-emerald-400/40' : 'bg-white/10'}`}>{l}. <span className="inline-block h-1.5 w-8 rounded bg-white/40 align-middle" /></span>)}</div>
    </Fill>
  );
}
function Pass() {
  const rules = [[1, 'at least 5 characters'], [1, 'includes a number'], [0, 'includes today’s Wordle answer']];
  return (
    <Fill className="flex-col gap-2 px-6">
      <div className="w-full rounded border border-white/25 bg-black/30 px-2 py-1.5 font-mono text-sm tracking-widest">••••••••<span className="animate-pulse">|</span></div>
      {rules.map(([ok, t]) => <div key={t} className={`flex w-full items-center gap-1.5 text-[10px] ${ok ? 'text-emerald-300' : 'text-rose-300 transition group-hover:translate-x-1'}`}>{ok ? <Check size={11} /> : <X size={11} />}{t}</div>)}
    </Fill>
  );
}
function Balatrodle({ g, s }) {
  const jokers = ['JOKER', 'GOLDEN', 'FIBONACCI'];
  return (
    <Fill>
      <div className="relative flex gap-2">
        {jokers.map((j, i) => <div key={j} className={`relative grid h-24 w-16 place-items-center overflow-hidden rounded-xl border border-white/20 bg-gradient-to-b from-[#3b2a1f] to-[#120e17] shadow-xl transition duration-300 ${i === 1 ? 'z-10 group-hover:-translate-y-2' : 'group-hover:translate-y-1'}`} style={{ transform: `rotate(${i === 0 ? -7 : i === 2 ? 7 : 0}deg)` }}>
          <span className="text-2xl">🃏</span><span className="absolute bottom-2 text-[7px] font-black tracking-widest text-amber-200">{j}</span>
        </div>)}
        <span className="absolute -right-2 -top-3 rounded-full bg-white px-2 py-1 text-[8px] font-black text-black shadow-lg">? </span>
      </div>
    </Fill>
  );
}
function Krillion({ g, s }) {
  return (
    <Fill>
      <div className="relative h-28 w-48 overflow-hidden rounded-2xl border border-cyan-200/20 bg-gradient-to-b from-cyan-400/15 to-blue-950/70">
        <div className="absolute bottom-3 left-1/2 h-8 w-16 -translate-x-1/2 rounded-full border-2 border-cyan-200/70 bg-cyan-300/10 transition group-hover:-translate-y-2"><span className="absolute -top-4 left-1/2 h-4 w-1 -translate-x-1/2 bg-cyan-200/70" /></div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-cyan-500/15 to-transparent" />
        {[0,1,2,3].map((i) => <span key={i} className="preview-particle absolute rounded-full bg-cyan-200" style={{ width: `${2 + i}px`, height: `${2 + i}px`, left: `${18 + i*19}%`, top: `${18 + (s+i*37)%55}%`, animationDelay: `${i*.3}s` }} />)}
        <span className="absolute left-3 top-3 rounded-full bg-black/35 px-2 py-1 font-pixel text-[7px] text-cyan-100">DIVE</span>
        <span className="absolute right-3 top-3 font-mono text-[9px] text-white/60">7000m</span>
      </div>
    </Fill>
  );
}

function Weird({ g, s }) {
  return (
    <Fill>
      <div className="relative h-28 w-52">
        <span className="absolute left-2 top-2 grid h-14 w-14 -rotate-12 place-items-center rounded-full bg-yellow-300 font-display text-2xl font-bold text-black transition group-hover:rotate-12">?!</span>
        <span className="absolute right-4 top-1 h-10 w-10 rotate-12 rounded-md" style={{ background: g.accent }} />
        <span className="absolute bottom-4 right-10 h-6 w-20 -rotate-6 rounded-full bg-fuchsia-400/80 transition group-hover:rotate-3" />
        <span className="absolute bottom-1 left-6 rotate-3 font-display text-lg font-bold text-white drop-shadow" style={{ transform: `rotate(${(s % 9) - 4}deg)` }}>{g.name.slice(0, 14)}</span>
      </div>
    </Fill>
  );
}
function Generic({ g }) {
  return <Fill><Puzzle size={56} style={{ color: g.accent }} className="transition group-hover:rotate-12 group-hover:scale-110" /></Fill>;
}

const V = { balatrodle: Balatrodle, krillion: Krillion, wordle: Wordle, connections: Conn, sudoku: Sudoku, crossword: Crossword, cryptic: Cryptic, nerdle: Nerdle, globe: Globe, map: MapV, chess: Chess, tiles: Tiles, mines: Mines, wordsearch: WS, hive: Hive, box: Box, similar: Similar, movie: Movie, music: Music, nonogram: Nono, nodes: Nodes, numbers: NumGrid, discs: Discs, go: Go, quiz: Quiz, password: Pass, weird: Weird, generic: Generic };

export default function GamePreview({ game, size = 'md' }) {
  const Cmp = V[game.visualType] || Generic;
  const sc = { sm: 0.62, md: 1, lg: 1.9 }[size];
  return (
    <div className="preview-shell absolute inset-0 overflow-hidden bg-[#e9e2d4]" aria-hidden="true">
      {game.image ? (
        <img
          src={game.image}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.035]"
          onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }}
        />
      ) : null}
      <div className={`${game.image ? 'hidden ' : ''}absolute inset-0`} style={{ background: `radial-gradient(120% 100% at 20% 0%, ${game.accent}55, transparent 60%), linear-gradient(160deg,#17143a,#0c0a22)` }}>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
        <div className="preview-scan z-20" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="h-36 w-[240px] shrink-0" style={{ transform: `scale(${sc})` }}><Cmp g={game} s={hash(game.id)} /></div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10 pointer-events-none" />
    </div>
  );
}
