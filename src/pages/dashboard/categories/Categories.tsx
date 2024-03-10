import { useLayoutEffect, useState } from "react";
import { Label, Select, Table } from "flowbite-react";
import PagePagination from "../../../components/PagePagination";
import { CATEGORIES } from "../../../utils/AXIOS";
import CategoriesList from "./CategoriesList";
import Cookie from "cookie-universal";
import { useLocation } from "react-router-dom";

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

  return (
    <div className="container mx-auto px-4 mt-4">
      <h1 className="text-xl font-bold mb-2">Categories</h1>
      <hr className="border-gray-500 mb-2" />
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
