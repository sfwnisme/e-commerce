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
  description?: string;
  price: number;
  discount?: number;
  category?: number;
  rating?: number;
  ratings_number?: number;
}

const WebsiteProductsList = ({ productsType }: { productsType: string }) => {
  location?.pathname?.split("/")[1] === "categories" ? PRODUCTS : productsType;
  const fetching = async () => await AXIOS.get(productsType);
  const { data, isLoading, isError } = useQuery({
    queryKey: [productsType],
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
      description={product?.description}
      price={product?.price}
      discount={product?.discount}
      rating={product?.rating}
      ratings_number={product?.ratings_number}
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
