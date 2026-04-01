export function GameBoard({
  board,
  selectedIndex = -1,
  onCellClick,
  getCellLabel,
  getCellClassName,
  getCellStyle,
  cellSize = 42,
}) {
  const rows = board.length;
  const cols = board[0]?.length || 0;

  return (
    <div
      className="board-grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(${cellSize}px, ${cellSize}px))`,
      }}
    >
      {board.flat().map((cell, index) => {
        const extraClass = getCellClassName ? getCellClassName(cell, index) : "";
        return (
          <button
            key={`${index}-${rows}-${cols}`}
            type="button"
            onClick={() => onCellClick?.(index)}
            className={`board-cell ${selectedIndex === index ? "is-selected" : ""} ${extraClass}`.trim()}
            style={{
              width: `${cellSize}px`,
              height: `${cellSize}px`,
              ...getCellStyle?.(cell, index),
            }}
          >
            {getCellLabel ? getCellLabel(cell, index) : cell}
          </button>
        );
      })}
    </div>
  );
}
