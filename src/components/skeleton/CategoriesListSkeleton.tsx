import React from "react";
import Skeleton from "react-loading-skeleton";

const CategoriesListSkeleton = () => {
  return (
    <div className=" bg-white shadow-md rounded-sm px-6 py-3 text-lg capitalize max-sm:grow tracking-tight text-gray-900 hover:text-blue-500 dark:text-white">
      <Skeleton width={"70px"} height={"25px"} />
    </div>
  );
};

export default CategoriesListSkeleton;
