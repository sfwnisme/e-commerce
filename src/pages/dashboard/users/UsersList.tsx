import useGetData from "../../../hooks/use-get-data";
import { AXIOS, USER, USERS } from "../../../utils/AXIOS";
import { Table } from "flowbite-react";
import { getTheRole } from "../../../utils/utils";
import { AiFillEdit } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  ApiIdRequest,
  DataType,
  ErrorResponseType,
  handleRemoveUserType,
} from "../../../types/Types";
import { useState } from "react";
import { toast } from "react-toastify";
import { ServerErrorResponse } from "../../../utils/HandleLoadingAndError";
import Btn from "../../../components/Btn";
import { FiTrash } from "react-icons/fi";

// const removeUserRequest = async (id) => AXIOS.delete(`${USERS}/${id}`);
const removeUserRequest: ApiIdRequest = async (id) =>
  await AXIOS.delete(`${USER}/${id}`);

const UsersList = ({ limit, pages }) => {
  const [userId, setUserId] = useState<undefined | string>(undefined);

  // users request from the custom hook
  const users = useGetData(USERS, limit, pages);

  // remove user
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: async (id: string) => await removeUserRequest(id),
  });

  const handleRemoveUser: handleRemoveUserType = async (data) => {
    const { id, name } = data;
    console.log("is it number", id);
    setUserId(id);
    try {
      const res = await mutateAsync(`${id}`);
      users?.refetch();
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
      setUserId(undefined);
    }
  };

  const usersList = users?.data?.data?.data?.map((user: DataType) => (
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
          isLoading={isPending}
        />
        <NavLink to={`edit/${user?.id}`} className="border rounded-lg">
          <Btn
            node={<AiFillEdit />}
            color="blue"
            size="sm"
            outline
            type="submit"
            isLoading={isPending}
          />
        </NavLink>
      </Table.Cell>
    </Table.Row>
  ));

  return <>{usersList}</>;
};

export default UsersList;
