import { AXIOS, PRODUCTS } from "../../../utils/AXIOS";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../../components/ProductCard";
import { dummyArray } from "../../../utils/utils";
import ProductCardSkeleton from "../../../components/skeleton/ProductCardSkeleton";
import { useParams } from "react-router-dom";
import { Alert } from "flowbite-react";

interface IProduct {
  id: number;
  images: { image: string }[];
  title: string;
  price: number;
  category: number;
}

const WebsiteProductsList = () => {
  const fetching = async () => await AXIOS.get(PRODUCTS);
  const { data, isLoading, isError } = useQuery({
    queryKey: [PRODUCTS],
    queryFn: () => fetching(),
  });

  const { id } = useParams<string>();

  const filterProductsByCategory = data?.data?.filter(
    (product: IProduct) => product?.category === +id!
  );

  console.log(filterProductsByCategory);
  // filter by the category
  const theDisplayedProducts =
    !isLoading && filterProductsByCategory?.length !== 0 && id !== undefined
      ? filterProductsByCategory
      : data?.data;

  // display the products data
  const showData = theDisplayedProducts?.map((product: IProduct) => (
    <ProductCard
      id={product?.id}
      image={product?.images[0]?.image}
      title={product?.title}
      price={product?.price}
    />
  ));

  const showLoading = dummyArray(10).map(() => <ProductCardSkeleton />);
  const showEmpty = (
    <Alert color={isError ? "red" : "yellow"}>
      {isError ? "server error" : "there is no products"}
    </Alert>
  );
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {isLoading
        ? showLoading
        : !isLoading && id && filterProductsByCategory?.length === 0
        ? showEmpty
        : showData}
    </div>
  );
};

export default WebsiteProductsList;
