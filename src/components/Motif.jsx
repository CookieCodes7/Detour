import { Gem, MapPin, Film } from 'lucide-react';
const tile = ['#6AAA64', '#C9B458', '#787C7E'];
const xw = ['10110', '10001', '00100', '11001', '01101'];
const fill = 'absolute inset-0 overflow-hidden';

// Decorative art that borrows from each category's mechanic.
export default function Motif({ game }) {
  const { category: c, name, tags = [] } = game;
  const code = (i) => name.charCodeAt(i % name.length);

  if (c === 'word') {
    const L = name.replace(/[^a-z0-9]/gi, '').toUpperCase().slice(0, 5).padEnd(5, '·').split('');
    return (
      <div className={`${fill} flex items-center justify-center gap-1.5`} aria-hidden="true">
        {L.map((l, i) => (
          <span key={i} style={{ background: tile[(i * 2 + name.length) % 3], transform: `rotate(${(i % 2 ? 1 : -1) * (i + 1)}deg)` }}
            className="grid h-9 w-9 place-items-center rounded-md font-display text-lg font-bold text-white shadow-md">{l}</span>
        ))}
      </div>
    );
  }
  if (c === 'logic') {
    return (
      <div className={`${fill} grid place-items-center`} aria-hidden="true">
        <div className="grid grid-cols-3 gap-px rounded-lg bg-white/60 p-px shadow-md">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className="grid h-9 w-9 place-items-center bg-white/25 font-display text-lg font-bold text-white backdrop-blur-sm">
              {i % 3 === 1 ? '' : (i * 3 + code(i)) % 9 + 1}
            </span>
          ))}
        </div>
      </div>
    );
  }
  if (c === 'geography') {
    return (
      <div className={fill} aria-hidden="true" style={{ backgroundImage: 'repeating-linear-gradient(0deg,rgba(255,255,255,.28) 0 1px,transparent 1px 22px),repeating-linear-gradient(90deg,rgba(255,255,255,.28) 0 1px,transparent 1px 22px)' }}>
        <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full border-2 border-white/50" />
        <div className="absolute -right-2 -top-4 h-28 w-28 rounded-full border border-white/40" />
        <MapPin className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow" size={40} strokeWidth={2.5} />
        <span className="absolute bottom-1.5 left-3 font-mono text-[10px] text-white/80">{(code(0) % 60).toFixed(2)}°N {(code(1) % 120).toFixed(2)}°E</span>
      </div>
    );
  }
  if (c === 'media') {
    if (tags.includes('music')) {
      return (
        <div className={`${fill} flex items-center justify-center gap-1`} aria-hidden="true">
          {Array.from({ length: 18 }, (_, i) => (
            <span key={i} className="w-1.5 rounded-full bg-white/85" style={{ height: 10 + ((code(i) * (i + 3)) % 52) }} />
          ))}
        </div>
      );
    }
    const holes = 'repeating-linear-gradient(90deg,rgba(255,255,255,.85) 0 9px,transparent 9px 19px)';
    return (
      <div className={fill} aria-hidden="true">
        <div className="absolute inset-x-0 top-1.5 h-2" style={{ background: holes }} />
        <div className="absolute inset-x-0 bottom-1.5 h-2" style={{ background: holes }} />
        <div className="absolute inset-x-10 inset-y-6 grid place-items-center rounded-md border-2 border-white/70 bg-black/15"><Film className="text-white" size={28} /></div>
      </div>
    );
  }
  if (c === 'crosswords') {
    return (
      <div className={`${fill} grid place-items-center`} aria-hidden="true">
        <div className="grid grid-cols-5 border border-ink/80 bg-white shadow-md">
          {xw.join('').split('').map((b, i) => (
            <span key={i} className={`h-5 w-5 border border-ink/30 ${b === '1' ? 'bg-black' : ''}`} />
          ))}
        </div>
      </div>
    );
  }
  if (c === 'strategy') {
    return (
      <div className={fill} aria-hidden="true" style={{ background: 'conic-gradient(rgba(255,255,255,.2) 25%,transparent 0 50%,rgba(255,255,255,.2) 0 75%,transparent 0) 0 0/44px 44px' }}>
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-white drop-shadow-lg">{['♞', '♜', '♝', '♟'][name.length % 4]}</span>
      </div>
    );
  }
  if (c === 'gems') {
    return (
      <div className={`${fill} grid place-items-center`} aria-hidden="true">
        <Gem className="text-white drop-shadow-lg" size={52} strokeWidth={1.8} />
        <span className="absolute left-8 top-5 h-3 w-3 rotate-45 bg-white/80" />
        <span className="absolute bottom-5 right-10 h-2 w-2 rotate-45 bg-white/70" />
      </div>
    );
  }
  // weird: chaotic stickers
  return (
    <div className={fill} aria-hidden="true">
      <span className="absolute -left-2 top-3 grid h-14 w-14 -rotate-12 place-items-center rounded-full bg-sun font-display text-2xl font-bold text-ink">?!</span>
      <span className="absolute right-4 top-2 h-10 w-10 rotate-12 rounded-md bg-white/80" />
      <span className="absolute bottom-2 right-14 h-8 w-20 -rotate-6 rounded-full bg-black/80" />
      <span className="absolute bottom-3 left-1/3 rotate-6 font-display text-xl font-bold text-white drop-shadow">{name.slice(0, 10)}</span>
    </div>
  );
}
