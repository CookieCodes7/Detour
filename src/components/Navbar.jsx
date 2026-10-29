import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Menu, Search, Shuffle, X } from 'lucide-react';
import { useUI } from '../hooks/useUI';
import { useFavorites } from '../hooks/useFavorites';

const links = [['Home', '/'], ['Games', '/games'], ['Daily', '/games?f=daily'], ['Universe', '/universe'], ['Categories', '/#categories'], ['Favorites', '/favorites'], ['About', '/about']];

export function Logo() {
  return (
    <Link to="/" className="detour-nav-logo" aria-label="Detour home">
      <span className="detour-nav-mark">D</span>
      <span>DETOUR</span>
    </Link>
  );
}

const Count = ({ n }) => n > 0 && <span className="detour-nav-count">{n}</span>;

export default function Navbar() {
  const { openSearch, surprise } = useUI();
  const { count } = useFavorites();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 12);
    h();
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const label = (l) => l === 'Favorites' ? <><Heart size={13} className="mr-1 inline" />{l}<Count n={count} /></> : l;

  return (
    <header className={`detour-navbar ${scrolled ? 'detour-navbar-scrolled' : ''}`}>
      <nav className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-4 md:px-6" aria-label="Main">
        <Logo />

        <div className="hidden items-center gap-1 lg:flex">
          {links.map(([l, to]) => (
            <NavLink key={l} to={to} end className="detour-nav-link">
              {({ isActive }) => <span className={isActive && !/[?#]/.test(to) ? 'detour-nav-active' : ''}>{label(l)}</span>}
            </NavLink>
          ))}
          <button onClick={surprise} className="detour-nav-random"><Shuffle size={13} /> RANDOM</button>
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={openSearch} aria-label="Search games (Ctrl or Cmd + K)" className="detour-icon-button"><Search size={17} /></button>
          <Link to="/favorites" aria-label={`Favorites (${count})`} className="detour-icon-button lg:hidden"><Heart size={17} />{count > 0 && <span className="detour-nav-mobile-count">{count}</span>}</Link>
          <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="detour-mobile-menu" aria-label={open ? "Close menu" : "Open menu"} className="detour-icon-button lg:hidden">{open ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div className="detour-mobile-overlay lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.aside id="detour-mobile-menu" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Menu" className="detour-mobile-menu ml-auto flex h-full w-[86%] max-w-sm flex-col gap-1 p-6" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.25 }}>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="detour-icon-button ml-auto"><X size={18} /></button>
              {links.map(([l, to]) => <Link key={l} to={to} onClick={() => setOpen(false)} className="detour-mobile-link">{label(l)}</Link>)}
              <button type="button" onClick={() => { setOpen(false); surprise(); }} className="detour-nav-random mt-auto justify-center"><Shuffle size={15} /> RANDOM DETOUR</button>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
