import { useLayoutEffect, useState } from "react";
import { Button, Label, Select, Table } from "flowbite-react";
import PagePagination from "../../../components/PagePagination";
import { CATEGORIES } from "../../../utils/AXIOS";
import CategoriesList from "./CategoriesList";
import Cookie from "cookie-universal";
import { NavLink, useLocation } from "react-router-dom";

const Categories = () => {
  const [limit, setLimit] = useState<number>(5);
  const [pages, setPages] = useState<number>(1);
  const { pathname } = useLocation();

  const cookie = Cookie();
  useLayoutEffect(() => {
    if (pages > 1) {
      cookie.set("categories-pagination", { limit: limit, pages: pages });
    }
  }, [limit, pages, location]);

  useLayoutEffect(() => {
    if (cookie.get("categories-pagination")) {
      setLimit(cookie.get("categories-pagination")?.limit);
      setPages(cookie.get("categories-pagination")?.pages);
    }
  }, []);

  const handleLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(e?.target?.value));
    setPages(1);
  };

  return (
    <div className="container mx-auto px-4 mt-4">
      <div className="flex justify-between my-4">
        <h1 className="text-xl font-bold mb-2">Categories</h1>
        <NavLink to="add">
          <Button color="blue" size='sm'>Add New</Button>
        </NavLink>
      </div>
      <hr className="border-gray-500 mb-2" />
      <div className="flex items-center gap-2 mb-2">
        <div className="max-w-fit">
          <div className="mb-2 block">
            <Label htmlFor="categories" value="" />
          </div>
          <Select
            id="categories"
            onChange={handleLimit}
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
          endpoint={CATEGORIES}
          limit={limit}
          pages={pages}
          setLimit={setLimit}
          setPages={setPages}
        />
      </div>
      <div className="overflow-x-auto border-2">
        <Table hoverable striped>
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <CategoriesList limit={limit} pages={pages} />
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default Categories;
