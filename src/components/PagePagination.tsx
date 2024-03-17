"use client";

import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import useGetData from "../hooks/use-get-data";

interface Props<T> {
  endpoint: "string";
  limit: number;
  setLimits?: number;
  pages: number;
  setPages?: number;
}

const PagePagination = (props: Props) => {
  const [totalPages, setTotalPages] = useState<number | null>(1);
  const { endpoint, limit, pages, setPages } = props;

  const onPageChange = (page: number) => setPages(page++);

  const { data, isLoading } = useGetData(endpoint, limit, pages);
  const total = data?.data?.total;
  // const newTotal = total && setTotalPages(Math.ceil(total / limit));

  useEffect(() => {
    total ? setTotalPages(Math.ceil(total / limit)) : null;
  }, [total, limit]);

  console.log("|||||||||||||||||||||", totalPages);

  return (
    <>
      {totalPages !== 1 ? (
        <div className="flex overflow-x-auto sm:justify-center">
          <Pagination
            layout="pagination"
            currentPage={pages}
            totalPages={totalPages ?? 3}
            onPageChange={onPageChange}
            style={{ pointerEvents: `${isLoading ? "none" : "all"}` }}
          />
        </div>
      ) : null}
    </>
  );
};

export default PagePagination;
