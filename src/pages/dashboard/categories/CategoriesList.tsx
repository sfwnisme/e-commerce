import { useMutation } from "@tanstack/react-query";
import { Alert, Table } from "flowbite-react";
import { AXIOS, CATEGORIES, CATEGORY } from "../../../utils/AXIOS";
import { CategoriesDataType, ErrorResponseType } from "../../../types/Types";
import useGetData from "../../../hooks/use-get-data";
import { FiTrash } from "react-icons/fi";
import Btn from "../../../components/Btn";
import { NavLink } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { ServerErrorResponse } from "../../../utils/HandleLoadingAndError";
import { toast } from "react-toastify";
import { useRef } from "react";
import Skeleton from "react-loading-skeleton";
import { dummyArray } from "../../../utils/utils";

interface Props {
  entireData: any[];
  dataOrSearch: any[];
  limit: number;
  pages: number;
  isLoading: boolean;
  searchLoading: boolean;
  isError: boolean;
  search: string;
  searchNotFound: boolean;
  refetch: () => void;
}
type DataType = {
  id?: number | undefined;
  title?: string | undefined;
  image?: string | undefined;
};

const CategoriesList = ({ finalData }: { finalData: Props }) => {
  const categoryIdRef = useRef<number | null>(null); // get exact deleted element to handle its loading

  const {
    entireData,
    dataOrSearch,
    limit,
    pages,
    isLoading,
    searchLoading,
    isError,
    search,
    searchNotFound,
    refetch,
  } = finalData;

  // const { data, isLoading } = useGetData(CATEGORIES, limit, pages);
  // const categoriesDATA = data?.data?.data;

  // you must to insure the search is not empty to display the searched data
  // if you deleted the entire search input's value you will get the last searched related letters or words, so you need to ensure the search is not empty
  // const dataOrSearch =
  //   searched.length > 0 && search !== "" ? searched : categoriesDATA;

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["deletecategory"],
    mutationFn: async (id: number | undefined) =>
      await AXIOS.delete(`${CATEGORY}/${id}`),
  });

  const handleRemoveCategory: (data: DataType) => Promise<void> = async (
    data
  ) => {
    categoryIdRef.current = Number(data?.id);
    try {
      const res = await mutateAsync(data?.id);
      toast.success(`"${data?.title}" Category deleted successfully`);
      refetch();
      console.log(res);
    } catch (error) {
      toast.error(ServerErrorResponse(error as ErrorResponseType));
      console.log(ServerErrorResponse(error as ErrorResponseType));
    } finally {
      categoryIdRef.current = null;
    }
  };

  const categoriesListNotfound = (
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
              <span className="font-medium">Data alert!</span> No categories
              found!.
            </Alert>
          )}
        </Table.Cell>
      </Table.Row>
    </>
  );

  const categoriesListLoading = dummyArray(limit)?.map(() => (
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

  const categoriesList = dataOrSearch?.map((category: CategoriesDataType) => (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>{category?.id}</Table.Cell>
      <Table.Cell>{category?.title}</Table.Cell>
      <Table.Cell>
        {<img src={category?.image} alt="" className="h-16" />}
      </Table.Cell>
      <Table.Cell className="flex items-center gap-2 font-medium text-cyan-600 hover:underline dark:text-cyan-500">
        <Btn
          node={<FiTrash />}
          color="failure"
          size="sm"
          outline
          type="submit"
          isValid={true}
          isLoading={categoryIdRef.current === category?.id ? isPending : false}
          onClick={() => handleRemoveCategory(category)}
        />
        <NavLink to={`edit/${category?.id}`} className="border rounded-lg">
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

  return isLoading || (search !== "" && searchLoading)
    ? categoriesListLoading
    : (entireData.length === 0 && !isLoading) ||
      (search !== "" && searchNotFound)
    ? categoriesListNotfound
    : categoriesList;
};

export default CategoriesList;

// return isLoading || (search !== "" && searchLoading)
// ? categoriesListLoading
// : (categoriesDATA.length === 0 && !isLoading) ||
//   (search !== "" && searched.length === 0)
// ? categoriesListNotfound
// : categoriesList;
