import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: userDB, isLoading: loading } = useQuery({
    queryKey: ["userQuery"],
    queryFn: async () => {
      const res = await axiosSecure.get(`users/${user.email}`);
      return res.data;
    },
  });
  return { userDB, loading };
};

export default useUser;
