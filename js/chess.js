class ChessGame {
    constructor() {
        this.board = this.initializeBoard();
        this.currentPlayer = 'white';
        this.selectedSquare = null;
        this.gameHistory = [];
        this.isGameOver = false;
        this.winner = null;
        this.enPassantTarget = null;
        this.castlingRights = {
            white: { kingside: true, queenside: true },
            black: { kingside: true, queenside: true }
        };
        this.kingPositions = { white: [7, 4], black: [0, 4] };
        this.moveCount = 0;
        this.fiftyMoveRule = 0;
        this.threefoldRepetition = new Map();
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

    getPieceAt(row, col) {
        if (row < 0 || row >= 8 || col < 0 || col >= 8) return null;
        return this.board[row][col];
    }

    setPieceAt(row, col, piece) {
        if (row >= 0 && row < 8 && col >= 0 && col < 8) {
            this.board[row][col] = piece;
        }
    }

    isValidSquare(row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    getPossibleMoves(fromRow, fromCol) {
        const piece = this.getPieceAt(fromRow, fromCol);
        if (!piece || piece.color !== this.currentPlayer) return [];

        let moves = [];
        
        switch (piece.type) {
            case 'pawn':
                moves = this.getPawnMoves(fromRow, fromCol);
                break;
            case 'rook':
                moves = this.getRookMoves(fromRow, fromCol);
                break;
            case 'knight':
                moves = this.getKnightMoves(fromRow, fromCol);
                break;
            case 'bishop':
                moves = this.getBishopMoves(fromRow, fromCol);
                break;
            case 'queen':
                moves = this.getQueenMoves(fromRow, fromCol);
                break;
            case 'king':
                moves = this.getKingMoves(fromRow, fromCol);
                break;
        }

        // Filter out moves that would put own king in check
        return moves.filter(move => !this.wouldBeInCheck(fromRow, fromCol, move[0], move[1]));
    }

    getPawnMoves(row, col) {
        const moves = [];
        const piece = this.getPieceAt(row, col);
        const direction = piece.color === 'white' ? -1 : 1;
        const startRow = piece.color === 'white' ? 6 : 1;

        // Forward move
        if (this.isValidSquare(row + direction, col) && !this.getPieceAt(row + direction, col)) {
            moves.push([row + direction, col]);
            
            // Double move from starting position
            if (row === startRow &&