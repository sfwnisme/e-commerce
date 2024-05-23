import { AXIOS, USER } from "../utils/AXIOS";
import { useQuery } from "@tanstack/react-query";
import { TOKEN } from "../utils/COOKIES";

const fetching = async (endpoint: string) => await AXIOS.get(`${endpoint}`);

export const useGetCurrentUser = () => {
  const query = useQuery({
    queryKey: [USER, "currentUser"],
    queryFn: () => (TOKEN ? fetching(USER) : null),
  });

  return { ...query };
};
