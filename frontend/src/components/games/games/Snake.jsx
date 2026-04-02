import { useEffect, useState } from "react";

import { GameBoard } from "../GameBoard.jsx";
import { createMatrix, rotateDirection, stepPoint } from "../../../utils/boardGames.js";

function randomFood(size, snake) {
  while (true) {
    const next = {
      x: Math.floor(Math.random() * size),
      y: Math.floor(Math.random() * size),
    };
    if (!snake.some((cell) => cell.x === next.x && cell.y === next.y)) {
      return next;
    }
  }
}

export function Snake({
  savedState,
  onStateChange,
  onScoreChange,
  onStatusChange,
  registerControls,
}) {
  const size = 12;
  const [snake, setSnake] = useState(savedState?.metadata?.snake || [{ x: 5, y: 5 }]);
  const [direction, setDirection] = useState(savedState?.metadata?.direction || "right");
  const [food, setFood] = useState(savedState?.metadata?.food || { x: 8, y: 5 });
  const [running, setRunning] = useState(savedState?.metadata?.running || false);
  const [score, setScore] = useState(savedState?.metadata?.score || 0);
  const [status, setStatus] = useState(savedState?.metadata?.status || "Nhan Enter de bat dau.");

  useEffect(() => {
    setSnake(savedState?.metadata?.snake || [{ x: 5, y: 5 }]);
    setDirection(savedState?.metadata?.direction || "right");
    setFood(savedState?.metadata?.food || { x: 8, y: 5 });
    setRunning(savedState?.metadata?.running || false);
    setScore(savedState?.metadata?.score || 0);
    setStatus(savedState?.metadata?.status || "Nhan Enter de bat dau.");
  }, [savedState]);

  const board = createMatrix(size, size, (row, col) => {
    if (food.x === col && food.y === row) {
      return "food";
    }
    const snakeIndex = snake.findIndex((cell) => cell.x === col && cell.y === row);
    if (snakeIndex === 0) {
      return "head";
    }
    if (snakeIndex > 0) {
      return "body";
    }
    return null;
  });

  useEffect(() => {
    onScoreChange?.(score);
  }, [onScoreChange, score]);

  useEffect(() => {
    onStatusChange?.(status);
  }, [onStatusChange, status]);

  useEffect(() => {
    onStateChange?.({
      board,
      currentTurn: running ? "running" : "paused",
      metadata: {
        snake,
        direction,
        food,
        running,
        score,
        status,
      },
    });
  }, [board, direction, food, onStateChange, running, score, snake, status]);

  function resetGame() {
    const nextSnake = [{ x: 5, y: 5 }];
    setSnake(nextSnake);
    setDirection("right");
    setFood(randomFood(size, nextSnake));
    setRunning(false);
    setScore(0);
    setStatus("Da reset ran.");
  }

  useEffect(() => {
    registerControls?.({
      left: () => setDirection((current) => rotateDirection(current, "left")),
      right: () => setDirection((current) => rotateDirection(current, "right")),
      enter: () => {
        setRunning((current) => !current);
        setStatus((current) => (current.includes("Tam dung") ? "Dang chay..." : "Tam dung / tiep tuc bang Enter."));
      },
      back: resetGame,
    });
  }, [registerControls]);

  useEffect(() => {
    if (!running) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setSnake((currentSnake) => {
        const head = currentSnake[0];
        const nextHead = stepPoint(head, direction);
        const hitWall =
          nextHead.x < 0 || nextHead.x >= size || nextHead.y < 0 || nextHead.y >= size;
        const hitSelf = currentSnake.some(
          (cell) => cell.x === nextHead.x && cell.y === nextHead.y,
        );

        if (hitWall || hitSelf) {
          setRunning(false);
          setStatus("Game over! Bam Back de choi lai.");
          return currentSnake;
        }

        const ateFood = nextHead.x === food.x && nextHead.y === food.y;
        const nextSnake = [nextHead, ...currentSnake];

        if (!ateFood) {
          nextSnake.pop();
        } else {
          setFood(randomFood(size, nextSnake));
          setScore((current) => current + 10);
          setStatus("An moi thanh cong!");
        }

        return nextSnake;
      });
    }, 220);

    return () => window.clearInterval(interval);
  }, [direction, food.x, food.y, running]);

  return (
    <div className="space-y-4">
      <div className="rounded-[26px] border border-[var(--line)] bg-[var(--surface-strong)] p-4 text-sm text-[var(--muted)]">
        Left/Right xoay huong. Enter tam dung hoặc tiep tuc. Back reset van.
      </div>
      <GameBoard
        board={board}
        selectedIndex={-1}
        cellSize={32}
        getCellLabel={() => ""}
        getCellStyle={(cell) => ({
          background:
            cell === "head"
              ? "var(--warning)"
              : cell === "body"
                ? "rgba(40, 196, 161, 0.32)"
                : cell === "food"
                  ? "rgba(255, 108, 79, 0.32)"
                  : "var(--surface-strong)",
        })}
      />
    </div>
  );
}
