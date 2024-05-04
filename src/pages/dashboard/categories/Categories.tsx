import { useEffect, useState } from "react";
import { Button, Label, Select, Table, TextInput } from "flowbite-react";
import PagePagination from "../../../components/PagePagination";
import { AXIOS, CATEGORIES, CATEGORY } from "../../../utils/AXIOS";
import CategoriesList from "./CategoriesList";
import { NavLink } from "react-router-dom";
import useGetDataAndSearch from "../../../hooks/use-get-data-and-search";

const Categories = () => {
  const [limit, setLimit] = useState<number>(5);
  const [pages, setPages] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  // const handleSearch = async () => {
  //   setSearchLoading(true);
  //   try {
  //     const res =
  //       search.length > 0
  //         ? await AXIOS.post(`/category/search?title=${search}`)
  //         : null;
  //     setSearchData(res?.data);
  //     setSearchLoading(false);
  //     console.log(res?.data);
  //   } catch (error) {
  //     setSearchLoading(false);
  //     console.log(error);
  //   } finally {
  //     setSearchLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   const delay = 200;
  //   setSearchLoading(true);
  //   const timer2 = setTimeout(() => {
  //     return search.length > 0 ? handleSearch() : null;
  //   }, delay);
  //   setSearchLoading(false);
  //   return () => clearTimeout(timer2);
  // }, [search]);

  const handleLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(e?.target?.value));
    setPages(1);
  };

  const finalData = useGetDataAndSearch(
    CATEGORIES,
    CATEGORY,
    limit,
    pages,
    "title",
    search
  );

  console.log("+++++++++++finalData", finalData);

  return (
    <div className="container mx-auto px-4 mt-4">
      <div className="flex justify-between my-4">
        <h1 className="text-xl font-bold mb-2">Categories</h1>
        <NavLink to="add">
          <Button color="blue" size="sm">
            Add New
          </Button>
        </NavLink>
      </div>
      <hr className="border-gray-500 mb-2" />
      <div>
        <div className="mb-2 block">
          <Label htmlFor="search" value="search" />
        </div>
        <TextInput
          id="search"
          type="text"
          placeholder=""
          required
          shadow
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
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
            <CategoriesList
              // limit={limit}
              // pages={pages}
              // search={search}
              // searched={searchData}
              // searchLoading={searchLoading}
              finalData={finalData}
            />
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default Categories;
