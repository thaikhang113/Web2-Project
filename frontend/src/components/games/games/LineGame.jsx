import { useEffect, useRef, useState } from "react";

import { GameBoard } from "../GameBoard.jsx";
import {
  checkLineWinner,
  cloneMatrix,
  createMatrix,
  getRandomEmptyCell,
  indexToCoords,
} from "../../../utils/boardGames.js";

function buildBoard(rows, cols, savedState) {
  return savedState?.board || createMatrix(rows, cols, () => null);
}

export function LineGame({
  rows,
  cols,
  winLength,
  reward,
  savedState,
  onStateChange,
  onScoreChange,
  onStatusChange,
  registerControls,
}) {
  const timeoutRef = useRef(null);
  const [board, setBoard] = useState(() => buildBoard(rows, cols, savedState));
  const [selectedIndex, setSelectedIndex] = useState(savedState?.metadata?.selectedIndex || 0);
  const [currentTurn, setCurrentTurn] = useState(savedState?.currentTurn || "player");
  const [score, setScore] = useState(savedState?.metadata?.score || 0);
  const [status, setStatus] = useState(savedState?.metadata?.status || "Luot cua ban.");
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    setBoard(buildBoard(rows, cols, savedState));
    setSelectedIndex(savedState?.metadata?.selectedIndex || 0);
    setCurrentTurn(savedState?.currentTurn || "player");
    setScore(savedState?.metadata?.score || 0);
    setStatus(savedState?.metadata?.status || "Luot cua ban.");
  }, [cols, rows, savedState]);

  useEffect(() => {
    onScoreChange?.(score);
  }, [onScoreChange, score]);

  useEffect(() => {
    onStatusChange?.(status);
  }, [onStatusChange, status]);

  useEffect(() => {
    onStateChange?.({
      board,
      currentTurn,
      metadata: {
        selectedIndex,
        score,
        status,
      },
    });
  }, [board, currentTurn, onStateChange, score, selectedIndex, status]);

  function resetGame() {
    setBoard(createMatrix(rows, cols, () => null));
    setSelectedIndex(0);
    setCurrentTurn("player");
    setScore(0);
    setStatus("Da reset van moi.");
    setLocked(false);
    clearTimeout(timeoutRef.current);
  }

  function applyPlayerMove(index) {
    if (locked || currentTurn !== "player") {
      return;
    }

    const { row, col } = indexToCoords(index, cols);
    if (board[row][col]) {
      setStatus("O nay da co quan, hay chon o khac.");
      return;
    }

    const nextBoard = cloneMatrix(board);
    nextBoard[row][col] = "X";
    setBoard(nextBoard);
    setSelectedIndex(index);

    if (checkLineWinner(nextBoard, row, col, "X", winLength)) {
      const nextScore = score + reward;
      setScore(nextScore);
      setCurrentTurn("done");
      setStatus("Ban da chien thang!");
      return;
    }

    if (!getRandomEmptyCell(nextBoard)) {
      setCurrentTurn("done");
      setScore((current) => current + Math.floor(reward / 3));
      setStatus("Hoa nhau roi.");
      return;
    }

    setCurrentTurn("ai");
    setLocked(true);
    setStatus("May dang suy nghi...");

    timeoutRef.current = setTimeout(() => {
      const empty = getRandomEmptyCell(nextBoard);
      if (!empty) {
        setCurrentTurn("done");
        setLocked(false);
        setStatus("Hoa nhau roi.");
        return;
      }

      const aiBoard = cloneMatrix(nextBoard);
      aiBoard[empty.row][empty.col] = "O";
      setBoard(aiBoard);
      setSelectedIndex(empty.row * cols + empty.col);

      if (checkLineWinner(aiBoard, empty.row, empty.col, "O", winLength)) {
        setCurrentTurn("done");
        setLocked(false);
        setStatus("May da danh bai ban.");
        return;
      }

      setCurrentTurn("player");
      setLocked(false);
      setStatus("Luot cua ban.");
    }, 380);
  }

  useEffect(() => {
    registerControls?.({
      left: () => setSelectedIndex((current) => (current - 1 + rows * cols) % (rows * cols)),
      right: () => setSelectedIndex((current) => (current + 1) % (rows * cols)),
      enter: () => applyPlayerMove(selectedIndex),
      back: resetGame,
    });
  }, [cols, currentTurn, locked, registerControls, rows, selectedIndex]);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <div className="space-y-4">
      <div className="rounded-[26px] border border-[var(--line)] bg-[var(--surface-strong)] p-4 text-sm text-[var(--muted)]">
        Dung Left/Right de di chuyen con tro va Enter de danh vao o dang duoc chon.
      </div>
      <GameBoard
        board={board}
        selectedIndex={selectedIndex}
        onCellClick={applyPlayerMove}
        cellSize={cols >= 10 ? 30 : 44}
        getCellLabel={(cell) => cell || ""}
        getCellStyle={(cell) => ({
          background: cell === "X" ? "rgba(40, 196, 161, 0.18)" : cell === "O" ? "rgba(255, 108, 79, 0.15)" : undefined,
          color: cell === "X" ? "var(--accent)" : cell === "O" ? "var(--danger)" : undefined,
          fontWeight: 800,
        })}
      />
    </div>
  );
}
