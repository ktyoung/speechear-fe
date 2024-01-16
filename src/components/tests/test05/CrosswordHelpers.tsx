interface DisabledCellProps {
  rowIndex: number;
  colIndex: number;
  disabledCells: Array<{ row: number; col: number }>;
}

function isCellDisabled({ rowIndex, colIndex, disabledCells }: DisabledCellProps) {
  return disabledCells.some((cell) => cell.row === rowIndex && cell.col === colIndex);
}

function renderHintNumber(
  row: number,
  col: number,
  hints: Array<{ number: number; row: number; col: number }>
) {
  const hint = hints.find((h) => h.row === row && h.col === col);
  return hint ? hint.number : null;
}

export { isCellDisabled, renderHintNumber };
