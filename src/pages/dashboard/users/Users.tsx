"use client";
import { Label, Select, Table } from "flowbite-react";
import UsersList from "./UsersList";
import { useState } from "react";

const Users = () => {
  const [limit, setLimit] = useState<number>(100);
  const [pages, setPages] = useState<number>(1);

  // const handleRemoveUser = async () => {};

  return (
    <div className="container mx-auto px-4 mt-4">
      <h1 className="text-xl font-bold mb-2">Users</h1>
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="roles" value="Select the role" />
        </div>
        <Select
          id="countries"
          required
          onChange={(e) => setLimit(parseInt(e?.target?.value))}
        >
          <option>5</option>
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </Select>
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
