import React from "react";
import { AXIOS, CATEGORIES } from "../../../utils/AXIOS";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "flowbite-react";
import { NavLink } from "react-router-dom";
import { dummyArray, shortTheText } from "../../../utils/utils";
import CategoriesNavSkeleton from "../../../components/skeleton/CategoriesNavSkeleton";

const NavCategories = () => {
  const fetching = async () => await AXIOS.get(`/${CATEGORIES}`);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetching(),
  });

  // sliced categories to avoid over the limitation
  const returnedData = data?.data?.slice(0, 8);

  // the categories links
  const showData = returnedData?.map((data: { id: number; title: string }) => (
    <NavLink to={`/categories/${data?.id}`} key={data?.id}>
      {({ isActive }) => (
        <Navbar.Link
          className={`hover:!text-blue-500 ${
            isActive ? "text-blue-500" : null
          }`}
        >
          {shortTheText(data?.title, 8).toUpperCase()}
        </Navbar.Link>
      )}
    </NavLink>
  ));

  // the loading skeleton
  const showLoading = dummyArray(7).map(() => <CategoriesNavSkeleton />);

  return (
    <Navbar.Collapse>
      {isLoading ? (
        showLoading
      ) : (
        <>
          {showData}
          <NavLink to="/categories">
            <Navbar.Link className="!border border-blue-200 rounded !px-1 hover:!text-blue-500">
              SEE ALL
            </Navbar.Link>
          </NavLink>
        </>
      )}
    </Navbar.Collapse>
  );
};

export default NavCategories;
