import { Badge, Button } from "flowbite-react";
import React from "react";
import Skeleton from "react-loading-skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="w- grid place-items-center gap-2 bg-white border border-gray-200 rounded p-2 cursor-pointer hover:shadow-md duration-150">
      {/* <img
        // src={image}
        // alt={title}
        // title={title}
        className="self-start w-full h-auto aspect-square object-contain"
      /> */}
      <div className="w-full">
        <Skeleton
          // width="100%"
          height="267px"
          // className="self-start w-full h-auto aspect-square object-contain"
        />
      </div>
      <div className="grid gap-2 w-full self-end h-full">
        <Skeleton height="25px" />
        <h3 className="flex items-center gap-2">
          <Skeleton height="25px" width="100px" />
          <Skeleton height="25px" width="40px" />
        </h3>
        <div className="w-full self-end">
          <h3 className="mb-2 font-medium flex items-center">
            <Skeleton height="25px" width="100px" />
            <sup className="ml-1">SAR</sup>
          </h3>
          <Button color="gray" size="sm" className="w-full" disabled>
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
