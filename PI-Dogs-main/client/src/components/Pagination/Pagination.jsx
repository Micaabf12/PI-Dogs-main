import React from 'react';
import styles from './Pagination.module.css';

export default function Pagination({
  currentPage,
  dogsPerPage,
  totalAmountOfDogs,
  paginationChanger,
}) {
  const pageNumbers = [];

  for (var i = 1; i <= Math.ceil(totalAmountOfDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className={styles.nav}>
      <ul className="flex">
        <button onClick={() => paginationChanger(currentPage - 1 || currentPage !== 0)}>prev</button>
        {pageNumbers.length &&
          pageNumbers.map((number) => {
            return (
              <li key={number}>
                <button className={styles.paginationBtn} onClick={() => paginationChanger(number)}>
                  {number}
                </button>
              </li>
            );
          })}
        <button onClick={() => paginationChanger(currentPage + 1)}>next</button>
      </ul>
    </nav>
  );
}

