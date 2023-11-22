import { ChangeEvent, useState } from "react";

interface CrosswordGridProps {
  rows: number;
  columns: number;
  hintRows: number;
  disabledCells: Array<{ row: number; col: number }>;
  horizontalHints: Array<{ number: number; row: number; col: number }>;
  verticalHints: Array<{ number: number; row: number; col: number }>;
}
interface HintGridProps {
  rows: number;
}
interface DisabledCellProps {
  rowIndex: number;
  colIndex: number;
  disabledCells: Array<{ row: number; col: number }>;
}

export default function CrosswordGrid({
  rows,
  columns,
  hintRows,
  disabledCells,
  horizontalHints,
  verticalHints,
}: CrosswordGridProps) {
  const gridRows = Array.from({ length: rows }, (_, rowIndex) => (
    <tr key={rowIndex} style={{ height: `${462 / rows}px` }}>
      {Array.from({ length: columns }, (_, colIndex) => (
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
            disabled={isCellDisabled({ rowIndex, colIndex, disabledCells })}
          />
        </td>
      ))}
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

function HintGrid({ rows }: HintGridProps) {
  const headers = [" ", "Level 1", "Level 2", "Level 3", "정답", "채점"];
  const hintTitle = Array.from({ length: rows }, (_, index) => `${index + 1}번\n힌트`);
  const [selectedOptions, setSelectedOptions] = useState<Array<string>>(
    Array(rows).fill("")
  );

  const handleRadioChange = (rowIndex: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[rowIndex] = e.target.value;
    setSelectedOptions(newSelectedOptions);
  };

  return (
    <table className="hint-grid">
      <thead>
        <tr className="blue">
          {headers.map((header, index) => (
            <th key={index} style={{ width: `calc(100% / 6)` }}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {hintTitle.map((title, rowIndex) => (
          <tr key={rowIndex}>
            <td className="blue">{title}</td>
            {Array.from({ length: 5 }, (_, colIndex) => (
              <td key={colIndex}>
                {colIndex < 4 ? (
                  <button>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/test/play_small.png`}
                      alt="Play Button"
                    />
                  </button>
                ) : (
                  <ul className="scoring">
                    <li
                      className={`check-correct ${
                        selectedOptions[rowIndex] === "correct" ? "active" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        id={`score-correct-${rowIndex}`}
                        name={`score-${rowIndex}`}
                        value="correct"
                        onChange={handleRadioChange(rowIndex)}
                        hidden
                      />
                      <label htmlFor={`score-correct-${rowIndex}`}>O</label>
                    </li>
                    <li
                      className={`check-wrong ${
                        selectedOptions[rowIndex] === "wrong" ? "active" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        id={`score-wrong-${rowIndex}`}
                        name={`score-${rowIndex}`}
                        value="wrong"
                        onChange={handleRadioChange(rowIndex)}
                        hidden
                      />
                      <label htmlFor={`score-wrong-${rowIndex}`}>X</label>
                    </li>
                  </ul>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
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
