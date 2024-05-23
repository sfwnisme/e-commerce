import {
  PRODUCTS,
  PRODUCTS_LATEST,
  PRODUCTS_LATEST_SALE,
  PRODUCTS_TOP_RATED,
} from "../../utils/AXIOS";
import Hero from "./Hero";
import WebsiteProducts from "./website products/WebsiteProducts";

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <WebsiteProducts productsType={PRODUCTS_TOP_RATED} />
      <WebsiteProducts productsType={PRODUCTS_LATEST} />
      <WebsiteProducts productsType={PRODUCTS_LATEST_SALE} />
      <WebsiteProducts productsType={PRODUCTS} />
      <WebsiteProducts productsType={PRODUCTS} />
    </div>
  );
};

export default LandingPage;
