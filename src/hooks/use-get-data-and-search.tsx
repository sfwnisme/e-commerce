import { useEffect, useState } from "react";
import useGetData from "./use-get-data";
import { AXIOS } from "../utils/AXIOS";

type Params = {
  endpoint: string;
  searchEndpoint: string;
  limit: number;
  pages: number;
  objectKey: string;
  search: string;
};

const useGetDataAndSearch = (
  endpoint: string,
  searchEndpoint: string,
  limit: number,
  pages: number,
  objectKey: string,
  search: string
) => {
  const [searchData, setSearchData] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchNotFound, setSearchNotFound] = useState(true);
  const { data, isLoading, isError, refetch } = useGetData(
    endpoint,
    limit,
    pages
  );
  const entireData = data?.data?.data;
  console.log(data);

  const handleSearch = async () => {
    setSearchLoading(true);
    try {
      // make sure you have a search value before request
      const res =
        search !== ""
          ? await AXIOS.post(`/${searchEndpoint}/search?${objectKey}=${search}`)
          : null;
      setSearchData(res?.data);
      // ensure you have the data
      setSearchNotFound(res?.data?.length > 0 ? false : true);
      setSearchLoading(false);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setSearchLoading(false);
    }
  };

  // give the searched data request time to return the value with no errors
  useEffect(() => {
    const delay = 200;
    setSearchLoading(true);
    const timer = setTimeout(
      () => (search.length > 0 ? handleSearch() : null),
      delay
    );
    setSearchLoading(false);
    return () => clearTimeout(timer);
  }, [search]);

  // return the original data or the searched data in a single variable to prevent duplications
  const dataOrSearch =
    searchData?.length > 0 && search !== "" ? searchData : entireData;

  const finalData = {
    entireData,
    dataOrSearch,
    limit,
    pages,
    isLoading,
    searchLoading,
    isError,
    search,
    searchNotFound,
    refetch,
  };

  return finalData;
};

export default useGetDataAndSearch;
