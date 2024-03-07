import { useState } from "react";
import { Table } from "flowbite-react";
import CategoriesList from "./CategoriesList";

const Categories = () => {
  const [limit, setLimit] = useState<number>(10000);
  const [pages, setPages] = useState<number>(1);

  return (
    <div className="container mx-auto px-4 mt-4">
      <h1 className="text-xl font-bold mb-2">Categories</h1>
      <hr className="border-gray-500 mb-2" />
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
