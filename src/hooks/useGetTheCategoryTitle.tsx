import { AXIOS, CATEGORIES, CATEGORY } from "../utils/AXIOS";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const useGetTheCategoryTitle = () => {
  const { id } = useParams();
  const theId: number = Number(id);

  //NOTE: I got the entire categories because
  //      single category endpoint is not authorized for public
  const fetching = async () => await AXIOS.get(CATEGORIES);
  const { data } = useQuery({
    queryKey: [CATEGORY, Number(id)],
    queryFn: () => (theId ? fetching() : null),
  });

  const theCategoriesData: { id: number; title: string }[] = data?.data;

  const getTheCategoryTitle = theCategoriesData?.find(
    (cate) => cate?.id === theId
  );

  let categoryTitle;
  if (window?.location?.pathname === `/categories/${id}`) {
    categoryTitle = getTheCategoryTitle?.title;
  } else {
    categoryTitle = "";
  }

  return categoryTitle;
};

export default useGetTheCategoryTitle;
