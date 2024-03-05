import useGetData from "../../../hooks/use-get-data";
import { USERS } from "../../../utils/AXIOS";
import { Button, Table } from "flowbite-react";
import { getTheRole } from "../../../utils/utils";
import { HiTrash } from "react-icons/hi";
import { HiMapPin } from "react-icons/hi2";
import { AiFillEdit } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const UsersList = ({ limit, pages }) => {
  const users = useGetData(USERS, limit, pages);
  console.log(users);

  const usersList = users?.data?.data?.data?.map((user) => (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>{user?.id}</Table.Cell>
      <Table.Cell>{user?.name}</Table.Cell>
      <Table.Cell>{user?.email}</Table.Cell>
      <Table.Cell>{getTheRole(user?.role)}</Table.Cell>
      <Table.Cell className="flex items-center gap-2 font-medium text-cyan-600 hover:underline dark:text-cyan-500">
        <NavLink to="" className="border rounded-lg">
          <Button outline color="failure" size="sm">
            <HiTrash />
          </Button>
        </NavLink>
        <NavLink to="" className="border rounded-lg">
          <Button outline color="info" size="sm">
            <AiFillEdit />
          </Button>
        </NavLink>
      </Table.Cell>
    </Table.Row>
  ));

  return usersList;
};

export default UsersList;
