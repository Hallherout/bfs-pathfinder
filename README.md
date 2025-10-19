# BFS Pathfinder 🎯

Ever wondered how pathfinding algorithms actually work? This is a fun interactive tool where you can watch the Breadth First Search (BFS) algorithm find the shortest path through a grid. Draw some walls, set your start and end points, and watch the magic happen!

![BFS Visualization](https://img.shields.io/badge/algorithm-BFS-purple) ![HTML](https://img.shields.io/badge/HTML-5-orange) ![CSS](https://img.shields.io/badge/CSS-3-blue) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)

## What's This?

A completely interactive grid where you can:
- 🖱️ Draw walls by clicking and dragging
- 🟢 Set a start point
- 🔴 Set an end point
- ▶️ Watch BFS find the shortest path in real-time
- 🎨 Customize grid size (up to 100x100!)
- ⚡ Adjust animation speed

Best part? Zero dependencies. Just open the HTML file and start playing!

## What You'll See

- 🟢 **Green cell with ▶** = Where you start
- 🔴 **Red cell with 🎯** = Where you wanna go
- ⚫ **Gray cells** = Walls (BFS can't go through these)
- 🟣 **Purple cells** = BFS exploring the grid
- 🔵 **Blue cells** = The shortest path found!

## Getting Started

### Option 1: Try it Online
**[Launch the live demo here!](https://hallherout.github.io/bfs-pathfinder/)**

### Option 2: Run it Locally

Super simple:

1. Clone or download this repo
```bash
git clone https://github.com/Hallherout/bfs-pathfinder.git
```

2. Open `index.html` in your browser

That's it! No npm install, no build process, no nothing.

## How to Use

### Step 1: Set Up Your Grid
1. Pick your grid size (default is 20x20, but go wild!)
2. Set the animation delay (lower = faster)
3. Hit "Submit"

### Step 2: Draw Your Maze
1. Click **"Set Start"** and click where you want to start
2. Click **"Set End"** and click where you want to end up
3. Click **"Draw Wall"** and drag around to create obstacles
4. Made a mistake? Use **"Erase"** to clean up

### Step 3: Watch the Magic
Hit **"Start Visualization"** and watch BFS explore the grid to find the shortest path!

Don't like what you see? Just hit **"Reset Grid"** and try again.

## What's BFS Anyway?

Breadth First Search explores a graph (or in this case, a grid) level by level. Think of it like ripples in a pond spreading outward from where you dropped a stone.

**Cool facts:**
- Always finds the shortest path (in unweighted grids)
- Explores neighbors one "layer" at a time
- Pretty efficient: O(V + E) time complexity

## Files in This Project

```
bfs-pathfinder/
├── index.html    # The main page
├── style.css     # Makes it look pretty (thanks AI!)
├── script.js     # Where the BFS magic happens
├── LICENSE       # MIT License
└── README.md     # You are here
```

## Wanna Customize?

### Make cells bigger/smaller
Open `style.css` and change:
```css
td {
    width: 25px;   /* make it bigger or smaller */
    height: 25px;
}
```

### Change colors
Also in `style.css`:
```css
td.active { background-color: #9333ea; }  /* exploration color */
td.wall { background-color: #374151; }    /* wall color */
td.path { background-color: #3b82f6; }    /* path color */
```

### Change default speed
In `script.js`:
```javascript
let delay = 20;  // milliseconds between each step
```

## Ideas for Improvements

Feel free to fork and add:
- Other algorithms (A*, Dijkstra, DFS)
- Maze generators
- Compare multiple algorithms side-by-side
- Mobile touch gestures
- Play/pause controls

## Contributing

Found a bug? Have a cool idea? PRs are welcome! Just:
1. Fork it
2. Make your changes
3. Submit a PR

No strict rules here, just keep it clean and fun!

## License

MIT License - do whatever you want with it! See the [LICENSE](LICENSE) file for details.

## Credits

Built for learning and fun by [Hallherout](https://github.com/Hallherout). CSS made prettier with some AI help because, let's be honest, I'm not a designer 😅

---

Made with ☕ and curiosity

**Enjoy watching algorithms do their thing!**