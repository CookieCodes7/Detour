import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Menu, Puzzle, Search, Shuffle, X } from 'lucide-react';
import { useUI } from '../hooks/useUI';
import { useFavorites } from '../hooks/useFavorites';

const links = [['Home', '/'], ['Games', '/games'], ['Daily', '/games?f=daily'], ['Universe', '/universe'], ['Categories', '/#categories'], ['Favorites', '/favorites'], ['Achievements', '/achievements'], ['About', '/about']];

export function Logo({ light }) {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="Detour home">
      <span className="grid h-9 w-9 -rotate-6 place-items-center rounded-xl bg-gradient-to-br from-grape to-fuchsia-500 text-white shadow-[0_0_20px_rgba(109,76,255,.6)]"><Puzzle size={20} /></span>
      <span className={`font-pixel text-[11px] leading-relaxed tracking-[0.08em] ${light ? 'text-white' : ''}`}>Detour</span>
    </Link>
  );
}

const Count = ({ n }) => n > 0 && <span className="ml-1 rounded-full bg-pink-500 px-1.5 py-px text-[10px] font-bold text-white">{n}</span>;

export default function Navbar() {
  const { openSearch, surprise } = useUI();
  const { count } = useFavorites();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 12);
    h(); window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  const label = (l) => (l === 'Favorites' ? <><Heart size={14} className="mr-1.5 inline -mt-0.5" />{l}<Count n={count} /></> : l);
  return (
    <header className={`sticky top-0 z-50 transition ${scrolled ? 'border-b border-white/10 bg-[#0b0a1f]/70 backdrop-blur-xl' : 'border-b border-transparent'}`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6" aria-label="Main">
        <Logo />
        <div className="hidden items-center gap-0.5 lg:flex">
          {links.map(([l, to]) => (
            <NavLink key={l} to={to} end className="relative rounded-full px-3.5 py-2 text-sm font-bold text-ink/80 transition hover:text-white">
              {({ isActive }) => (<>{isActive && !/[?#]/.test(to) && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/20 shadow-[0_0_18px_rgba(109,76,255,.4)]" />}<span className="relative">{label(l)}</span></>)}
            </NavLink>
          ))}
          <button onClick={surprise} className="rounded-full px-3.5 py-2 text-sm font-bold text-ink/80 transition hover:text-white">Random Game</button>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={openSearch} aria-label="Search games (Ctrl or Cmd + K)" className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-white/15 transition hover:bg-white/10"><Search size={18} /></button>
          <Link to="/favorites" aria-label={`Favorites (${count})`} className="relative grid h-10 w-10 place-items-center rounded-full ring-1 ring-white/15 hover:bg-white/10 lg:hidden"><Heart size={18} />{count > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-pink-500 px-1.5 text-[10px] font-bold">{count}</span>}</Link>
          <button onClick={surprise} className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-grape to-fuchsia-500 px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_24px_rgba(109,76,255,.45)] transition hover:scale-105 active:scale-95 sm:inline-flex lg:hidden"><Shuffle size={16} /> Random Game</button>
          <button onClick={() => setOpen(true)} aria-label="Open menu" className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-white/15 lg:hidden"><Menu size={18} /></button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[70] bg-black/70 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.aside onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Menu" className="ml-auto flex h-full w-[85%] max-w-sm flex-col gap-1 border-l border-white/10 bg-[#0f0d28] p-6"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.25 }}>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="ml-auto grid h-10 w-10 place-items-center rounded-full ring-1 ring-white/15"><X size={18} /></button>
              {links.map(([l, to]) => <Link key={l} to={to} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 font-display text-2xl font-bold hover:bg-white/5">{label(l)}</Link>)}
              <button onClick={() => { setOpen(false); surprise(); }} className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-grape to-fuchsia-500 px-6 py-4 font-bold text-white"><Shuffle size={18} /> Random Game</button>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
