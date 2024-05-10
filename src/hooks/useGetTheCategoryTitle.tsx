import React from "react";
import useGetSingleData from "./use-get-single-data";
import { CATEGORY } from "../utils/AXIOS";
import { useParams } from "react-router-dom";

const useGetTheCategoryTitle = () => {
  const { id } = useParams();
  const { data: theCategory } = useGetSingleData(CATEGORY, id);
  let categoryTitle;
  if (window?.location?.pathname === `/categories/${id}`) {
    console.log(true);
    categoryTitle = theCategory?.data?.title;
  } else {
    categoryTitle = "";
  }

  return categoryTitle;
};

export default useGetTheCategoryTitle;
