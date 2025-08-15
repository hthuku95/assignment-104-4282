// Chess utility functions for notation and game helpers

const ChessUtils = {
    // Convert board position to algebraic notation (e.g., [0,0] -> 'a8')
    positionToAlgebraic(row, col) {
        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
        return files[col] + ranks[row];
    },

    // Convert algebraic notation to board position (e.g., 'a8' -> [0,0])
    algebraicToPosition(notation) {
        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
        const file = notation[0];
        const rank = notation[1];
        return [ranks.indexOf(rank), files.indexOf(file)];
    },

    // Get piece Unicode symbol
    getPieceSymbol(piece, color) {
        const symbols = {
            white: {
                king: '♔',
                queen: '♕',
                rook: '♖',
                bishop: '♗',
                knight: '♘',
                pawn: '♙'
            },
            black: {
                king: '♚',
                queen: '♛',
                rook: '♜',
                bishop: '♝',
                knight: '♞',
                pawn: '♟'
            }
        };
        return symbols[color][piece] || '';
    },

    // Check if a position is within board bounds
    isValidPosition(row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    },

    // Get opposite color
    getOppositeColor(color) {
        return color === 'white' ? 'black' : 'white';
    },

    // Check if square is light or dark
    isLightSquare(row, col) {
        return (row + col) % 2 === 0;
    },

    // Generate FEN notation from board state
    generateFEN(board, currentPlayer, castlingRights, enPassantTarget, halfMoveClock, fullMoveNumber) {
        let fen = '';
        
        // Board position
        for (let row = 0; row < 8; row++) {
            let emptySquares = 0;
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (piece) {
                    if (emptySquares > 0) {
                        fen += emptySquares;
                        emptySquares = 0;
                    }
                    const pieceChar = this.getPieceNotation(piece.type, piece.color);
                    fen += pieceChar;
                } else {
                    emptySquares++;
                }
            }
            if (emptySquares > 0) {
                fen += emptySquares;
            }
            if (row < 7) fen += '/';
        }
        
        // Active color
        fen += ' ' + (currentPlayer === 'white' ? 'w' : 'b');
        
        // Castling rights
        fen += ' ' + (castlingRights || '-');
        
        // En passant target
        fen += ' ' + (enPassantTarget || '-');
        
        // Half-move clock
        fen += ' ' + (halfMoveClock || 0);
        
        // Full-move number
        fen += ' ' + (fullMoveNumber || 1);
        
        return fen;
    },

    // Get piece notation for FEN
    getPieceNotation(pieceType, color) {
        const notation = {
            king: 'k',
            queen: 'q',
            rook: 'r',