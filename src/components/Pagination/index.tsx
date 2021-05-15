import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import styles from './styles.module.scss';

type PaginationProps = {
  itemsPerPage: number,
  totalItems: number,
  paginate: (number) => void,
  currentPage: number
}

function Pagination({ itemsPerPage, totalItems, paginate, currentPage }: PaginationProps) {
  const [ pagesToShow, setPagesToShow ] = useState([]);
  const [ pageNumberLimit, setPageNumberLimit ] = useState(5);
  const [ maxPageNumberLimit, setMaxPageNumberLimit ] = useState(5);
  const [ minPageNumberLimit, setMinPageNumberLimit ] = useState(0);
  const totalPages = [];
  
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    totalPages.push(i);
  }


  const handlePrevious = () => {
    paginate(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  }

  const handleNext = () => {
    paginate(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  }

  const renderPageNumbers = totalPages.map(number => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li key={number} className={`${styles.pageItem} ${(currentPage == number) ? styles.active : null}`}>
          <button onClick={() => paginate(number)}>
            {number}
          </button>
        </li>
      );
    } else {
      return null;
    }
  })
  
  return (
    <nav className={styles.container}>
      {totalPages.length > 1 ? (
        <ul className={styles.pagination}>
          <li className={`${styles.pageItem} ${styles.btnPrev}`}>
            <button onClick={handlePrevious} disabled={currentPage == totalPages[0] ? true : false}>
              <FaAngleLeft />
            </button>
          </li>
          
          {renderPageNumbers}

          <li className={`${styles.pageItem} ${styles.btnNext}`}>
            <button onClick={handleNext} disabled={currentPage == totalPages[totalPages.length - 1] ? true : false}>
              <FaAngleRight />
            </button>
          </li>
        </ul>
      ) : null}
    </nav>
  );
};

export default Pagination;
