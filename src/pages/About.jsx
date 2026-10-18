import { Link } from 'react-router-dom';
import { categories } from '../data/games';

const t = ['P', 'U', 'Z', 'Z', 'L', 'E'];
const col = ['#6AAA64', '#C9B458', '#787C7E', '#6AAA64', '#C9B458', '#6AAA64'];
const blocks = [
  ['What is PuzzleVerse?', 'A curated collection of interesting games and puzzles you can play in your browser. We do not make or host the games. We find good ones, explain what they are and send you to the people who built them.'],
  ['How games are chosen', 'Each game has to be playable for free in a browser, understandable in under a minute and worth coming back to. We favour original creators and official sites, and we include a few lesser-known games next to the famous ones.'],
  ['Why links go elsewhere', 'Every Play button opens the game’s own website in a new tab. That keeps scores, streaks and accounts with the creators, and means you always get the latest version. The project includes a link checker so the catalogue can be kept honest.'],
];

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-16 pt-10 md:px-6">
      <div className="flex gap-2" aria-hidden="true">
        {t.map((l, i) => <span key={i} style={{ background: col[i] }} className="grid h-14 w-14 place-items-center rounded-xl font-display text-3xl font-bold text-white shadow md:h-20 md:w-20 md:text-5xl">{l}</span>)}
      </div>
      <h1 className="mt-8 font-display text-5xl font-bold md:text-7xl">About PuzzleVerse</h1>
      <div className="mt-10 grid gap-6">
        {blocks.map(([h, p]) => (
          <section key={h} className="rounded-3xl glass p-7 shadow ring-1 ring-ink/5">
            <h2 className="font-display text-2xl font-bold">{h}</h2>
            <p className="mt-2 max-w-prose leading-relaxed text-ink/75">{p}</p>
          </section>
        ))}
        <section className="rounded-3xl glass p-7 shadow ring-1 ring-ink/5">
          <h2 className="font-display text-2xl font-bold">Categories</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {Object.entries(categories).map(([s, c]) => (
              <li key={s}><Link to={`/games/${s}`} className="flex items-center gap-3 rounded-2xl p-3 hover:bg-ink/5"><span className="h-8 w-8 rounded-lg" style={{ background: c.accent }} /><span className="font-bold">{c.label}</span></Link></li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
