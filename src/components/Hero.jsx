import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shuffle, ArrowUpRight } from "lucide-react";

const facts = [
  {
    game: "MINUTE CRYPTIC",
    text: "One tiny clue. One very angry brain.",
    className: "fact-one",
  },
  {
    game: "FERMI",
    text: "Estimate the impossible. No calculator allowed.",
    className: "fact-two",
  },
  {
    game: "METAZOOA",
    text: "Guess the animal hiding behind the clues.",
    className: "fact-three",
  },
  {
    game: "BIRDLE",
    text: "Today's mystery bird is waiting.",
    className: "fact-four",
  },
];

function PixelHorse() {
  return (
    <motion.div
      className="hero-horse"
      initial={{ x: "-20vw" }}
      animate={{ x: "110vw" }}
      transition={{
        duration: 13,
        repeat: Infinity,
        repeatDelay: 5,
        ease: "linear",
      }}
    >
      <div className="horse-dust dust-one" />
      <div className="horse-dust dust-two" />

      <svg
        className="horse-svg"
        viewBox="0 0 120 90"
        aria-hidden="true"
      >
        {/* pixel horse silhouette */}
        <path
          d="
            M18 53
            L18 39
            L27 39
            L27 28
            L37 28
            L37 18
            L51 18
            L51 11
            L67 11
            L67 17
            L78 17
            L78 27
            L91 27
            L91 36
            L101 36
            L101 48
            L94 48
            L94 57
            L87 57
            L87 77
            L78 77
            L78 59
            L65 59
            L65 76
            L56 76
            L56 58
            L42 58
            L42 72
            L33 72
            L33 56
            L24 56
            L24 62
            L15 62
            L15 53
            Z
          "
          fill="currentColor"
        />

        {/* mane */}
        <path
          d="
            M37 28
            L37 18
            L47 18
            L47 12
            L56 12
            L56 20
            L49 20
            L49 29
            Z
          "
          fill="#d26f52"
        />

        {/* eye */}
        <rect x="82" y="34" width="4" height="4" fill="#f8e9bf" />

        {/* saddle */}
        <rect x="52" y="27" width="23" height="6" fill="#d8a62f" />
        <rect x="58" y="33" width="5" height="13" fill="#d8a62f" />
      </svg>
    </motion.div>
  );
}

function FactCard({ game, text, className }) {
  return (
    <motion.div
      className={`hero-fact ${className}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35 }}
      whileHover={{
        y: -6,
        rotate: -1,
        scale: 1.025,
      }}
    >
      <div className="fact-pin" />

      <div className="fact-game">{game}</div>

      <div className="fact-text">{text}</div>

      <div className="fact-arrow">
        <ArrowUpRight size={13} strokeWidth={3} />
      </div>
    </motion.div>
  );
}

function MiniPuzzle({ type, className }) {
  return (
    <motion.div
      className={`mini-puzzle ${className}`}
      animate={{
        y: [0, -5, 0],
        rotate: [-1, 1, -1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {type === "word" && (
        <>
          <div className="mini-label">TODAY</div>
          <div className="word-row">
            <span className="green">W</span>
            <span className="green">O</span>
            <span>R</span>
            <span>D</span>
            <span className="yellow">?</span>
          </div>
        </>
      )}

      {type === "number" && (
        <>
          <div className="mini-label">QUICK PUZZLE</div>
          <div className="number-grid">
            <span>1</span>
            <span>7</span>
            <span>3</span>
            <span>8</span>
            <span className="empty">?</span>
            <span>2</span>
            <span>9</span>
            <span>4</span>
            <span>6</span>
          </div>
        </>
      )}

      {type === "horse" && (
        <>
          <div className="mini-label">MAKE A MOVE</div>
          <div className="mini-horse">♞</div>
        </>
      )}
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="detour-hero">
      {/* sky texture */}
      <div className="hero-sky" />

      {/* clouds */}
      <div className="hero-cloud cloud-one" />
      <div className="hero-cloud cloud-two" />
      <div className="hero-cloud cloud-three" />

      {/* distant mountains */}
      <div className="mountains mountains-left" />
      <div className="mountains mountains-right" />

      {/* floating puzzle symbols */}
      <div className="hero-symbol symbol-one">+</div>
      <div className="hero-symbol symbol-two">?</div>
      <div className="hero-symbol symbol-three">✦</div>
      <div className="hero-symbol symbol-four">△</div>
      <div className="hero-symbol symbol-five">○</div>

      {/* small floating puzzle cards */}
      <MiniPuzzle type="word" className="puzzle-word" />
      <MiniPuzzle type="number" className="puzzle-number" />
      <MiniPuzzle type="horse" className="puzzle-horse" />

      {/* labels */}
      <div className="hero-stamp stamp-new">✦ NEW PUZZLE</div>
      <div className="hero-stamp stamp-games">✦ 56 GAMES</div>

      {/* game facts */}
      <FactCard {...facts[0]} />
      <FactCard {...facts[1]} />
      <FactCard {...facts[2]} />
      <FactCard {...facts[3]} />

      {/* running horse */}
      <PixelHorse />

      {/* main hero */}
      <div className="hero-center">
        <motion.div
          className="detour-title-wrap"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="detour-title">DETOUR</h1>
          <div className="detour-title-shadow">DETOUR</div>
        </motion.div>

        <motion.p
          className="detour-tagline"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          FIND SOMETHING WORTH PLAYING.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <Link to="/games" className="hero-button hero-button-primary">
            EXPLORE GAMES
          </Link>

          <Link to="/random" className="hero-button hero-button-secondary">
            <Shuffle size={15} strokeWidth={3} />
            SURPRISE ME
          </Link>
        </motion.div>
      </div>

      {/* ocean */}
      <div className="hero-ocean">
        <div className="ocean-lines" />
      </div>

      <div className="hero-scroll">↓ SCROLL TO EXPLORE</div>
    </section>
  );
}