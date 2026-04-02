import { useEffect, useState } from "react";

import { GameBoard } from "../GameBoard.jsx";

const symbols = ["🍎", "🪐", "🎯", "🎈", "🍀", "🎧", "🧩", "⭐"];

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function createDeck() {
  return shuffle([...symbols, ...symbols]);
}

export function Memory({
  savedState,
  onStateChange,
  onScoreChange,
  onStatusChange,
  registerControls,
}) {
  const [deck, setDeck] = useState(savedState?.metadata?.deck || createDeck());
  const [selectedIndex, setSelectedIndex] = useState(savedState?.metadata?.selectedIndex || 0);
  const [flipped, setFlipped] = useState(savedState?.metadata?.flipped || []);
  const [matched, setMatched] = useState(savedState?.metadata?.matched || []);
  const [score, setScore] = useState(savedState?.metadata?.score || 0);
  const [status, setStatus] = useState(savedState?.metadata?.status || "Lat hai the giong nhau.");
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    setDeck(savedState?.metadata?.deck || createDeck());
    setSelectedIndex(savedState?.metadata?.selectedIndex || 0);
    setFlipped(savedState?.metadata?.flipped || []);
    setMatched(savedState?.metadata?.matched || []);
    setScore(savedState?.metadata?.score || 0);
    setStatus(savedState?.metadata?.status || "Lat hai the giong nhau.");
  }, [savedState]);

  const board = [];
  for (let index = 0; index < deck.length; index += 4) {
    board.push(deck.slice(index, index + 4));
  }

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
        deck,
        selectedIndex,
        flipped,
        matched,
        score,
        status,
      },
    });
  }, [board, deck, flipped, matched, onStateChange, score, selectedIndex, status]);

  function resetGame() {
    setDeck(createDeck());
    setSelectedIndex(0);
    setFlipped([]);
    setMatched([]);
    setScore(0);
    setStatus("Da tao bo bai moi.");
    setLocked(false);
  }

  function flipCard(index) {
    if (locked || flipped.includes(index) || matched.includes(index)) {
      return;
    }

    const nextFlipped = [...flipped, index];
    setFlipped(nextFlipped);

    if (nextFlipped.length < 2) {
      setStatus("Lat them mot the nua.");
      return;
    }

    setLocked(true);
    const [firstIndex, secondIndex] = nextFlipped;

    if (deck[firstIndex] === deck[secondIndex]) {
      const nextMatched = [...matched, firstIndex, secondIndex];
      setMatched(nextMatched);
      setFlipped([]);
      setLocked(false);
      setScore((current) => current + 12);
      setStatus("Chinh xac! Ban da ghep dung mot cap.");

      if (nextMatched.length === deck.length) {
        setStatus("Ban da mo khoa toan bo the.");
      }
      return;
    }

    setStatus("Sai roi, ghi nho vi tri de lat lai.");
    window.setTimeout(() => {
      setFlipped([]);
      setLocked(false);
    }, 650);
  }

  useEffect(() => {
    registerControls?.({
      left: () => setSelectedIndex((current) => (current - 1 + deck.length) % deck.length),
      right: () => setSelectedIndex((current) => (current + 1) % deck.length),
      enter: () => flipCard(selectedIndex),
      back: resetGame,
    });
  }, [deck.length, flipped, locked, matched, registerControls, selectedIndex]);

  return (
    <GameBoard
      board={board}
      selectedIndex={selectedIndex}
      onCellClick={flipCard}
      cellSize={72}
      getCellLabel={(cell, index) =>
        flipped.includes(index) || matched.includes(index) ? cell : "?"
      }
      getCellStyle={(cell, index) => ({
        fontSize: "1.6rem",
        background:
          flipped.includes(index) || matched.includes(index)
            ? "rgba(40, 196, 161, 0.18)"
            : "var(--surface-strong)",
      })}
    />
  );
}
