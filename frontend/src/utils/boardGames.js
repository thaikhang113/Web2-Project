export function createMatrix(rows, cols, factory = () => null) {
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => factory(row, col)),
  );
}

export function cloneMatrix(board) {
  return board.map((row) => [...row]);
}

export function indexToCoords(index, cols) {
  return { row: Math.floor(index / cols), col: index % cols };
}

export function coordsToIndex(row, col, cols) {
  return row * cols + col;
}

export function getRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export function findEmptyCells(board) {
  const cells = [];
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (!cell) {
        cells.push({ row: rowIndex, col: colIndex });
      }
    });
  });
  return cells;
}

export function getRandomEmptyCell(board) {
  const cells = findEmptyCells(board);
  return cells.length ? getRandomItem(cells) : null;
}

export function checkLineWinner(board, row, col, symbol, winLength) {
  if (!symbol) {
    return false;
  }

  const directions = [
    [1, 0],
    [0, 1],
    [1, 1],
    [1, -1],
  ];

  return directions.some(([deltaRow, deltaCol]) => {
    let count = 1;

    [[1, 1], [-1, -1]].forEach(([stepRow, stepCol]) => {
      let currentRow = row + deltaRow * stepRow;
      let currentCol = col + deltaCol * stepCol;

      while (
        board[currentRow] &&
        board[currentRow][currentCol] === symbol
      ) {
        count += 1;
        currentRow += deltaRow * stepRow;
        currentCol += deltaCol * stepCol;
      }
    });

    return count >= winLength;
  });
}

export function getCluster(board, startRow, startCol) {
  const target = board[startRow]?.[startCol];
  if (!target) {
    return [];
  }

  const visited = new Set();
  const stack = [[startRow, startCol]];
  const cluster = [];

  while (stack.length) {
    const [row, col] = stack.pop();
    const key = `${row}-${col}`;
    if (visited.has(key)) {
      continue;
    }

    visited.add(key);
    if (board[row]?.[col] !== target) {
      continue;
    }

    cluster.push({ row, col });
    stack.push([row + 1, col], [row - 1, col], [row, col + 1], [row, col - 1]);
  }

  return cluster;
}

export function rotateDirection(direction, turn) {
  const order = ["up", "right", "down", "left"];
  const currentIndex = order.indexOf(direction);
  const offset = turn === "left" ? -1 : 1;
  return order[(currentIndex + offset + order.length) % order.length];
}

export function stepPoint(point, direction) {
  if (direction === "up") {
    return { x: point.x, y: point.y - 1 };
  }
  if (direction === "down") {
    return { x: point.x, y: point.y + 1 };
  }
  if (direction === "left") {
    return { x: point.x - 1, y: point.y };
  }
  return { x: point.x + 1, y: point.y };
}
