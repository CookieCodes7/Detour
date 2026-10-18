import { useCallback, useEffect, useMemo, useState } from 'react';
import { createContext, useContext } from 'react';

export const ACH_KEY = 'puzzleverse_achievements';
const initial = { firstPlay: false, explorer: false, favoriteFive: false, dailyThree: false, chaos: false, hiddenGem: false };
const read = () => { try { return { ...initial, ...(JSON.parse(localStorage.getItem(ACH_KEY)) || {}) }; } catch { return initial; } };
const AchievementContext = createContext(null);

export function AchievementsProvider({ children }) {
  const [unlocked, setUnlocked] = useState(read);
  useEffect(() => { try { localStorage.setItem(ACH_KEY, JSON.stringify(unlocked)); } catch {} }, [unlocked]);
  const unlock = useCallback((key) => setUnlocked((p) => p[key] ? p : { ...p, [key]: true }), []);
  const value = useMemo(() => ({ unlocked, unlock, count: Object.values(unlocked).filter(Boolean).length }), [unlocked, unlock]);
  return <AchievementContext.Provider value={value}>{children}</AchievementContext.Provider>;
}
export const useAchievements = () => useContext(AchievementContext);

export const ACHIEVEMENTS = [
  { id: 'firstPlay', icon: '▶', title: 'First Step', body: 'Open your first game.' },
  { id: 'explorer', icon: '✦', title: 'Curious Explorer', body: 'Explore 10 different games.' },
  { id: 'favoriteFive', icon: '♥', title: 'Bookmark Hoarder', body: 'Save 5 games to Favorites.' },
  { id: 'dailyThree', icon: '☀', title: 'Daily Ritual', body: 'Save 3 daily games.' },
  { id: 'chaos', icon: '🎲', title: 'Chaos Agent', body: 'Use the Random Game machine.' },
  { id: 'hiddenGem', icon: '◆', title: 'Treasure Hunter', body: 'Favorite a hidden gem.' },
];
