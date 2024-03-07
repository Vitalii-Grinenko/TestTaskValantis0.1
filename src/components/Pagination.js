import styles from "./Pagination.module.css";

function Pagination({ productPerPage, totalProducts, paginate, currentPage }) {
  const pageNumbers = [];
  const lastPageNumber = Math.ceil(totalProducts / productPerPage);
  if (lastPageNumber >= 9) {
    pageNumbers.push(currentPage);
    let leftStep = 3;
    let rightStep = 3;

    if (currentPage - leftStep <= 0) {
      rightStep = rightStep - (currentPage - leftStep - 1);
      leftStep = leftStep + (currentPage - leftStep - 1);
    }
    if (currentPage + rightStep >= lastPageNumber) {
      let different = lastPageNumber - currentPage;
      leftStep = leftStep + (leftStep - different);
      rightStep = different;
    }
    while (leftStep !== 0 || rightStep !== 0) {
      if (leftStep !== 0) {
        pageNumbers.push(currentPage - leftStep);
        leftStep--;
      }
      if (rightStep !== 0) {
        pageNumbers.push(currentPage + rightStep);
        rightStep--;
      }
    }
    pageNumbers.sort((a, b) => a - b);
  } else {
    for (let i = 1; i <= lastPageNumber; i++) {
      pageNumbers.push(i);
    }
  }
  return (
    <ul className={styles.pagination}>
      {currentPage > 4 && lastPageNumber >= 9 && (
        <li
          className={styles.pageItem}
          onClick={() => paginate(1)}
          key="firstPage"
        >
          ...1
        </li>
      )}
      {pageNumbers.map((number) => {
        return number !== currentPage ? (
          <li
            className={styles.pageItem}
            onClick={() => paginate(number)}
            key={number}
          >
            {number}
          </li>
        ) : (
          <li className={styles.currentPage} key={number}>
            {number}
          </li>
        );
      })}
      {currentPage < lastPageNumber - 3 && lastPageNumber >= 9 && (
        <li
          className={styles.pageItem}
          onClick={() => paginate(lastPageNumber)}
          key="lastPage"
        >
          ...{lastPageNumber}
        </li>
      )}
    </ul>
  );
}

export default Pagination;
