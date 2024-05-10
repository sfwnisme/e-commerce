import { Button, Label, Select, Table, TextInput } from "flowbite-react";
import React, { useState } from "react";
import PagePagination from "../../../components/PagePagination";
import { PRODUCT, PRODUCTS } from "../../../utils/AXIOS";
import ProductsList from "./ProductsList";
import { NavLink } from "react-router-dom";
import useGetDataAndSearch from "../../../hooks/use-get-data-and-search";

const Products = () => {
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState<string>("");

  const handleLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(e?.target?.value));
    setPages(1); // reset the pages number to 1 to prevent empty values on changing the limit
  };

  const finalData = useGetDataAndSearch(
    PRODUCTS,
    PRODUCT,
    limit,
    pages,
    "title",
    search
  );

  return (
    <div className="container mx-auto px-4 mt-4">
      <div className="flex justify-between my-4">
        <h1 className="text-xl font-bold mb-2">Products</h1>
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
              <Label htmlFor="products" value="" />
            </div>
            <Select
              id="products"
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
      ) : null}
      <div className="overflow-x-auto border-2">
        <Table hoverable striped>
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Images</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>price</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <ProductsList finalData={finalData} />
            {/* <CategoriesList limit={limit} pages={pages} /> */}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default Products;
