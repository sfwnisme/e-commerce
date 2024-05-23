import WebsiteProductsList from "./WebsiteProductsList";
import SectionTitle from "../../../components/SectionTitle";
import useGetTheCategoryTitle from "../../../hooks/useGetTheCategoryTitle";

const WebsiteProducts = ({ productsType }) => {
  const categoryTitle = useGetTheCategoryTitle(productsType);
  console.log(categoryTitle);
  return (
    <div className="py-12">
      <SectionTitle
        title={categoryTitle || productsType.split("-").join(" ") || "Products"}
      />
      <WebsiteProductsList productsType={productsType} />
    </div>
  );
};

export default WebsiteProducts;
