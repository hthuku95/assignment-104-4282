# Chess Game - Vanilla JavaScript

A fully functional chess game built with vanilla JavaScript, styled with Bootstrap, and playable directly in the browser. This implementation features a complete chess engine with move validation, check detection, and an intuitive drag-and-drop interface.

## Features

- ✅ Complete chess gameplay with all standard rules
- ✅ Drag and drop piece movement
- ✅ Move validation and legal move highlighting
- ✅ Check and checkmate detection
- ✅ Castling and en passant support
- ✅ Turn-based gameplay with visual indicators
- ✅ Responsive design with Bootstrap styling
- ✅ Game state management and move history
- ✅ Clean, modern user interface

## Demo

Play the game directly in your browser - no installation required! Simply open the `index.html` file in any modern web browser.

## Technologies Used

- **Vanilla JavaScript** - Core game logic and interactions
- **Bootstrap 5** - Responsive UI styling and components
- **HTML5** - Semantic markup and structure
- **CSS3** - Custom styling and animations

## Installation

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software or dependencies required

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/vanilla-js-chess.git
   cd vanilla-js-chess
   ```

2. **Open the game:**
   - Simply double-click `index.html` to open in your default browser
   - Or serve the files using a local web server for best performance

3. **Optional - Local Server Setup:**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Then open http://localhost:8000 in your browser
   ```

## Usage

### Starting a Game

1. Open the game in your browser
2. The chess board will appear with pieces in their starting positions
3. White always moves first (bottom of the board)

### Making Moves

1. **Click and Drag:** Click on a piece and drag it to your desired square
2. **Click to Select:** Click a piece to select it, then click the destination square
3. **Legal Moves:** Valid moves will be highlighted when you select a piece
4. **Turn Indicator:** The current player is displayed at the top of the board

### Special Moves

- **Castling:** Click the king and drag to the castling position
- **En Passant:** Capture will be handled automatically when conditions are met
- **Pawn Promotion:** Select the desired piece when a pawn reaches the end rank

### Game Controls

- **New Game:** Click the "New Game" button to reset the board
- **Move History:** View all moves in the sidebar panel
- **Game Status:** Check, checkmate, and stalemate are automatically detected

## File Structure

```
vanilla-js-chess/
├── index.html          # Main HTML file
├── css/
│   ├── styles.css      # Custom CSS styles
│   └── pieces.css      # Chess piece styling
├── js/
│   ├── chess.js        # Main chess engine
│   ├── board.js        # Board rendering and UI
│   ├── pieces.js       # Piece definitions and movements
│   └── game.js         # Game state management
├── assets/
│   └── pieces/         # Chess piece images
│       ├── white/      # White piece sprites
│       └── black/      # Black piece sprites
└── README.md           # This documentation
```

## Game Rules Implementation

### Piece Movements

- **Pawn:** Forward movement, diagonal capture, en passant, promotion
- **Rook:** Horizontal and vertical movement
- **Knight:** L-shaped movement pattern
- **Bishop:** Diagonal movement
- **Queen:** Combined rook and bishop movement
- **King:** One square in any direction, castling

### Special Rules

- **Check Detection:** Automatically detects when a king is in check
- **Checkmate:** Game ends when checkmate is achieved
- **Stalemate:** Draws are detected and handled
- **Castling:** Both kingside and queenside castling implemented
- **En Passant:** Special pawn capture rule supported
- **