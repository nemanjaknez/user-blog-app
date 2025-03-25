import React from "react";

type PaginationItemProps = {
  page: number | string;
  currentPage: number;
  onPageChange: (page: number) => void | (() => void);
  isDisabled: boolean;
};

const PaginationItem = ({
  page,
  currentPage,
  onPageChange,
  isDisabled,
}: PaginationItemProps) => {
  return (
    <li
      className={`pagination-item ${page === currentPage ? "active" : ""} ${
        isDisabled ? "disabled" : ""
      }`}
      onClick={() => {
        if (typeof page === "number") {
          onPageChange(page);
        } else {
          (onPageChange as () => void)();
        }
      }}
    >
      <span>{page}</span>
    </li>
  );
};

export default PaginationItem;
