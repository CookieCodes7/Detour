// Run `npm run check-links` on a machine with open internet access.
// Some sites block bots (403/429); those are reported as "check", not failures.
import { games } from '../src/data/games.js';
let bad = 0;
for (const g of games) {
  try {
    const r = await fetch(g.url, { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 PuzzleVerse link checker' }, signal: AbortSignal.timeout(15000) });
    const tag = r.ok ? 'ok   ' : [401, 403, 429].includes(r.status) ? 'check' : 'FAIL ';
    if (tag === 'FAIL ') bad++;
    console.log(tag, r.status, g.name, g.url);
  } catch (e) { bad++; console.log('FAIL ', '---', g.name, g.url, e.message); }
}
console.log(bad ? `\n${bad} link(s) need attention` : '\nAll links responded');
process.exit(bad ? 1 : 0);
