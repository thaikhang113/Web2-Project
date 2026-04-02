import { useEffect, useState } from "react";

import { GameBoard } from "../GameBoard.jsx";
import { createMatrix, indexToCoords } from "../../../utils/boardGames.js";

const palette = ["#28c4a1", "#ff6c4f", "#f4b942", "#4fd0ff", "#a78bfa", "#f472b6"];

function createBoard(size = 12) {
  return createMatrix(size, size, () => null);
}

export function FreeDraw({
  savedState,
  onStateChange,
  onScoreChange,
  onStatusChange,
  registerControls,
}) {
  const [board, setBoard] = useState(savedState?.board || createBoard());
  const [selectedIndex, setSelectedIndex] = useState(savedState?.metadata?.selectedIndex || 0);
  const [activeColor, setActiveColor] = useState(savedState?.metadata?.activeColor || 0);
  const [score, setScore] = useState(savedState?.metadata?.score || 0);
  const [status, setStatus] = useState(savedState?.metadata?.status || "Chon mau roi nhan Enter de to pixel.");

  useEffect(() => {
    setBoard(savedState?.board || createBoard());
    setSelectedIndex(savedState?.metadata?.selectedIndex || 0);
    setActiveColor(savedState?.metadata?.activeColor || 0);
    setScore(savedState?.metadata?.score || 0);
    setStatus(savedState?.metadata?.status || "Chon mau roi nhan Enter de to pixel.");
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
      currentTurn: "draw",
      metadata: {
        selectedIndex,
        activeColor,
        score,
        status,
      },
    });
  }, [activeColor, board, onStateChange, score, selectedIndex, status]);

  function resetGame() {
    setBoard(createBoard());
    setSelectedIndex(0);
    setScore(0);
    setStatus("Da xoa sach bang ve.");
  }

  function paint(index, erase = false) {
    const { row, col } = indexToCoords(index, board.length);
    setBoard((current) => {
      const next = current.map((line) => [...line]);
      next[row][col] = erase ? null : palette[activeColor];
      return next;
    });
    setScore((current) => current + (erase ? 0 : 1));
    setStatus(erase ? "Da xoa pixel dang chon." : "Da to them mot pixel.");
  }

  useEffect(() => {
    registerControls?.({
      left: () => setSelectedIndex((current) => (current - 1 + 144) % 144),
      right: () => setSelectedIndex((current) => (current + 1) % 144),
      enter: () => paint(selectedIndex),
      back: () => paint(selectedIndex, true),
    });
  }, [activeColor, registerControls, selectedIndex]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {palette.map((color, index) => (
          <button
            key={color}
            type="button"
            onClick={() => setActiveColor(index)}
            className={`h-10 w-10 rounded-full border-2 ${activeColor === index ? "border-[var(--text)]" : "border-transparent"}`}
            style={{ background: color }}
          />
        ))}
      </div>

      <GameBoard
        board={board}
        selectedIndex={selectedIndex}
        onCellClick={(index) => paint(index)}
        cellSize={28}
        getCellLabel={() => ""}
        getCellStyle={(cell) => ({
          background: cell || "var(--surface-strong)",
        })}
      />
    </div>
  );
}
