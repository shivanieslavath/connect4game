const ROWS = 6;
const COLS = 7;
let currentPlayer = 'red'; // Player 1: red, Player 2: yellow
let gameBoard = Array(ROWS).fill(null).map(() => Array(COLS).fill(null));
let gameActive = true;

const gameBoardElement = document.getElementById('game-board');
const statusElement = document.getElementById('status');

// Initialize the game board
function createBoard() {
    gameBoardElement.innerHTML = '';
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick);
            gameBoardElement.appendChild(cell);
        }
    }
}

// Handle cell click
function handleCellClick(event) {
    if (!gameActive) return;

    const col = event.target.dataset.col;
    for (let row = ROWS - 1; row >= 0; row--) {
        if (!gameBoard[row][col]) {
            gameBoard[row][col] = currentPlayer;
            updateBoard();
            if (checkWin(row, col)) {
                gameActive = false;
                statusElement.textContent = `${currentPlayer === 'red' ? 'Player 1' : 'Player 2'} wins!`;
                return;
            }
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            statusElement.textContent = `${currentPlayer === 'red' ? 'Player 1' : 'Player 2'}'s turn (${currentPlayer})`;
            return;
        }
    }
}

// Update the board UI
function updateBoard() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
            cell.classList.remove('red', 'yellow');
            if (gameBoard[row][col]) {
                cell.classList.add(gameBoard[row][col]);
            }
        }
    }
}

// Check for a win
function checkWin(row, col) {
    return (
        checkDirection(row, col, 1, 0) || // Horizontal
        checkDirection(row, col, 0, 1) || // Vertical
        checkDirection(row, col, 1, 1) || // Diagonal down-right
        checkDirection(row, col, 1, -1)   // Diagonal down-left
    );
}

// Check cells in a specific direction
function checkDirection(row, col, rowDir, colDir) {
    let count = 0;
    for (let i = -3; i <= 3; i++) {
        const newRow = row + i * rowDir;
        const newCol = col + i * colDir;
        if (
            newRow >= 0 && newRow < ROWS &&
            newCol >= 0 && newCol < COLS &&
            gameBoard[newRow][newCol] === currentPlayer
        ) {
            count++;
            if (count === 4) return true;
        } else {
            count = 0;
        }
    }
    return false;
}

createBoard();
