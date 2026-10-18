import { games } from '../data/games';
export function randomGame(exclude) {
  const pool = games.length > 1 ? games.filter((g) => g.id !== exclude?.id) : games;
  return pool[Math.floor(Math.random() * pool.length)];
}
