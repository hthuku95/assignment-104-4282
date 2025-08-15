class ChessBoard {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.board = this.initializeBoard();
        this.selectedSquare = null;
        this.currentPlayer = 'white';
        this.gameOver = false;
        this.moveHistory = [];
        this.capturedPieces = { white: [], black: [] };
        
        this.pieceSymbols = {
            white: {
                king: '♔', queen: '♕', rook: '♖',
                bishop: '♗', knight: '♘', pawn: '♙'
            },
            black: {
                king: '♚', queen: '♛', rook: '♜',
                bishop: '♝', knight: '♞', pawn: '♟'
            }
        };
        
        this.render();
        this.attachEventListeners();
    }
    
    initializeBoard() {
        const board = Array(8).fill(null).map(() => Array(8).fill(null));
        
        // Place pawns
        for (let col = 0; col < 8; col++) {
            board[1][col] = { type: 'pawn', color: 'black' };
            board[6][col] = { type: 'pawn', color: 'white' };
        }
        
        // Place other pieces
        const pieceOrder = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
        
        for (let col = 0; col < 8; col++) {
            board[0][col] = { type: pieceOrder[col], color: 'black' };
            board[7][col] = { type: pieceOrder[col], color: 'white' };
        }
        
        return board;
    }
    
    render() {
        this.container.innerHTML = '';
        
        const boardElement = document.createElement('div');
        boardElement.className = 'chess-board';
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.className = `chess-square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
                square.dataset.row = row;
                square.dataset.col = col;
                
                const piece = this.board[row][col];
                if (piece) {
                    const pieceElement = document.createElement('div');
                    pieceElement.className = `chess-piece ${piece.color}`;
                    pieceElement.textContent = this.pieceSymbols[piece.color][piece.type];
                    square.appendChild(pieceElement);
                }
                
                boardElement.appendChild(square);
            }
        }
        
        this.container.appendChild(boardElement);
        this.updateGameStatus();
    }
    
    attachEventListeners() {
        this.container.addEventListener('click', (e) => {
            if (this.gameOver) return;
            
            const square = e.target.closest('.chess-square');
            if (!square) return;
            
            const row = parseInt(square.dataset.row);
            const col = parseInt(square.dataset.col);
            
            this.handleSquareClick(row, col);
        });
    }
    
    handleSquareClick(row, col) {
        if (this.selectedSquare) {
            if (this.selectedSquare.row === row && this.selectedSquare.col === col) {
                // Deselect current square
                this.clearSelection();
                return;
            }
            
            // Try to move piece
            if (this.isValidMove(this.selectedSquare.row, this.selectedSquare.col, row, col)) {
                this.movePiece(this.selectedSquare.row, this.selectedSquare.col, row, col);
                this.clearSelection();
                this.switchPlayer();
                this.