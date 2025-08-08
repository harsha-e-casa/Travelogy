export default function ByPagination({
  handlePreviousPage,
  totalPages,
  currentPage,
  handlePageChange,
  handleNextPage,
}: any) {
  // Smart Pagination Logic
  const getPagination = (current: number, total: number) => {
    const delta = 2;
    const range: (number | string)[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    for (let i = 1; i <= total; i++) {
      if (
        i === 1 ||
        i === total ||
        (i >= current - delta && i <= current + delta)
      ) {
        range.push(i);
      }
    }

    // for (let i of range) {
    //   if (l) {
    //     if (i - (l ?? 0) === 2) {
    //       rangeWithDots.push(l + 1);
    //     } else if (i - (l ?? 0) > 2) {
    //       rangeWithDots.push("...");
    //     }
    //   }
    //   rangeWithDots.push(i);
    //   l = i;
    // }
    range.forEach((i: any) => {
      if (l !== undefined) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    });
    return rangeWithDots;
  };

  const pagesToRender = getPagination(currentPage, totalPages);

  return (
    <>
      <nav aria-label="Page navigation example">
        <div className="pagination">
          <span className="page-item" onClick={handlePreviousPage}>
            <span className="page-link">
              <svg
                width={12}
                height={12}
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.00016 1.33325L1.3335 5.99992M1.3335 5.99992L6.00016 10.6666M1.3335 5.99992H10.6668"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>

          {pagesToRender.map((page, index) =>
            page === "..." ? (
              <span key={index} className="page-item disabled">
                <span className="page-link">...</span>
              </span>
            ) : (
              <span
                key={index}
                className={
                  page === currentPage ? "page-item active" : "page-item"
                }
                onClick={() => handlePageChange(page)}
              >
                <span className="page-link">{page}</span>
              </span>
            )
          )}

          <span className="page-item" onClick={handleNextPage}>
            <span className="page-link">
              <svg
                width={12}
                height={12}
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.99967 10.6666L10.6663 5.99992L5.99968 1.33325M10.6663 5.99992L1.33301 5.99992"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
        </div>
      </nav>
    </>
  );
}
