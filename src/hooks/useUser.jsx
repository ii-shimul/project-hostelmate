import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useUser = () => {
  const { user } = useAuth();
  const axiosPublic = useAxios();
  const { data: userDB, isLoading: loading } = useQuery({
    queryKey: ["userQuery"],
    queryFn: async () => {
      const res = await axiosPublic.get(`users/${user.email}`);
      return res.data;
    },
  });
  return { userDB, loading };
};

export default useUser;
