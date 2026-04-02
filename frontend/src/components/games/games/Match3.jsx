import { useEffect, useState } from "react";

import { GameBoard } from "../GameBoard.jsx";
import { createMatrix, getCluster, getRandomItem, indexToCoords } from "../../../utils/boardGames.js";

const palette = ["🍓", "🍋", "🍇", "🫐", "🥝"];

function createBoard(size = 8) {
  return createMatrix(size, size, () => getRandomItem(palette));
}

function refillBoard(board) {
  const size = board.length;
  const nextBoard = createMatrix(size, size, () => null);

  for (let col = 0; col < size; col += 1) {
    const column = [];
    for (let row = size - 1; row >= 0; row -= 1) {
      if (board[row][col]) {
        column.push(board[row][col]);
      }
    }
    for (let row = size - 1; row >= 0; row -= 1) {
      nextBoard[row][col] = column[size - 1 - row] || getRandomItem(palette);
    }
  }

  return nextBoard;
}

export function Match3({
  savedState,
  onStateChange,
  onScoreChange,
  onStatusChange,
  registerControls,
}) {
  const [board, setBoard] = useState(savedState?.board || createBoard());
  const [selectedIndex, setSelectedIndex] = useState(savedState?.metadata?.selectedIndex || 0);
  const [score, setScore] = useState(savedState?.metadata?.score || 0);
  const [status, setStatus] = useState(savedState?.metadata?.status || "Chon cum 3 o tro len cung mau.");

  useEffect(() => {
    setBoard(savedState?.board || createBoard());
    setSelectedIndex(savedState?.metadata?.selectedIndex || 0);
    setScore(savedState?.metadata?.score || 0);
    setStatus(savedState?.metadata?.status || "Chon cum 3 o tro len cung mau.");
  }, [savedState]);

  useEffect(() => {
    onScoreChange?.(score);
  }, [onScoreChange, score]);

  useEffect(() => {
    onStatusChange?.(status);
  }, [onStatusChange, status]);

  useEffect(() => {
    onStateChange?.({
      board,
      currentTurn: "player",
      metadata: {
        selectedIndex,
        score,
        status,
      },
    });
  }, [board, onStateChange, score, selectedIndex, status]);

  function resetGame() {
    setBoard(createBoard());
    setSelectedIndex(0);
    setScore(0);
    setStatus("Da tao bang keo moi.");
  }

  function play(index) {
    const { row, col } = indexToCoords(index, board.length);
    const cluster = getCluster(board, row, col);
    if (cluster.length < 3) {
      setStatus("Can it nhat 3 o lien nhau cung mau.");
      return;
    }

    const nextBoard = board.map((line) => [...line]);
    cluster.forEach(({ row: clusterRow, col: clusterCol }) => {
      nextBoard[clusterRow][clusterCol] = null;
    });

    const filledBoard = refillBoard(nextBoard);
    setBoard(filledBoard);
    setScore((current) => current + cluster.length * 10);
    setStatus(`Combo ${cluster.length} o!`);
  }

  useEffect(() => {
    registerControls?.({
      left: () => setSelectedIndex((current) => (current - 1 + 64) % 64),
      right: () => setSelectedIndex((current) => (current + 1) % 64),
      enter: () => play(selectedIndex),
      back: resetGame,
    });
  }, [registerControls, selectedIndex]);

  return (
    <GameBoard
      board={board}
      selectedIndex={selectedIndex}
      onCellClick={play}
      cellSize={42}
      getCellLabel={(cell) => cell}
      getCellStyle={() => ({ fontSize: "1.3rem" })}
    />
  );
}
