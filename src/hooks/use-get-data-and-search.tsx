import { useEffect, useState } from "react";
import useGetData from "./use-get-data";
import { AXIOS } from "../utils/AXIOS";
import {
  QueryCache,
  QueryClient,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { searchDataQuery } from "../queries/Queries";

// type Params = {
//   endpoint: string;
//   searchEndpoint: string;
//   limit: number;
//   pages: number;
//   objectKey: string;
//   search: string;
// };

const useGetDataAndSearch = (
  endpoint: string,
  searchEndpoint: string,
  limit: number,
  pages: number,
  objectKey: string,
  search: string
) => {
  const [searchData, setSearchData] = useState([]);
  // const [searchLoading, setSearchLoading] = useState(false);
  const [searchNotFound, setSearchNotFound] = useState(true);
  const { data, isLoading, isError, refetch } = useGetData(
    endpoint,
    limit,
    pages
  );
  const entireData = data?.data?.data;
  console.log(data);

  const {
    data: hhh,
    mutateAsync,
    status,
    isPending: searchLoading,
  } = useMutation({
    mutationKey: ["search", searchEndpoint, search],
    mutationFn: () => searchDataQuery(searchEndpoint, objectKey, search),
    onSuccess: (data) => {
      // console.log("hhhhhhhhhhhhhhhhhhhhhhhhh", data);
      setSearchData(data?.data);
    },
  });

  console.log("hhhhhhhhhhhhhhh", searchNotFound);

  const handleSearch = async () => {
    try {
      // make sure you have a search value before request
      search !== "" && mutateAsync(search);
      setSearchNotFound(searchData?.length > 0 ? false : true);
    } catch (error) {
      console.log(error);
    } 
  };

  // const handleSearch = async () => {
  //   setSearchLoading(true);
  //   try {
  //     // make sure you have a search value before request
  //     const res =
  //       search !== ""
  //         ? await AXIOS.post(`/${searchEndpoint}/search?${objectKey}=${search}`)
  //         : null;
  //     setSearchData(res?.data);
  //     mutate(search);
  //     // ensure you have the data
  //     setSearchNotFound(res?.data?.length > 0 ? false : true);
  //     setSearchLoading(false);
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setSearchLoading(false);
  //   }
  // };

  // give the searched data request time to return the value with no errors
  useEffect(() => {
    const delay = 200;
    const timer = setTimeout(
      () => (search.length > 0 ? handleSearch() : null),
      delay
    );
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
