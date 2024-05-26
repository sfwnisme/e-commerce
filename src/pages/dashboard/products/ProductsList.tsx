import { Alert, Table } from "flowbite-react";
import { dummyArray } from "../../../utils/utils";
import Skeleton from "react-loading-skeleton";
import useGetData from "../../../hooks/use-get-data";
import { AXIOS, CATEGORIES, PRODUCT } from "../../../utils/AXIOS";
import Btn from "../../../components/Btn";
import { FiTrash } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { IProduct } from "../../../queries/Queries";

interface IProps {
  finalData: {
    dataOrSearch: IProduct[];
    limit: number;
    pages: number;
    isLoading: boolean;
    searchLoading: boolean;
    isError: boolean;
    search: string;
    searchNotFound: boolean;
    dataNotFound: boolean;
    refetch: () => void;
  };
}

const removeUserRequest = async (id: string) =>
  await AXIOS.delete(`${PRODUCT}/${id}`);

const ProductsList: React.FC<IProps> = ({ finalData }) => {
  const productIdRef = useRef<number | null>(null);

  const {
    dataOrSearch,
    limit,
    isLoading,
    searchLoading,
    isError,
    search,
    searchNotFound,
    dataNotFound,
    refetch,
  } = finalData;

  /** 
   * I did not use the single data hook to not include it into the DOM, because it occur the following error
   * Unexpected Application Error!
     Rendered more hooks than during the previous render.
     Error: Rendered more hooks than during the previous render.
   */
  const { data: categories } = useGetData(CATEGORIES, 99999999, 1);
  const theCategory = (id: number) =>
    categories?.data?.data?.find(
      (cate: {
        id?: number;
        title?: string;
        image?: string;
        created_at?: string;
        updated_at?: string;
      }) => cate?.id === +id
    );

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["deleteproduct", productIdRef?.current],
    mutationFn: async (id: string) => await removeUserRequest(id),
  });

  console.log("aklsdjlajsdf", productIdRef);
  const handleRemoveProduct = async (id: number) => {
    productIdRef.current = Number(id);
    console.log(id);
    try {
      await mutateAsync(`${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    } finally {
      productIdRef.current = null;
    }
  };

  const productsListNotfound = (
    <>
      <Table.Row>
        <Table.Cell colSpan={12} style={{ textAlign: "center" }}>
          {search !== "" && searchNotFound ? (
            <Alert color="warning" rounded>
              <span className="font-medium">Search alert!</span> The data you
              are searching for is not found!.
            </Alert>
          ) : (
            <Alert color="warning" rounded>
              <span className="font-medium">Data alert!</span> No products
              found!.
            </Alert>
          )}
        </Table.Cell>
      </Table.Row>
    </>
  );

  const productsListLoading = dummyArray(limit).map(() => (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell colSpan={12} style={{ textAlign: "center" }}>
        {search !== "" && searchLoading ? (
          "Searching..."
        ) : (
          <Skeleton width="100%" />
        )}
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

  const productsList = dataOrSearch?.map((product: IProduct) => (
    <Table.Row
      className="bg-white dark:border-gray-700 dark:bg-gray-800"
      key={product?.id}
    >
      <Table.Cell>{product?.id}</Table.Cell>
      <Table.Cell>{product?.title}</Table.Cell>
      <Table.Cell className="grid grid-cols-2">
        {product?.images?.map((img) => (
          <img
            src={img?.image}
            title={img?.image}
            key={img?.id.toString()}
            id={img?.id.toString()}
            className="w-20"
          />
        ))}
      </Table.Cell>
      <Table.Cell>{theCategory(product?.category)?.title}</Table.Cell>
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
          isValid={true}
          isLoading={productIdRef.current === product?.id ? isPending : false}
          onClick={() => handleRemoveProduct(product?.id)}
        />
        <NavLink to={`edit/${product?.id}`} className="border rounded-lg">
          <Btn
            node={<AiFillEdit />}
            color="blue"
            size="sm"
            outline
            type="submit"
            isValid={true}
            isLoading={false}
          />
        </NavLink>
      </Table.Cell>
    </Table.Row>
  ));

  // the returned DOM
  if (isLoading || (search !== "" && searchLoading)) return productsListLoading;
  if ((dataNotFound && !isLoading) || (search !== "" && searchNotFound))
    return productsListNotfound;

  if (!isLoading && isError) return productsListError;

  return productsList;
};

export default ProductsList;
