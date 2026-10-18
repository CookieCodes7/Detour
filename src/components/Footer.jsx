import { Link } from 'react-router-dom';
import { Logo } from './Navbar';
import { useUI } from '../hooks/useUI';

const cats = [['Word', 'word'], ['Logic', 'logic'], ['Geography', 'geography'], ['Crossword', 'crosswords'], ['Strategy', 'strategy'], ['Media', 'media'], ['Weird', 'weird']];
export default function Footer() {
  const { surprise } = useUI();
  const item = 'text-white/70 hover:text-white';
  return (
    <footer className="mt-10 bg-black/40 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.5fr_1fr_1fr] md:px-6">
        <div>
          <Logo light />
          <p className="mt-6 font-display text-3xl font-bold md:text-5xl">One more puzzle won’t hurt.</p>
        </div>
        <nav aria-label="Footer">
          <h3 className="mb-3 font-display text-lg font-bold">Explore</h3>
          <ul className="space-y-2">
            <li><Link className={item} to="/games">Games</Link></li>
            <li><Link className={item} to="/universe">Puzzle Universe</Link></li>
            <li><Link className={item} to="/achievements">Achievements</Link></li>
            <li><Link className={item} to="/games?f=daily">Daily</Link></li>
            <li><Link className={item} to="/#categories">Categories</Link></li>
            <li><button className={item} onClick={surprise}>Random Game</button></li>
            <li><Link className={item} to="/about">About</Link></li>
          </ul>
        </nav>
        <nav aria-label="Categories">
          <h3 className="mb-3 font-display text-lg font-bold">Categories</h3>
          <ul className="space-y-2">{cats.map(([l, s]) => <li key={s}><Link className={item} to={`/games/${s}`}>{l}</Link></li>)}</ul>
        </nav>
      </div>
      <p className="border-t border-white/10 px-4 py-6 text-center text-sm text-white/50">PuzzleVerse links to games run by their own creators. All names belong to their owners.</p>
    </footer>
  );
}
