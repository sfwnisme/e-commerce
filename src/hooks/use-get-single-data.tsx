import { useQuery } from "@tanstack/react-query";
import { AXIOS } from "../utils/AXIOS";

const useGetSingleData = (endpoint: string, id: string | undefined) => {
  const fetching = async (endpoint: string, id: string | undefined) =>
    await AXIOS.get(`${endpoint}/${id}`);

  const query = useQuery({
    queryKey: [endpoint, id],
    queryFn: () => (endpoint && id ? fetching(endpoint, id) : null),
  });

  return query;
};

export default useGetSingleData;
