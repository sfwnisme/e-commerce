"use client";
import { Label, Select, Table } from "flowbite-react";
import UsersList from "./UsersList";
import { useEffect, useLayoutEffect, useState } from "react";
import PagePagination from "../../../components/PagePagination";
import { USERS } from "../../../utils/AXIOS";
import Cookie from "cookie-universal";

const Users = () => {
  const [limit, setLimit] = useState<number>(5);
  const [pages, setPages] = useState<number>(1);

  const cookie = Cookie();
  useLayoutEffect(() => {
    if (pages > 1) {
      // cookie.remove('users-pagination')
      cookie.set("users-pagination", { limit: limit, pages: pages });
    }
  }, [limit, pages]);

  useEffect(() => {
    if (cookie.get("users-pagination")?.pages) {
      setLimit(cookie.get("users-pagination")?.limit);
      setPages(cookie.get("users-pagination")?.pages);
    } else {
      setPages(1);
    }
    console.log("checker");
  }, []);

  console.log(cookie.get("users-pagination")?.pages);

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
            <option value={3}>3</option>
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
