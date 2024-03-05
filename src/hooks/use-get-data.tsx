import { useQuery } from "@tanstack/react-query";
import { AXIOS } from "../utils/AXIOS";

type FetchTypes = {
  endpoint: string;
  limit: number;
  pages: number;
};

const useGetData = (endpoint: string, limit: number, pages: number) => {
  const fetching = async (endpoint: string, limit: number, pages: number) =>
    await AXIOS.get(
      `${endpoint}?limit=${limit.toString()}&pages=${pages.toString()}`
    );

  const query = useQuery({
    queryKey: [endpoint, limit, pages],
    queryFn: () => fetching(endpoint, limit, pages),
  });

  console.log("query data for users", query);

  return { ...query };
};

export default useGetData;
