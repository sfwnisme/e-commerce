import { useState } from "react";
import { Label, Select, Table } from "flowbite-react";
import CategoriesList from "./CategoriesList";
import PagePagination from "../../../components/Pagination";
import { CATEGORIES, CATEGORY } from "../../../utils/AXIOS";

const Categories = () => {
  const [limit, setLimit] = useState<number>(5);
  const [pages, setPages] = useState<number>(1);
  console.log(pages);

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
