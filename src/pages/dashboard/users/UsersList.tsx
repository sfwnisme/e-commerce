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
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { ServerErrorResponse } from "../../../utils/HandleLoadingAndError";
import Btn from "../../../components/Btn";
import { FiTrash } from "react-icons/fi";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

// const removeUserRequest = async (id) => AXIOS.delete(`${USERS}/${id}`);
const removeUserRequest: ApiIdRequest = async (id) =>
  await AXIOS.delete(`${USER}/${id}`);

const UsersList = ({ limit, pages }) => {
  const [userId, setUserId] = useState<number>();
  const userIdRef = useRef<number | null>(null);
  // users request from the custom hook
  const { data, isLoading, isError } = useGetData(USERS, limit, pages);
  const usersDATA = data?.data?.data;
  // console.log("user id res ===================", userIdRef);

  // remove user
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: async (id: string) => await removeUserRequest(id),
  });

  const handleRemoveUser: handleRemoveUserType = async (data) => {
    const { id, name } = data;
    console.log("is it number", id);
    setUserId(id);
    userIdRef.current = Number(id);
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

  const dummyArray = Array.apply(null, Array(limit));
  const usersListLoading = dummyArray?.map(() => (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell colSpan={12} style={{ textAlign: "left" }}>
        <Skeleton width="100%" />
      </Table.Cell>
    </Table.Row>
  ));

  const usersList = usersDATA?.map((user: DataType) => (
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
          />
        </NavLink>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <>
      {isLoading
        ? usersListLoading
        : usersDATA?.length <= 0 && !isLoading
        ? usersListNotfound
        : usersList}
      {/* {usersList} */}
      {/* {usersListLoading} */}
      {/* {usersListNotfound} */}
    </>
  );
};

export default UsersList;
