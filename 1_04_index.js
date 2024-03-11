const { createInterface } = require("readline");

const lines = [];

createInterface({
    input: process.stdin,
    output: process.stdout,
}).on("line", (line) => {
    lines.push(line.toString().trim());
}).on("close", () => {
    console.log(chess(lines));
});

const printBoard = (board) => {
    board.forEach(line => {
        console.log(line.toString());
    });
};

const chess = (data) => {
    const board = Array.from({ length: 8 }, () => new Array(8).fill(1));

    const markCell = (data, cell, x, y) => {
        const deltaR = [[-1, 0], [0, 1], [1, 0], [0, -1]];
        const deltaB = [[-1, -1], [-1, 1], [1, 1], [1, -1]];
        const delta = cell === 'R' ? deltaR : deltaB;

        board[x][y] = 0;
        for (let i = 1; i < 8; i++) {
            delta.forEach(([dx, dy], di) => {
                const nx = x + dx * i;
                const ny = y + dy * i;

                if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
                    if (data[nx][ny] === 'R' || data[nx][ny] === 'B') {
                        delta[di] = [0, 0];
                    }

                    board[nx][ny] = 0;
                }
            });
        }
    };

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const cell = data[i][j];
            if (cell === 'R' || cell === 'B') {
                markCell(data, cell, i, j);
            }
        }
    }

    // printBoard(board);

    return board.flat(2).reduce((acc, n) => (acc + n), 0);
};