import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const CustomPagination = ({
  page,
  setPage,
  showItem,
  total,
  limit,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  showItem: number;
  total: number;
  limit: number;
}) => {
  const [lastPage, SetLastPage] = useState(Math.ceil(total / limit));

  const clickPage = (value: number) => {
    setPage(value);
  };

  const previusPage = () => {
    setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    SetLastPage(Math.ceil(total / limit));
  }, [total, showItem]);

  return (
    <div className="w-full h-fit flex flex-col md:flex-row mt-3 justify-center items-center md:justify-between gap-2 mb-4">
      <div className="">
        Show <span className="font-medium">{showItem}</span> of{" "}
        <span className="font-medium">{total}</span> Data
      </div>
      <Pagination className="h-fit flex flex-1 md:justify-end">
        <PaginationContent className="">
          {page > 1 ? (
            <PaginationItem onClick={previusPage}>
              <PaginationPrevious href="#" />
            </PaginationItem>
          ) : undefined}

          {lastPage <= 1
            ? undefined
            : Array.from({ length: lastPage }, (_, index) => {
                const pageNumber = index + 1;

                if (pageNumber === 1 || pageNumber === lastPage) {
                  return (
                    <PaginationItem
                      onClick={() => clickPage(pageNumber)}
                      key={index}
                    >
                      <PaginationLink href="#" isActive={page === pageNumber}>
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if (Math.abs(page - pageNumber) <= 1) {
                  return (
                    <PaginationItem
                      onClick={() => clickPage(pageNumber)}
                      key={index}
                    >
                      <PaginationLink href="#" isActive={page === pageNumber}>
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
              })}

          {page < lastPage ? (
            <PaginationItem onClick={nextPage}>
              <PaginationNext href="#" />
            </PaginationItem>
          ) : undefined}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CustomPagination;
