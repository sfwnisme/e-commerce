import { Label, Select, Table } from "flowbite-react";
import React, { useState } from "react";
import PagePagination from "../../../components/PagePagination";
import { PRODUCTS } from "../../../utils/AXIOS";
import ProductsList from "./ProductsList";

const Products = () => {
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState(1);

  const handleLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(e?.target?.value));
    setPages(1); // reset the pages number to 1 to prevent empty values on changing the limit
  };

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
          endpoint={PRODUCTS}
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
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <ProductsList limit={limit} pages={pages} />
            {/* <CategoriesList limit={limit} pages={pages} /> */}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default Products;
