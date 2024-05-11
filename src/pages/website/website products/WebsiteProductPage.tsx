import { Button, Carousel } from "flowbite-react";
import React from "react";
import useGetSingleData from "../../../hooks/use-get-single-data";
import { PRODUCT } from "../../../utils/AXIOS";
import { useParams } from "react-router-dom";
import ProductPageSkeleton from "../../../components/skeleton/ProductPageSkeleton";

interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discount: number;
  images: { id: number; image: string }[];
}

const WebsiteProductPage = () => {
  const { id } = useParams<string>();

  const { data, isLoading, isError } = useGetSingleData(PRODUCT, Number(id));

  const theProduct = data?.data?.[0];

  console.log(theProduct);

  // const { id, title, description, price, discount, images }
  // console.log(id);
  const theImages = theProduct?.images?.map(
    (image: { id: string; image: string }) => (
      <img
        src={image?.image}
        alt={image?.image}
        className="h-auto w-96 aspect-square object-contain"
        key={image?.id}
      />
    )
  );

  const showTheProductInfo = (
    <div>
      <div className="box flex flex-col sm:flex-row gap-12">
        <div className="h-[400px] sm:h-[400px] xl:h-[500px] 2xl:h-[500px] border sm:basis-5/12">
          <Carousel>{theImages}</Carousel>
        </div>
        <div className="RIGHT_SIDE flex-1 flex flex-col justify-between">
          <div className="info">
            <h3 className="title text-2xl font-bold capitalize mb-4">
              {theProduct?.title}
            </h3>
            <p className="description mb-4">{theProduct?.description}</p>
            <h3 className="text-xl font-medium text-blue-800 mb-8">
              {theProduct?.price} <sup>SAR</sup>
            </h3>
            <p className="description mt-4">{theProduct?.About}</p>
          </div>
          <div className="price w-full">
            <Button color="gray" outline className="w-full">
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const showTheFinalDOM = isLoading ? (
    <ProductPageSkeleton />
  ) : (
    showTheProductInfo
  );
  return showTheFinalDOM;
};

export default WebsiteProductPage;
