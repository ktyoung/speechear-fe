type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  handleFinished: () => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  handleFinished,
}: PaginationProps) {
  return (
    <div className="pagination-wrapper">
      <ul>
        {[...Array(totalPages)].map((_, index) => {
          const number = index + 1;
          return (
            <li
              key={number}
              className={`page-item ${number === currentPage ? "active" : ""}`}
            >
              <button onClick={() => onPageChange(number)}>{number}</button>
            </li>
          );
        })}
        <li className="finish-button">
          <button onClick={handleFinished}>연습 마치기</button>
        </li>
      </ul>
    </div>
  );
}
