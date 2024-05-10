import { useQuery } from "@tanstack/react-query";
import { AXIOS, CATEGORIES } from "../../../utils/AXIOS";
import { NavLink } from "react-router-dom";
import { dummyArray } from "../../../utils/utils";
import CategoriesNavSkeleton from "../../../components/skeleton/CategoriesNavSkeleton";
import CategoriesListSkeleton from "../../../components/skeleton/CategoriesListSkeleton";

interface ICategory {
  id: number;
  title: string;
}

const WebsiteCategoriesList = () => {
  const fetching = async () => await AXIOS.get(CATEGORIES);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetching(),
  });
  console.log(data?.data);

  const showData = data?.data?.map((category: ICategory) => (
    <NavLink
      to={`/categories/${category?.id}`}
      className=" bg-white shadow-md rounded-sm px-6 py-3 text-lg capitalize max-sm:grow tracking-tight text-gray-900 hover:text-blue-500 dark:text-white"
      key={category?.id}
    >
      <h5 className="">{category?.title}</h5>
    </NavLink>
  ));

  const showLoading = dummyArray(10).map(() => <CategoriesListSkeleton />);
  return (
    <div className="flex flex-wrap gap-2">
      {isLoading ? showLoading : showData}
    </div>
  );
};

export default WebsiteCategoriesList;
