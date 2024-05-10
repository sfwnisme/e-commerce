import { AXIOS, USER } from "../utils/AXIOS";
import { useQuery } from "@tanstack/react-query";

const fetching = async (endpoint: string) => await AXIOS.get(`${endpoint}`);

export const useGetCurrentUser = () => {
  const query = useQuery({
    queryKey: [USER, "currentUser"],
    queryFn: () => fetching(USER),
  });

  return { ...query };
};
