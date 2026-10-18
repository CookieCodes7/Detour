import { useCallback, useEffect, useMemo, useState } from 'react';
import { games } from '../data/games';

export const RECENT_KEY = 'puzzleverse_recently_played';
const read = () => {
  try {
    const value = JSON.parse(localStorage.getItem(RECENT_KEY));
    return Array.isArray(value) ? value.filter((x) => typeof x === 'string') : [];
  } catch { return []; }
};

export function RecentlyPlayedProvider({ children }) {
  const [ids, setIds] = useState(read);
  useEffect(() => { try { localStorage.setItem(RECENT_KEY, JSON.stringify(ids)); } catch {} }, [ids]);
  useEffect(() => {
    const h = (e) => { if (e.key === RECENT_KEY) setIds(read()); };
    window.addEventListener('storage', h);
    return () => window.removeEventListener('storage', h);
  }, []);
  const record = useCallback((id) => setIds((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 12)), []);
  const value = useMemo(() => ({ ids, games: ids.map((id) => games.find((g) => g.id === id)).filter(Boolean), record }), [ids, record]);
  return <RecentlyPlayedContext.Provider value={value}>{children}</RecentlyPlayedContext.Provider>;
}

import { createContext, useContext } from 'react';
const RecentlyPlayedContext = createContext(null);
export const useRecentlyPlayed = () => useContext(RecentlyPlayedContext);
