import { Link } from "@remix-run/react";

import styles from "../styles/build/account.json";

export default function Pagination({ currentPage, pageCount, pageLimit }) {
  let pageNumbers = [];

  if (pageCount <= 5) {
    pageNumbers = [...Array(pageCount).keys()].map((i) => i + 1);
  } else {
    const firstPages = [1, 2];
    const lastPages = [pageCount - 1, pageCount];
    const currentPages = [currentPage - 1, currentPage, currentPage + 1].filter(
      (page) => page > 2 && page < pageCount - 1
    );
    pageNumbers = [...new Set([...firstPages, ...currentPages, ...lastPages])];
  }

  return (
    <>
      {currentPage > 1 && (
        <li>
          <Link to={`?page=1${pageLimit !== 10 ? `&limit=${pageLimit}` : ""}`}>
            Первая
          </Link>
        </li>
      )}

      {currentPage > 1 && (
        <li>
          <Link
            to={`?page=${currentPage - 1}${
              pageLimit !== 10 ? `&limit=${pageLimit}` : ""
            }`}
          >
            Назад
          </Link>
        </li>
      )}

      {pageNumbers.map((page) => (
        <li key={page}>
          <Link
            key={page}
            to={`?page=${page}${pageLimit !== 10 ? `&limit=${pageLimit}` : ""}`}
            className={currentPage === page ? styles.active : ""}
          >
            {page}
          </Link>
        </li>
      ))}

      {pageCount > 5 && currentPage < pageCount - 3 && (
        <li className={styles.dots}>...</li>
      )}

      {currentPage < pageCount && (
        <li>
          <Link
            to={`?page=${currentPage + 1}${
              pageLimit !== 10 ? `&limit=${pageLimit}` : ""
            }`}
          >
            Вперёд
          </Link>
        </li>
      )}

      {currentPage < pageCount && (
        <li>
          <Link
            to={`?page=${pageCount}${
              pageLimit !== 10 ? `&limit=${pageLimit}` : ""
            }`}
          >
            Последняя
          </Link>
        </li>
      )}
    </>
  );
}
