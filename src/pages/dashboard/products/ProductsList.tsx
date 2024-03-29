import { Table } from "flowbite-react";
import { dummyArray } from "../../../utils/utils";
import Skeleton from "react-loading-skeleton";
import useGetData from "../../../hooks/use-get-data";
import { PRODUCTS } from "../../../utils/AXIOS";
import Btn from "../../../components/Btn";
import { FiTrash } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { useRef } from "react";

interface Props {
  limit: number;
  pages: number;
}
interface DataType<T> {
  id: number;
  category: string;
  title: string;
  description: string;
  rating?: T;
  ratings_number?: number;
  price?: number;
  discount?: number;
  About?: string;
  status?: string | boolean;
  created_at?: Date | string;
  updated_at?: Date | string;
}
const ProductsList = ({ limit, pages }: Props) => {
  const productIdRef = useRef<number | null>(null);

  const { data, isLoading, isError } = useGetData(PRODUCTS, limit, pages);
  // id | category | title | description | price | discount | About | created_at | updated_at
  const productsDATA = data?.data?.data;
  console.log("products", productsDATA);
  console.log(isError);

  const handleRemoveProduct = (data: DataType<string>) => {
    console.log(data);
  };

  const productsListNotfound = (
    <>
      <Table.Row>
        <Table.Cell colSpan={12} style={{ textAlign: "center" }}>
          Products Not Found
        </Table.Cell>
      </Table.Row>
    </>
  );

  const productsListLoading = dummyArray(limit).map(() => (
    <Table.Row>
      <Table.Cell colSpan={12} style={{ textAlign: "center" }}>
        <Skeleton width="100%" />
      </Table.Cell>
    </Table.Row>
  ));
  const productsListError = (
    <Table.Row>
      <Table.Cell colSpan={12} style={{ textAlign: "center" }}>
        Error!?
      </Table.Cell>
    </Table.Row>
  );

  const productsList = productsDATA?.map(
    (product: DataType<string | number>) => (
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell>{product?.id}</Table.Cell>
        <Table.Cell>{product?.title}</Table.Cell>
        <Table.Cell>
          {product?.category}
          {/* {<img src={product?.image} alt="" className="h-16" />} */}
        </Table.Cell>
        <Table.Cell>{product?.price}</Table.Cell>
        <Table.Cell>{product?.description}</Table.Cell>
        <Table.Cell className="flex items-center gap-2 font-medium text-cyan-600 hover:underline dark:text-cyan-500">
          <Btn
            node={<FiTrash />}
            color="failure"
            size="sm"
            outline
            type="submit"
            // isLoading={productIdRef.current === product?.id ? isPending : false}
            onClick={() => handleRemoveProduct(product as DataType<string>)}
          />
          <NavLink to={`edit/${product?.id}`} className="border rounded-lg">
            <Btn
              node={<AiFillEdit />}
              color="blue"
              size="sm"
              outline
              type="submit"
            />
          </NavLink>
        </Table.Cell>
      </Table.Row>
    )
  );

  return isLoading
    ? productsListLoading
    : productsDATA?.length === 0 && !isLoading
    ? productsListNotfound
    : isError && !isLoading
    ? productsListError
    : productsList;
};

export default ProductsList;
