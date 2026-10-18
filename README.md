# DETOUR 🧩

> Your next distraction.

DETOUR is a curated playground for discovering interesting browser-based games, puzzles, daily challenges, and weird little games worth getting lost in.

Instead of searching across dozens of websites for something fun to play, DETOUR brings different types of games together in one interactive, visual hub.

---

## ✨ Features

### 🎮 Game Discovery
Browse a growing collection of:

- Word games
- Logic puzzles
- Geography games
- Crosswords
- Strategy games
- Trivia
- Daily challenges
- Weird & experimental games
- Hidden gems

Each game has its own visual preview and a direct link to play it.

### ⭐ Favorites

Save games you want to come back to later.

Favorites are stored locally in your browser using `localStorage`.

### 🔥 Daily Games

Discover games that give you a fresh challenge every day.

### 🎲 Surprise Me

Can't decide what to play?

Let DETOUR randomly choose a game for you.

### 🌌 Puzzle Universe

Explore the collection through an interactive visual map where different puzzle categories become different areas of the DETOUR universe.

### 🕹️ Interactive Game Previews

Game cards aren't just static images.

Different games have custom visual previews inspired by their actual mechanics, including:

- Word-style letter tiles
- Sudoku grids
- Chess pieces
- Crossword layouts
- Geography coordinates
- Number merging
- Card-based games
- Custom animations

### 🕐 Recently Played

DETOUR remembers the games you've recently played so you can quickly jump back into them.

### 🏆 Achievements

Unlock achievements as you explore the site.

Examples include:

- First Step
- Curious Explorer
- Bookmark Hoarder
- Daily Ritual
- Chaos Agent
- Treasure Hunter

### 🔎 Search

Search through the game collection to quickly find something specific.

### 📱 Responsive Design

Designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile

---

## 🎨 Design

DETOUR uses a dark, colorful, glassmorphism-inspired interface with:

- Neon gradients
- Pixel-style typography
- Animated backgrounds
- Floating puzzle elements
- Glass cards
- Interactive hover effects
- Framer Motion animations
- Parallax interactions

The goal is to make browsing the site feel like part of the game itself.

---

## 🧩 Games

The collection is continuously expanding.

Some examples include:

- Wordle
- Connections
- Sudoku
- Worldle
- Crossword games
- 2048
- Krillion
- Balatrodle
- Minute Cryptic
- and many more

The project is designed so new games can be added to the central game catalogue without rebuilding the entire application architecture.

---

## 🛠️ Tech Stack

### Frontend

- React
- JavaScript
- Vite
- React Router
- Tailwind CSS

### UI & Animation

- Framer Motion
- Lucide React
- CSS animations
- Glassmorphism
- Responsive CSS

### Browser Storage

- `localStorage`

Used for:

- Favorites
- Recently played games
- Achievement progress

### Deployment

Designed for deployment on platforms such as:

- Vercel
- Netlify

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── Achievements.jsx
│   ├── CategorySection.jsx
│   ├── DailyGames.jsx
│   ├── EmptyState.jsx
│   ├── FavButton.jsx
│   ├── FilterBar.jsx
│   ├── Footer.jsx
│   ├── GameCard.jsx
│   ├── GameGrid.jsx
│   ├── GameModal.jsx
│   ├── GamePreview.jsx
│   ├── Hero.jsx
│   ├── Motif.jsx
│   ├── Navbar.jsx
│   ├── Overlay.jsx
│   ├── RandomGame.jsx
│   └── SearchBar.jsx
│
├── data/
│   └── games.js
│
├── hooks/
│   ├── useAchievements.jsx
│   ├── useFavorites.jsx
│   ├── useGameSearch.js
│   ├── useRecentlyPlayed.jsx
│   └── useUI.js
│
├── pages/
│   ├── About.jsx
│   ├── AchievementsPage.jsx
│   ├── Category.jsx
│   ├── Favorites.jsx
│   ├── Games.jsx
│   ├── Home.jsx
│   ├── NotFound.jsx
│   └── Universe.jsx
│
├── App.jsx
├── index.css
└── main.jsx