import React from "react";
import WebsiteProductsList from "./WebsiteProductsList";
import SectionTitle from "../../../components/SectionTitle";
import useGetTheCategoryTitle from "../../../hooks/useGetTheCategoryTitle";

const WebsiteProducts = () => {
  const categoryTitle = useGetTheCategoryTitle();
  console.log(categoryTitle);
  return (
    <div>
      <SectionTitle title={categoryTitle || "Products"} />
      <WebsiteProductsList />
    </div>
  );
};

export default WebsiteProducts;
