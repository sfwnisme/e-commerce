import { Button } from "flowbite-react";
import React from "react";
import Skeleton from "react-loading-skeleton";

const ProductPageSkeleton = () => {
  return (
    <div>
      <div className="box flex flex-col sm:flex-row gap-12">
        <div className="h-[400px] sm:h-[400px] xl:h-[500px] 2xl:h-[500px] sm:basis-5/12">
          <div className="w-full h-full">
            <Skeleton width={"100%"} height={"100%"} />
          </div>
        </div>
        <div className="RIGHT_SIDE flex-1 flex flex-col justify-between">
          <div className="info">
            <h3 className="title text-2xl font-bold capitalize mb-4">
              <Skeleton width={"100%"} height={"100%"} />
            </h3>
            <p className="description mb-4">
              <Skeleton width={"90%"} height={"100%"} />
              <Skeleton width={"92%"} height={"100%"} />
              <Skeleton width={"40%"} height={"100%"} />
            </p>
            <h3 className="text-xl font-medium text-blue-800 flex items-center gap-2 mb-8">
              <Skeleton width={"100px"} height={"30px"} />
              <sup>SAR</sup>
            </h3>
          </div>
          <div className="price w-full">
            <Button color="gray" outline className="w-full" disabled>
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageSkeleton;
