import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { games } from '../data/games';

export const FAV_KEY = 'puzzleverse_favorites';
const FavContext = createContext(null);
const read = () => {
  try { const v = JSON.parse(localStorage.getItem(FAV_KEY)); return Array.isArray(v) ? v.filter((x) => typeof x === 'string') : []; } catch { return []; }
};

export function FavoritesProvider({ children }) {
  const [ids, setIds] = useState(read);
  useEffect(() => { try { localStorage.setItem(FAV_KEY, JSON.stringify(ids)); } catch { /* storage unavailable */ } }, [ids]);
  useEffect(() => { // keep other tabs in sync
    const h = (e) => { if (e.key === FAV_KEY) setIds(read()); };
    window.addEventListener('storage', h);
    return () => window.removeEventListener('storage', h);
  }, []);
  const toggle = useCallback((id) => setIds((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id])), []);
  const value = useMemo(() => {
    const favGames = ids.map((id) => games.find((g) => g.id === id)).filter(Boolean);
    return { ids, games: favGames, count: favGames.length, has: (id) => ids.includes(id), toggle };
  }, [ids, toggle]);
  return <FavContext.Provider value={value}>{children}</FavContext.Provider>;
}
export const useFavorites = () => useContext(FavContext);
