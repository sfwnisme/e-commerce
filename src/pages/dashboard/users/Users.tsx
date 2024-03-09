"use client";
import { Label, Select, Table } from "flowbite-react";
import UsersList from "./UsersList";
import { useState } from "react";
import PagePagination from "../../../components/Pagination";
import { USERS } from "../../../utils/AXIOS";

const Users = () => {
  const [limit, setLimit] = useState<number>(3);
  const [pages, setPages] = useState<number>(1);

  // const handleRemoveUser = async () => {};

  return (
    <div className="container mx-auto px-4 mt-4">
      <h1 className="text-xl font-bold mb-2">Users</h1>
      <div className="flex items-center gap-2 mb-2">
        <div className="max-w-fit">
          <div className="mb-2 block">
            <Label htmlFor="categories" value="" />
          </div>
          <Select
            id="categories"
            onChange={(e) => setLimit(parseInt(e?.target?.value))}
            sizing="sm"
            color="gray"
          >
            <option selected value={5}>
              5
            </option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </Select>
        </div>
        <PagePagination
          endpoint={USERS}
          limit={limit}
          pages={pages}
          setLimit={setLimit}
          setPages={setPages}
        />
      </div>
      <hr className="border-gray-500 mb-2" />
      <div className="overflow-x-auto border-2">
        <Table hoverable striped>
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <UsersList limit={limit} pages={pages} />
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
export default Users;
