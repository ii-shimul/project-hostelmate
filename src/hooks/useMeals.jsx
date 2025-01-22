import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useMeals = () => {
  const axiosPublic = useAxios();
  const {
    data: meals,
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["mealsQuery"],
    queryFn: async () => {
      const meals = await axiosPublic.get("/meals");
      return meals.data;
    },
  });
  return [meals, loading, refetch] ;
};

export default useMeals;
