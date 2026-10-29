import { useMemo, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GameModal from './components/GameModal';
import SearchBar from './components/SearchBar';
import RandomGame from './components/RandomGame';
import Home from './pages/Home';
import Games from './pages/Games';
import Category from './pages/Category';
import Favorites from './pages/Favorites';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Universe from './pages/Universe';
import { UIContext } from './hooks/useUI';
import { useRecentlyPlayed } from './hooks/useRecentlyPlayed';

export default function App() {
  const [game, setGame] = useState(null);
  const [search, setSearch] = useState(false);
  const [random, setRandom] = useState(false);
  const { record } = useRecentlyPlayed();
  const loc = useLocation();

  const ui = useMemo(() => ({
    openGame: setGame,
    openSearch: () => setSearch(true),
    surprise: () => setRandom(true),
    playGame: (g) => record(g.id),
  }), [record]);

  return (
    <MotionConfig reducedMotion="user">
      <UIContext.Provider value={ui}>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
        <Navbar />
        <motion.main id="main" key={loc.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/:cat" element={<Category />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/about" element={<About />} />
            <Route path="/universe" element={<Universe />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
        <Footer />
        <GameModal game={game} onClose={() => setGame(null)} />
        <SearchBar open={search} onClose={() => setSearch(false)} onPick={(g) => { setSearch(false); setGame(g); }} />
        <RandomGame open={random} onClose={() => setRandom(false)} />
      </UIContext.Provider>
    </MotionConfig>
  );
}
