import { useQuery } from "@tanstack/react-query";
import { AXIOS } from "../utils/AXIOS";

const useGetSingleData = (endpoint: string, id: string) => {
  const fetching = async (endpoint: string, id: string) =>
    await AXIOS.get(`${endpoint}/${id}`);

  const query = useQuery({
    queryKey: [endpoint, id],
    queryFn: () => fetching(endpoint, id),
  });
  console.log("================================", query);

  return query;
};

export default useGetSingleData;
