"use client";

import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import useGetData from "../hooks/use-get-data";

const PagePagination = (props) => {
  const [totalPages, setTotalPages] = useState<number | null>(1);
  const { endpoint, limit, setLimit, pages, setPages } = props;

  const onPageChange = (page: number) => setPages(page++);

  const { data, isLoading } = useGetData(endpoint, limit, pages);
  const total = data?.data?.total;
  // const newTotal = total && setTotalPages(Math.ceil(total / limit));
  // console.log("|||||||||||||||||||||", newTotal);

  useEffect(() => {
    total ? setTotalPages(Math.ceil(total / limit)) : null;
  });

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        layout="pagination"
        currentPage={pages}
        totalPages={totalPages ?? 3}
        onPageChange={onPageChange}
        style={{ pointerEvents: `${isLoading ? "none" : "all"}` }}
      />
    </div>
  );
};

export default PagePagination;
