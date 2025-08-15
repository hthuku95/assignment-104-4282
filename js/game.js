class ChessGame {
    constructor() {
        this.board = this.initializeBoard();
        this.currentPlayer = 'white';
        this.selectedSquare = null;
        this.gameHistory = [];
        this.isGameOver = false;
        this.checkmate = false;
        this.stalemate = false;
        this.moveCount = 0;
        
        this.initializeUI();
        this.renderBoard();
        this.updateGameStatus();
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

    initializeUI() {
        const gameContainer = document.getElementById('game-container');
        if (!gameContainer) {
            console.error('Game container not found');
            return;
        }

        gameContainer.innerHTML = `
            <div class="row">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <h5 class="mb-0">Chess Game</h5>
                            <div>
                                <button id="new-game-btn" class="btn btn-primary btn-sm me-2">New Game</button>
                                <button id="undo-btn" class="btn btn-secondary btn-sm">Undo</button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div id="chess-board" class="chess-board mx-auto"></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header">
                            <h6 class="mb-0">Game Status</h6>
                        </div>
                        <div class="card-body">
                            <div id="current-player" class="mb-3">
                                <strong>Current Turn: <span id="player-turn">White</span></strong>
                            </div>
                            <div id="game-status" class="mb-3">
                                <span class="badge bg-success">Game in Progress</span>
                            </div>
                            <div id="move-counter" class="mb-3">
                                <small class="text-muted">Moves: <span id="move-count">0</span></small>
                            </div>
                        </div>
                    </div>
                    <div class="card mt-3">
                        <div class="card-header">
                            <h6 class="mb-0">Captured Pieces</h6>
                        </div>
                        <div class="card-body">
                            <div class="mb-2">
                                <small class="text-muted">White captured:</small>
                                <div id="white-captured" class="captured-pieces"></div>
                            </div>
                            <div>
                                <small class="text-muted">Black captured:</small>
                                <div id="black-captured" class="captured-pieces"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.bindEvents();