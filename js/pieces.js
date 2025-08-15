class Piece {
    constructor(color, row, col) {
        this.color = color;
        this.row = row;
        this.col = col;
        this.hasMoved = false;
    }

    isValidMove(newRow, newCol, board) {
        // Check if destination is within board bounds
        if (newRow < 0 || newRow > 7 || newCol < 0 || newCol > 7) {
            return false;
        }

        // Check if destination has piece of same color
        const destinationPiece = board[newRow][newCol];
        if (destinationPiece && destinationPiece.color === this.color) {
            return false;
        }

        return this.isValidMovePattern(newRow, newCol, board);
    }

    isValidMovePattern(newRow, newCol, board) {
        // To be implemented by subclasses
        return false;
    }

    isPathClear(newRow, newCol, board) {
        const rowDiff = newRow - this.row;
        const colDiff = newCol - this.col;
        const rowStep = rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff);
        const colStep = colDiff === 0 ? 0 : colDiff / Math.abs(colDiff);

        let currentRow = this.row + rowStep;
        let currentCol = this.col + colStep;

        while (currentRow !== newRow || currentCol !== newCol) {
            if (board[currentRow][currentCol] !== null) {
                return false;
            }
            currentRow += rowStep;
            currentCol += colStep;
        }

        return true;
    }

    getSymbol() {
        return '';
    }

    getType() {
        return this.constructor.name.toLowerCase();
    }
}

class King extends Piece {
    isValidMovePattern(newRow, newCol, board) {
        const rowDiff = Math.abs(newRow - this.row);
        const colDiff = Math.abs(newCol - this.col);
        
        // King moves one square in any direction
        if (rowDiff <= 1 && colDiff <= 1 && (rowDiff !== 0 || colDiff !== 0)) {
            return true;
        }

        // Castling logic
        if (!this.hasMoved && rowDiff === 0 && colDiff === 2) {
            return this.canCastle(newRow, newCol, board);
        }

        return false;
    }

    canCastle(newRow, newCol, board) {
        const isKingSide = newCol > this.col;
        const rookCol = isKingSide ? 7 : 0;
        const rook = board[this.row][rookCol];

        // Check if rook exists and hasn't moved
        if (!rook || rook.getType() !== 'rook' || rook.hasMoved) {
            return false;
        }

        // Check if path is clear
        const startCol = Math.min(this.col, rookCol) + 1;
        const endCol = Math.max(this.col, rookCol) - 1;
        
        for (let col = startCol; col <= endCol; col++) {
            if (board[this.row][col] !== null) {
                return false;
            }
        }

        return true;
    }

    getSymbol() {
        return this.color === 'white' ? '♔' : '♚';
    }
}

class Queen extends Piece {
    isValidMovePattern(newRow, newCol, board) {
        const rowDiff = Math.abs(newRow - this.row);
        const colDiff = Math.abs(newCol - this.col);

        // Queen moves like rook or bishop
        const isRookMove = (rowDiff === 0 && colDiff > 0) || (colDiff === 0 && rowDiff > 0);
        const isBishopMove = rowDiff === colDiff &&