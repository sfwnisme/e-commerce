import { useQuery } from "@tanstack/react-query";
import { AXIOS } from "../utils/AXIOS";

const useGetData = (endpoint: string, limit: number, pages: number) => {
  // sorting data
  const sortByDate = (a: string, b: string) =>
    new Date(b.created_at) - new Date(a.created_at);

  // fetching data
  const fetching = async () =>
    await AXIOS.get(`${endpoint}?limit=${limit || 5}&page=${pages || 1}`);

  const query = useQuery({
    queryKey: [endpoint, limit, pages],
    queryFn: fetching,
    // gcTime: 0,
    // select: (items) => items?.data?.data?.sort(sortByDate),
  });

  return { ...query };
};

export default useGetData;
