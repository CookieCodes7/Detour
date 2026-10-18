import { useEffect, useMemo, useState } from 'react';
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
import AchievementsPage from './pages/AchievementsPage';
import { UIContext } from './hooks/useUI';
import { useRecentlyPlayed } from './hooks/useRecentlyPlayed';
import { useAchievements } from './hooks/useAchievements';
import { useFavorites } from './hooks/useFavorites';

export default function App() {
  const [game, setGame] = useState(null);
  const [search, setSearch] = useState(false);
  const [random, setRandom] = useState(false);
  const { record, games: recentGames } = useRecentlyPlayed();
  const { unlock } = useAchievements();
  const { games: favoriteGames } = useFavorites();
  const loc = useLocation();

  useEffect(() => {
    if (loc.hash) setTimeout(() => document.getElementById(loc.hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 80);
    else window.scrollTo(0, 0);
  }, [loc.pathname, loc.hash]);

  useEffect(() => {
    const h = (e) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setSearch((s) => !s); } };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  useEffect(() => {
    if (recentGames.length > 0) unlock('firstPlay');
    if (recentGames.length >= 10) unlock('explorer');
    if (favoriteGames.length >= 5) unlock('favoriteFive');
    if (favoriteGames.filter((g) => g.daily).length >= 3) unlock('dailyThree');
    if (favoriteGames.some((g) => g.gem)) unlock('hiddenGem');
  }, [recentGames, favoriteGames, unlock]);

  const ui = useMemo(() => ({
    openGame: setGame,
    openSearch: () => setSearch(true),
    surprise: () => { unlock('chaos'); setRandom(true); },
    playGame: (g) => { record(g.id); unlock('firstPlay'); }
  }), [record, unlock]);
  const pick = (g) => { setSearch(false); setGame(g); };

  return (
    <MotionConfig reducedMotion="user">
      <UIContext.Provider value={ui}>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
        <Navbar />
        <motion.main id="main" key={loc.pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/:cat" element={<Category />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/about" element={<About />} />
            <Route path="/universe" element={<Universe />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
        <Footer />
        <GameModal game={game} onClose={() => setGame(null)} />
        <SearchBar open={search} onClose={() => setSearch(false)} onPick={pick} />
        <RandomGame open={random} onClose={() => setRandom(false)} />
      </UIContext.Provider>
    </MotionConfig>
  );
}
