"use client";
import { Button, Label, Select, Table, TextInput } from "flowbite-react";
import UsersList from "./UsersList";
import { useState } from "react";
import PagePagination from "../../../components/PagePagination";
import { USER, USERS } from "../../../utils/AXIOS";
import { NavLink } from "react-router-dom";
import useGetDataAndSearch from "../../../hooks/use-get-data-and-search";

const Users = () => {
  const [limit, setLimit] = useState<number>(5);
  const [pages, setPages] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const finalData = useGetDataAndSearch(
    USERS,
    USER,
    limit,
    pages,
    "name",
    search
  );

  const handleLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(e?.target?.value));
    setPages(1);
  };

  return (
    <div className="container mx-auto px-4 mt-4">
      <div className="flex justify-between my-4">
        <h1 className="text-xl font-bold mb-2">Users</h1>
        <NavLink to="add">
          <Button color="blue" size="sm">
            Add New
          </Button>
        </NavLink>
      </div>
      <hr className="border-gray-500 mb-2" />
      <div className="mb-4">
        <TextInput
          id="search"
          type="text"
          placeholder="search..."
          required
          shadow
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {search?.length === 0 ? (
        <div className="flex items-center gap-2 mb-2">
          <div className="max-w-fit">
            <div className="mb-2 block">
              <Label htmlFor="users" value="" />
            </div>
            <Select id="users" onChange={handleLimit} sizing="sm" color="gray">
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
      ) : null}
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
            <UsersList finalData={finalData} />
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
export default Users;
