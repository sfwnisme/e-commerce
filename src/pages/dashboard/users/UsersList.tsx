import { Table } from "flowbite-react";
import { dummyArray, getTheRole } from "../../../utils/utils";
import { AiFillEdit } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  DataType,
  ErrorResponseType,
  handleRemoveUserType,
} from "../../../types/Types";
import { useRef } from "react";
import { toast } from "react-toastify";
import { ServerErrorResponse } from "../../../utils/HandleLoadingAndError";
import Btn from "../../../components/Btn";
import { FiTrash } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import { IUser, userDeleteQuery } from "../../../queries/Queries";

interface IProps {
  finalData: {
    dataOrSearch: IUser[];
    limit: number;
    pages?: number;
    isLoading: boolean;
    searchLoading: boolean;
    isError: boolean;
    search: string;
    searchNotFound: boolean;
    dataNotFound: boolean;
    refetch: () => void;
  };
}

// const removeUserRequest: ApiIdRequest = async (id) =>
//   await AXIOS.delete(`${USER}/${id}`);

const UsersList: React.FC<IProps> = ({ finalData }) => {
  const userIdRef = useRef<number | null>(null);

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

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: (id: string) => userDeleteQuery(id),
  });
  const handleRemoveUser: handleRemoveUserType = async (data) => {
    const { id, name } = data;
    userIdRef.current = Number(id);
    try {
      const res = await mutateAsync(`${id}`);
      refetch();
      console.log("remove user done", res);
      toast(`user "${name}" deleted `, {
        type: "success",
      });
    } catch (error) {
      console.log(error);
      toast(ServerErrorResponse(error as ErrorResponseType), {
        type: "error",
      });
    } finally {
      userIdRef.current = null;
    }
  };

  const usersListNotfound = (
    <>
      <Table.Row>
        <Table.Cell colSpan={12} style={{ textAlign: "center" }}>
          Users not found
        </Table.Cell>
      </Table.Row>
    </>
  );

  const usersListLoading = dummyArray(limit)?.map(() => (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell colSpan={12} style={{ textAlign: "left" }}>
        <Skeleton width="100%" />
      </Table.Cell>
    </Table.Row>
  ));

  const usersListError = (
    <Table.Row>
      <Table.Cell colSpan={12} style={{ textAlign: "center" }}>
        Error!?
      </Table.Cell>
    </Table.Row>
  );

  const usersList = dataOrSearch?.map((user: DataType) => (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>{user?.id}</Table.Cell>
      <Table.Cell>{user?.name}</Table.Cell>
      <Table.Cell>{user?.email}</Table.Cell>
      <Table.Cell>{getTheRole(user?.role ?? "unknown")}</Table.Cell>
      <Table.Cell className="flex items-center gap-2 font-medium text-cyan-600 hover:underline dark:text-cyan-500">
        <Btn
          node={<FiTrash />}
          color="failure"
          size="sm"
          outline
          type="submit"
          isValid={true}
          isLoading={userIdRef.current == user?.id ? isPending : false}
          onClick={() => handleRemoveUser(user)}
        />
        <NavLink to={`edit/${user?.id}`} className="border rounded-lg">
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
  if (isLoading || (search !== "" && searchLoading)) return usersListLoading;

  if ((dataNotFound && !isLoading) || (search !== "" && searchNotFound))
    return usersListNotfound;

  if (!isLoading && isError) return usersListError;

  return usersList;
};

export default UsersList;
