import { renderHintNumber, isCellDisabled } from "./CrosswordHelpers";
import HintGrid from "./HintGrid";

interface CrosswordGridProps {
  rows: number;
  columns: number;
  hintRows: number;
  disabledCells: Array<{ row: number; col: number }>;
  horizontalHints: Array<{ number: number; row: number; col: number }>;
  verticalHints: Array<{ number: number; row: number; col: number }>;
  answers: { [key: string]: string };
}

export default function CrosswordGrid({
  rows,
  columns,
  hintRows,
  disabledCells,
  horizontalHints,
  verticalHints,
  answers,
}: CrosswordGridProps) {
  const gridRows = Array.from({ length: rows }, (_, rowIndex) => (
    <tr key={rowIndex} style={{ height: `${462 / rows}px` }}>
      {Array.from({ length: columns }, (_, colIndex) => {
        const answerKey = `${rowIndex}_${colIndex}`;
        return (
          <td
            className="crossword-answer-input"
            key={colIndex}
            style={{ height: `${462 / rows}px` }}
          >
            <div className="hint-container">
              <p className="horizontal-hint">
                {renderHintNumber(rowIndex, colIndex, horizontalHints)}
              </p>
              <p className="vertical-hint">
                {renderHintNumber(rowIndex, colIndex, verticalHints)}
              </p>
            </div>
            <input
              type="text"
              placeholder=""
              maxLength={1}
              value={answers && answers[answerKey] ? answers[answerKey] : ""}
              disabled={isCellDisabled({ rowIndex, colIndex, disabledCells })}
              readOnly
            />
          </td>
        );
      })}
    </tr>
  ));

  return (
    <div className="crossword-wrapper">
      <table className="crossword-grid">
        <tbody>{gridRows}</tbody>
      </table>
      <HintGrid rows={hintRows} />
    </div>
  );
}
