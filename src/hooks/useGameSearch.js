import { useMemo } from 'react';
const stop = new Set(['min', 'mins', 'minute', 'minutes', 'games', 'game']);
export function useGameSearch(games, { query = '', filter = 'all', sort = 'popular' } = {}) {
  return useMemo(() => {
    const q = query.toLowerCase().trim();
    const maxMin = (q.match(/(\d+)\s*(?:min|minute)/) || [])[1];
    const words = q.replace(/\d+\s*(?:min\w*)?/g, ' ').split(/\s+/).filter((w) => w && !stop.has(w));
    const out = games.filter((g) => {
      if (filter !== 'all' && !g.tags.includes(filter)) return false;
      if (maxMin && g.minutes > +maxMin) return false;
      const hay = `${g.name} ${g.description} ${g.tags.join(' ')} ${g.category} ${g.difficulty} ${g.hint}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    });
    const by = {
      popular: (a, b) => b.pop - a.pop,
      az: (a, b) => a.name.localeCompare(b.name),
      newest: (a, b) => b.year - a.year,
      quickest: (a, b) => a.minutes - b.minutes,
      hardest: (a, b) => b.rank - a.rank || b.minutes - a.minutes,
    }[sort];
    return by ? [...out].sort(by) : out;
  }, [games, query, filter, sort]);
}
