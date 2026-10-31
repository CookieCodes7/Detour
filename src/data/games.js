// Central catalogue. Add a row to `rows` and the whole UI picks it up.
// Row: [id, name, category, description, difficulty, minutes, tags, url, accent, yearLaunched, flags, dailyHint]
// flags: f = featured, d = daily, g = hidden gem
export const categories = {
  word: { label: 'Word Games', short: 'Word', accent: '#7C5CFF', blurb: 'Tiles, guesses and letters in the right order. Some are gentle. Some will make you doubt the alphabet.' },
  logic: { label: 'Logic & Number Puzzles', short: 'Logic', accent: '#22D3EE', blurb: 'Grids, digits and deduction. No guessing allowed, at least in theory.' },
  geography: { label: 'Geography & World', short: 'Geography', accent: '#3B82F6', blurb: 'Name the country, find the street, drop the pin. Atlas optional.' },
  media: { label: 'Movies, Music & Trivia', short: 'Media', accent: '#E849A9', blurb: 'Name that frame, that song, that answer.' },
  crosswords: { label: 'Crosswords', short: 'Crossword', accent: '#6D5BD0', blurb: 'From a five-minute mini to a cryptic that eats an evening.' },
  strategy: { label: 'Strategy & Board Puzzles', short: 'Strategy', accent: '#8B5CF6', blurb: 'Tactics, territory and always one move too many.' },
  weird: { label: 'Why Does This Exist?', short: 'Weird', accent: '#FF4F9A', blurb: 'Strange, brilliant and impossible to explain at dinner.' },
  gems: { label: 'Hidden Gems', short: 'Gems', accent: '#A78BFA', blurb: 'Lesser-known games worth bookmarking before everyone else finds them.' },
  science: { label: 'Science & Knowledge', short: 'Science', accent: '#14B8A6', blurb: 'Anatomy, animals, perception and curious facts turned into playable puzzles.' },
};

const N = 'https://www.nytimes.com/';
const rows = [
  ['wordle','Wordle','word','Six tries to find the hidden five-letter word. The game that started the daily craze.','Medium',5,'word guessing',N+'games/wordle/index.html','#6AAA64',2021,'fd','5 letters • 6 guesses'],
  ['connections','Connections','word','Sort sixteen words into four secret groups without running out of mistakes.','Medium',7,'word trivia',N+'games/connections','#B5A0E8',2023,'fd','Find four groups of four'],
  ['strands','Strands','word','Trace letters across a grid to uncover words tied to a hidden theme.','Medium',8,'word',N+'games/strands','#5FA8D3',2024,'d','Find the hidden theme'],
  ['spelling-bee','Spelling Bee','word','Make as many words as you can from seven letters, always using the centre one.','Medium',15,'word',N+'puzzles/spelling-bee','#F2C230',2018,'d','7 letters • 1 centre tile'],
  ['letter-boxed','Letter Boxed','word','Chain words around the sides of a box, each starting where the last one ended.','Hard',10,'word',N+'puzzles/letter-boxed','#E26A5C',2019,'d','Chain words around a box'],
  ['quordle','Quordle','word','Four Wordles at once, nine guesses to share between them.','Hard',10,'word guessing','https://www.merriam-webster.com/games/quordle','#4C8BF5',2022,'d','4 words • 9 guesses'],
  ['octordle','Octordle','word','Eight simultaneous Wordles. A test of patience and vocabulary.','Hard',20,'word guessing','https://www.octordle.com','#8E5BF5',2022,''],
  ['waffle','Waffle','word','Swap letters on a waffle-shaped grid to rebuild six intersecting words.','Medium',5,'word','https://wafflegame.net','#F4A83A',2022,'d','Swap tiles into six words'],
  ['nerdle','Nerdle','word','Wordle for maths: guess the hidden equation from numbers and operators.','Medium',6,'word numbers guessing','https://nerdlegame.com','#C74FD6',2022,'d','Guess the equation'],
  ['contexto','Contexto','word','Find the secret word by how close in meaning your guesses are.','Hard',15,'word guessing','https://contexto.me','#2FB5A6',2022,'d','Warmer or colder by meaning'],
  ['semantle','Semantle','word','Contexto’s tougher cousin: a similarity score and nothing else to go on.','Hard',20,'word guessing','https://semantle.com','#E8556D',2022,''],
  ['absurdle','Absurdle','word','An adversarial Wordle that keeps changing its answer to dodge you.','Hard',15,'word guessing','https://qntm.org/absurdle','#7A8B99',2022,'g'],
  ['squaredle','Squaredle','word','Trace paths through a letter grid to find every hidden word.','Medium',10,'word','https://squaredle.app','#3FA796',2021,'dg','Trace words in a grid'],
  ['puzzgrid','PuzzGrid','word','Connections-style grids made by the community, so every puzzle has a different voice.','Medium',8,'word trivia','https://puzzgrid.com','#FF8A5B',2021,'g'],
  ['nyt-crossword','The Crossword','crosswords','The daily American crossword, with difficulty ramping from Monday to Saturday.','Hard',30,'american daily',N+'crosswords','#6D5BD0',1942,'d','Mon easy, Sat brutal'],
  ['nyt-mini','The Mini','crosswords','A tiny crossword that fits inside a coffee break.','Easy',3,'american daily',N+'crosswords/game/mini','#F2C230',2014,'d','A crossword in 3 minutes'],
  ['guardian-cryptic','Guardian Cryptic','crosswords','Wordplay-heavy British cryptic clues. Anagrams, hidden words and plenty of groans.','Hard',30,'cryptic british daily','https://www.theguardian.com/crosswords/series/cryptic','#2C6BED',1929,'f'],
  ['guardian-quick','Guardian Quick','crosswords','A friendlier British crossword with straightforward definitions.','Easy',15,'british daily','https://www.theguardian.com/crosswords/series/quick','#2FB5A6',1929,''],
  ['new-yorker-crossword','New Yorker Crossword','crosswords','Themed grids with a dry sense of humour, published on a regular schedule.','Medium',20,'themed american','https://www.newyorker.com/puzzles-and-games-dept/crossword','#E26A5C',2018,''],
  ['sudoku','Sudoku','logic','Fill the grid so every row, column and box contains 1 to 9. Pick your own difficulty.','Medium',15,'numbers','https://sudoku.com','#4C8BF5',2005,'f'],
  ['2048','2048','logic','Slide and merge tiles until you reach 2048. Then keep going.','Easy',10,'numbers','https://play2048.co','#F4A83A',2014,''],
  ['minesweeper','Minesweeper','logic','Clear the board by deduction without clicking a mine. Online play and rankings.','Medium',10,'numbers multiplayer','https://minesweeper.online','#6B7A8F',1989,''],
  ['nonograms','Nonograms','logic','Use number clues to colour cells and reveal a hidden picture.','Medium',20,'picture','https://www.puzzle-nonograms.com','#2FB5A6',1987,''],
  ['slitherlink','Loop','logic','Draw a single closed loop using the number clues as a guide.','Medium',10,'','https://www.puzzle-loop.com','#8E5BF5',1989,''],
  ['binairo','Binairo','logic','Fill a grid with zeros and ones with no three in a row.','Medium',10,'numbers','https://www.puzzle-binairo.com','#6D5BD0',2009,''],
  ['kenken','KenKen','logic','Sudoku’s arithmetic cousin. Cages demand sums, products and differences.','Medium',15,'numbers','https://www.kenkenpuzzle.com','#E8556D',2004,''],
  ['worldle','Worldle','geography','Name the country from its silhouette, with distance and direction hints.','Medium',5,'daily','https://worldle.teuteuf.fr','#2FB5A6',2022,'d','Guess the country'],
  ['globle','Globle','geography','Spin a 3D globe and guess the mystery country. Hotter colours mean closer.','Medium',6,'daily','https://globle-game.com','#E26A5C',2022,'d','Hotter, colder, country'],
  ['geoguessr','GeoGuessr','geography','Dropped somewhere on Earth with only street views. Work out where you are.','Hard',20,'multiplayer','https://www.geoguessr.com','#5B3DF5',2013,'f'],
  ['seterra','Seterra','geography','Map quizzes for countries, capitals, rivers and flags, from beginner to expert.','Easy',10,'trivia','https://www.geoguessr.com/seterra','#4C8BF5',2007,''],
  ['geogrid','GeoGrid','geography','Fill a 3×3 grid with countries that match both row and column categories.','Medium',8,'daily trivia','https://geogridgame.com','#3FA796',2023,'g'],
  ['tradle','Tradle','geography','Guess the country from its export treemap. Trade data as a puzzle.','Hard',5,'daily trivia','https://oec.world/en/tradle','#F2C230',2022,'g'],
  ['framed','Framed','media','Guess the film from a single frame, with more frames after each miss.','Medium',5,'movies daily','https://framed.wtf','#E26A5C',2022,'fd','Guess the movie from a frame'],
  ['bandle','Bandle','media','Hear a song one instrument at a time and name it before it’s complete.','Medium',5,'music daily','https://bandle.app','#8E5BF5',2022,'dg','Build the song, part by part'],
  ['sporcle','Sporcle','media','Thousands of timed quizzes on movies, music, geography and everything else.','Easy',10,'trivia movies music','https://www.sporcle.com','#2C6BED',2007,''],
  ['balatrodle','Balatrodle','media','Guess the daily Balatro Joker from clues about its cost, ability and effects.','Medium',5,'trivia gaming daily','https://www.balatrodle.com/','#D9A441',2024,'d','Guess the Joker of the day'],
  ['krillion','Krillion','media','A daily open-answer trivia dive where rarer valid answers take you deeper.','Hard',5,'trivia daily','https://krillion.io/','#2BB7A9',2026,'d','Seven prompts • rare answers score deeper'],
  ['guess-the-game','Guess The Game','media','Identify a video game from a handful of screenshots.','Medium',5,'trivia gaming','https://guessthe.game','#F4A83A',2022,'g'],
  ['lichess-puzzles','Lichess Puzzles','strategy','Free, ad-free chess tactics tuned to your rating.','Hard',10,'chess','https://lichess.org/training','#8B5CF6',2010,'f'],
  ['chess-daily-puzzle','Daily Chess Puzzle','strategy','One fresh chess puzzle every day from Chess.com.','Medium',5,'chess daily','https://www.chess.com/daily-chess-puzzle','#6AAA64',2018,'d','One tactic a day'],
  ['puzzle-storm','Puzzle Storm','strategy','Solve as many chess puzzles as possible before the clock runs out.','Hard',3,'chess quick','https://lichess.org/storm','#E8556D',2020,''],
  ['online-go','Online Go','strategy','Play Go against people worldwide, with beginner tutorials and rated games.','Hard',45,'go multiplayer','https://online-go.com','#6D5BD0',2012,''],
  ['connect-four','Connect Four','strategy','The classic four-in-a-row game, playable against the computer.','Easy',5,'','https://www.mathsisfun.com/games/connect4.html','#F2C230',1974,''],
  ['hex','Hex','strategy','Connect your two sides of the board. Deceptively deep, and no draws possible.','Hard',15,'multiplayer','https://www.playhex.org','#2FB5A6',1948,''],
  ['checkers','Checkers','strategy','Online draughts against the computer or other players.','Medium',15,'multiplayer','https://www.247checkers.com','#E26A5C',1500,''],
  ['password-game','The Password Game','weird','Choose a password while the rules get more absurd with every keystroke.','Hard',15,'puzzle','https://neal.fun/password-game/','#FF4F9A',2023,'f'],
  ['absurd-trolley','Absurd Trolley Problems','weird','Moral dilemmas that go off the rails quickly.','Easy',10,'trivia','https://neal.fun/absurd-trolley-problems/','#F4A83A',2020,''],
  ['infinite-craft','Infinite Craft','weird','Combine elements to make anything. Keep going until it makes no sense.','Easy',30,'sandbox','https://neal.fun/infinite-craft/','#4C8BF5',2024,''],
  ['pointer-pointer','Pointer Pointer','weird','Move your cursor anywhere and a photo of someone pointing at it appears.','Easy',1,'quick','https://pointerpointer.com','#E8556D',2012,'g'],
  ['useless-web','The Useless Web','weird','A button that sends you to a random strange corner of the internet.','Easy',2,'quick','https://theuselessweb.com','#8E5BF5',2012,''],
  ['reaction-time','Reaction Time Test','weird','Click as fast as you can when the screen changes colour.','Easy',1,'quick','https://humanbenchmark.com/tests/reactiontime','#6AAA64',2007,''],
  ['akinator','Akinator','weird','Think of a character. The genie guesses who it is.','Easy',5,'guessing trivia','https://en.akinator.com','#5B3DF5',2007,''],
  ['little-alchemy-2','Little Alchemy 2','weird','Start with four elements and combine your way to hundreds of discoveries.','Easy',30,'sandbox','https://littlealchemy2.com','#2FB5A6',2017,''],
  ['cookie-clicker','Cookie Clicker','weird','Click a cookie. Buy grandmas. Lose a weekend.','Easy',60,'idle','https://orteil.dashnet.org/cookieclicker/','#C98B4B',2013,''],
  ['wikipedia-game','The Wiki Game','weird','Race from one Wikipedia article to another using only links.','Medium',5,'trivia multiplayer','https://www.thewikigame.com','#6D5BD0',2010,'g'],
  ['wikispeedruns','Wikispeedruns','weird','Wikipedia link races with daily prompts and leaderboards.','Medium',5,'trivia daily','https://www.wikispeedruns.com','#4C8BF5',2021,'g'],

  ['minute-cryptic','Minute Cryptic','crosswords','Solve one approachable cryptic clue a day with hints and explanations that teach you how the wordplay works.','Hard',3,'cryptic daily word','https://www.minutecryptic.com/','#F3C969',2024,'d','One cryptic clue • hints if you need them'],
  ['wonderhop','Wonderhop','media','A daily survey-style game where you try to give the most common, rarest, oldest or newest answer.','Medium',5,'trivia daily survey','https://wonderhop.io/','#F59E0B',2026,'d','Four games • seven questions each'],
  ['dont-wordle','Don’t Wordle','word','Wordle in reverse: survive six guesses without accidentally landing on the hidden answer.','Hard',8,'word guessing daily','https://dontwordle.com/','#6AAA64',2022,'d','Avoid the answer'],
  ['magnitudle','Magnitudle','logic','Estimate real-world scale, size and quantities using intuition rather than exact knowledge.','Medium',8,'estimation daily numbers','https://magnitudle.com/','#2563EB',2026,'d','How good is your sense of scale?'],
  ['fermi','Fermi.gg','logic','Make three Fermi estimates a day and get scored on how close your napkin-math guess lands.','Hard',6,'estimation daily numbers','https://fermi.gg/','#14B8A6',2026,'d','Three questions • one guess each'],
  ['hidden-layer-labs','Layers','word','Solve four mini-games, unlock four words, then sort sixteen words into four hidden groups.','Hard',10,'word connections daily','https://hiddenlayerlabs.com/','#8B5CF6',2026,'d','Four mini-games • one final board'],
  ['perceptle','Perceptle','science','Five quick perception tests: count, track, angle, tempo and split.','Medium',5,'perception daily reaction','https://perceptle.net/','#0EA5E9',2026,'d','Five tests • one score'],
  ['clueffy','Clueffy Game','media','Answer open questions with unusual answers and earn more points when fewer players thought of the same thing.','Medium',5,'trivia daily rare answers','https://clueffy.games/','#F97316',2026,'d','Rare answers score higher'],
  ['jeff-goldblumble','Jeff Goldblumle','media','A ridiculous 12-letter daily word game where JEFFGOLDBLUM is the answer most of the time.','Easy',3,'word trivia daily','https://jeffgoldblumle.org/','#F4C430',2026,'d','12 letters • 3 attempts'],
  ['poople','Poople','word','Turn the starting four-letter word into POOP one letter at a time in as few steps as possible.','Medium',3,'word ladder daily','https://poople.io/','#111827',2026,'d','Change one letter at a time'],
  ['angledle','Angledle','logic','Guess the mystery angle from 1° to 359° in six tries using hot, warm and cold feedback.','Medium',4,'estimation daily geometry','https://angledle.com/','#0EA5E9',2026,'d','Find the exact angle'],
  ['birdle','Birdle','science','Identify the daily bird using hints, calls and a growing set of clues.','Medium',5,'birds daily trivia','https://www.birdle.fun/','#16A34A',2026,'d','Five guesses • one bird'],
  ['chainle','Chainle','word','Find the word in the middle of clue pairs, with five daily connection rounds.','Medium',6,'word connections daily','https://chainle.io/','#14B8A6',2026,'d','Five rounds • find the link'],
  ['metazooa','Metazooa','science','Guess the mystery animal while every wrong guess reveals another branch of its taxonomy.','Hard',8,'animals daily trivia','https://metazooa.com/','#84CC16',2021,'d','20 guesses • climb the family tree'],
  ['enclose-horse','Enclose Horse','strategy','Place a limited number of fences to enclose the horse and maximize the area you capture.','Hard',5,'optimization daily strategy','https://enclose.horse/','#15803D',2026,'d','One puzzle • one shot'],
  ['musculoskelordle','Musculoskelordle','science','Guess the mystery muscle from anatomy clues including region, origin, insertion, action and innervation.','Hard',10,'anatomy daily education','https://www.musculoskelordle.net/','#DC2626',2022,'d','Name the muscle'],
];

const VT = {
  wordle:'wordle', quordle:'wordle', octordle:'wordle', absurdle:'wordle', connections:'connections', puzzgrid:'connections',
  strands:'wordsearch', waffle:'wordsearch', squaredle:'wordsearch', 'spelling-bee':'hive', 'letter-boxed':'box', nerdle:'nerdle',
  contexto:'similar', semantle:'similar', 'nyt-crossword':'crossword', 'nyt-mini':'crossword', 'guardian-quick':'crossword',
  'new-yorker-crossword':'crossword', 'guardian-cryptic':'cryptic', sudoku:'sudoku', '2048':'tiles', minesweeper:'mines',
  nonograms:'nonogram', slitherlink:'nodes', binairo:'numbers', kenken:'numbers', worldle:'globe', globle:'globe',
  geoguessr:'map', seterra:'map', geogrid:'map', tradle:'map', framed:'movie', 'guess-the-game':'movie', bandle:'music',
  sporcle:'quiz', balatrodle:'balatrodle', krillion:'krillion', 'absurd-trolley':'quiz', 'lichess-puzzles':'chess', 'chess-daily-puzzle':'chess', 'puzzle-storm':'chess',
  'online-go':'go', hex:'go', 'connect-four':'discs', checkers:'discs', 'password-game':'password', 'minute-cryptic':'cryptic', 'dont-wordle':'wordle', 'poople':'wordle', 'jeff-goldblumble':'wordle', 'chainle':'connections', 'hidden-layer-labs':'connections', 'magnitudle':'similar', 'fermi':'numbers', 'perceptle':'numbers', 'clueffy':'quiz', 'angledle':'nodes', 'birdle':'quiz', 'metazooa':'nodes', 'enclose-horse':'nodes', 'musculoskelordle':'quiz',
  'wikipedia-game':'nodes', wikispeedruns:'nodes',
};

// Static artwork / screenshots used for catalogue cards. These are fixed image URLs,
// not live website screenshots, so ads and page layouts can never distort the cards.
const IMAGE_BY_ID = {
  'minute-cryptic': 'https://static.prod.thinkygames.com/uploads/screenshots/6ee07eae-b437-4571-95bf-b68020daf27d/df069180-f3a7-4c45-88f6-eb4736f2888c-original.png',
  wonderhop: 'https://wonderhop.io/og/en.png',
  'dont-wordle': 'https://redactlegame.com/data/image/dont-wordle1.png',
  magnitudle: 'https://cdn.dlegames.org/blog/2026/07/qla1-2FErUKBupBJ3111M-pasted-image.webp',
  fermi: 'https://cdn.alldle.net/games/6d58bc283f5724441febbc412ff81e13ed96a7530a94ddce3a2f627623d8e1b9.webp',
  'hidden-layer-labs': 'https://hiddenlayerlabs.com/_next/image?q=75&url=%2Fscreenshots%2Fscreenshot1.png&w=3840',
  'jeff-goldblumble': 'https://jeffgoldblumle.org/assets/og-jeffgoldblumle.png',
  poople: 'https://media.indiedb.com/images/games/1/93/92449/poople.jpg',
  angledle: 'https://nytwordle.today/wp-content/uploads/2024/05/wtf.webp',
  birdle: 'https://cdn.alldle.net/games/3cd84da0-8c16-4a78-9c6e-a12fcb41ffa8.webp',
  metazooa: 'https://listdle.com/screenshots/metazooa.webp',
  'enclose-horse': 'https://kotaku.com/igdb/image/upload/t_720p/sc1128q.jpg',
  musculoskelordle: 'https://static.wixstatic.com/media/f30174_f68ed4caa48740f58478e3d66f552645~mv2.png/v1/fill/w_973%2Ch_504%2Cal_c/f30174_f68ed4caa48740f58478e3d66f552645~mv2.png',
};

const rank = { Easy: 1, Medium: 2, Hard: 3 };
export const games = rows.map((r, i) => {
  const [id, name, category, description, difficulty, minutes, tags, url, accent, year, flags = '', hint = ''] = r;
  const t = new Set(tags.split(' ').filter(Boolean));
  t.add(category === 'crosswords' ? 'crossword' : category);
  if (flags.includes('d')) t.add('daily');
  if (flags.includes('g')) t.add('gem');
  return { id, name, category, description, difficulty, minutes, duration: `${minutes} min`, tags: [...t], url, accent, year,
    featured: flags.includes('f'), daily: flags.includes('d'), gem: flags.includes('g'), hint, image: IMAGE_BY_ID[id] || null, visualType: VT[id] || (category === 'weird' ? 'weird' : 'generic'), pop: rows.length - i, rank: rank[difficulty] };
});

export const filters = [
  ['all','All'],['word','Word'],['logic','Logic'],['numbers','Numbers'],['geography','Geography'],['movies','Movies'],['music','Music'],
  ['crossword','Crossword'],['strategy','Strategy'],['trivia','Trivia'],['science','Science'],['daily','Daily'],['weird','Weird'],['multiplayer','Multiplayer'],
];
export const sorts = [['popular','Popular'],['az','A–Z'],['newest','Newest'],['quickest','Quickest'],['hardest','Hardest']];
export const host = (url) => new URL(url).hostname.replace(/^www\./, '');
