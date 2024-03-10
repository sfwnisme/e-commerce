import { useMutation } from "@tanstack/react-query";
import { Table } from "flowbite-react";
import { AXIOS, CATEGORIES, CATEGORY } from "../../../utils/AXIOS";
import { CategoriesDataType, ErrorResponseType } from "../../../types/Types";
import useGetData from "../../../hooks/use-get-data";
import { FiTrash } from "react-icons/fi";
import Btn from "../../../components/Btn";
import { NavLink } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { ServerErrorResponse } from "../../../utils/HandleLoadingAndError";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";

export const CategoriesList = ({ limit, pages }) => {
  const categoryIdRef = useRef<number | null>(null);

  useEffect(() => {
    return localStorage.setItem("categories-pagination", {
      limit: limit,
      pages: pages,
    });
  }, [limit, pages]);

  const categories = useGetData(CATEGORIES, limit, pages);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (id: number | undefined) =>
      await AXIOS.delete(`${CATEGORY}/${id}`),
  });
  type DataType = {
    id?: number | undefined;
    title?: string | undefined;
    image?: string | undefined;
  };
  const handleRemoveCategory: (data: DataType) => Promise<void> = async (
    data
  ) => {
    categoryIdRef.current = Number(data?.id);
    try {
      const res = await mutateAsync(data?.id);
      toast.success(`"${data?.title}" Category deleted successfully`);
      console.log(res);
    } catch (error) {
      toast.error(ServerErrorResponse(error as ErrorResponseType));
      console.log(ServerErrorResponse(error as ErrorResponseType));
    } finally {
      categoryIdRef.current = null;
    }
  };

  const categoriesList = categories?.data?.data?.data?.map(
    (category: CategoriesDataType) => (
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
            isLoading={
              categoryIdRef.current === category?.id ? isPending : false
            }
            onClick={() => handleRemoveCategory(category)}
          />
          <NavLink to={`edit/${category?.id}`} className="border rounded-lg">
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

  return categoriesList;
};
