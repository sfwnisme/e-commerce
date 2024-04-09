import useGetData from "../hooks/use-get-data";
import { CATEGORIES } from "../utils/AXIOS";

const CategoriesOption = () => {
  const { data } = useGetData(CATEGORIES, 99999999999, 1);
  const categories = data?.data?.data;
  const categoriesList = categories?.map(
    ({ id, title }: { id: string; title: string }) => (
      <option value={id} id={id} key={id}>
        {title}
      </option>
    )
  );

  return (
    <>
      <option value={""} selected disabled>
        select role
      </option>
      {categoriesList}
    </>
  );
};

export default CategoriesOption;
