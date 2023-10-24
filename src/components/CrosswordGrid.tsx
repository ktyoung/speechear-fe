interface CrosswordGridProps {
  rows: number;
  columns: number;
  hintRows: number;
}
interface HintGridProps {
  rows: number;
}

function HintGrid({ rows }: HintGridProps) {
  const headers = [" ", "Level 1", "Level 2", "Level 3", "정답", "채점"];
  const hintTitle = Array.from(
    { length: rows },
    (_, index) => `${index + 1}번\n힌트`
  );

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
                    <li className="check-correct">
                      <button>O</button>
                    </li>
                    <li className="check-wrong">
                      <button>X</button>
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

// TODO: 크로스워드 그리드 완성하기
function CrosswordGrid({ rows, columns, hintRows }: CrosswordGridProps) {
  const gridRows = Array.from({ length: rows }, (_, rowIndex) => (
    <tr key={rowIndex}>
      {Array.from({ length: columns }, (_, colIndex) => (
        <td className="crossword-answer-input" key={colIndex}>
          <input type="text" maxLength={1} />
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

export default CrosswordGrid;
