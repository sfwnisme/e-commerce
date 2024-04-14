import useGetData from "../hooks/use-get-data";
import { CATEGORIES } from "../utils/AXIOS";
type CategoriesType = Record<"id" | "title", string>;

const CategoriesOption = () => {
  const { data } = useGetData(CATEGORIES, 99999999999, 1);
  const categories = data?.data?.data;
  const categoriesList = categories?.map(({ id, title }: CategoriesType) => (
    <option value={id} id={id} key={id}>
      {title}
    </option>
  ));

  return (
    <>
      <option value={""} selected disabled>
        select category
      </option>
      {categoriesList}
    </>
  );
};

export default CategoriesOption;
