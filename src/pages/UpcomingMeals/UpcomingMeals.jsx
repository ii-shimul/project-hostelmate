import SectionTitle from "../../components/SectionTitle";
import useAxios from "../../hooks/useAxios";
import { Helmet } from "react-helmet";
import { motion } from "motion/react";
import useUser from "../../hooks/useUser";
import Loader from "../../components/Loader";
import { useQuery } from "@tanstack/react-query";
import UpcomingMealsCard from "./UpcomingMealsCard";

const UpcomingMeals = () => {
  const axiosPublic = useAxios();
  const { userDB, loading } = useUser();

  const {
    data: meals,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["upcomingMealsQueryNav"],
    queryFn: async () => {
      const response = await axiosPublic.get(`/upcoming-meals`);
      return response.data;
    },
  });

  if (loading || isLoading) {
    return <Loader />;
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
      className="max-w-7xl w-[95%] lg:w-[90%] max-md:max-w-md mx-auto"
    >
      <Helmet>
        <title>Upcoming Meals | HostelMate</title>
      </Helmet>
      <div className="font-sans p-4 mx-auto lg:max-w-7xl md:max-w-4xl max-w-xl">
        <SectionTitle
          title="Upcoming Meals Just for You"
          subtitle={
            "Plan ahead and explore the delicious meals waiting for you!."
          }
        ></SectionTitle>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 mb-3 sm:gap-2">
          {meals.map((meal) => <UpcomingMealsCard key={meal._id} meal={meal} userDB={userDB} refetch={refetch}></UpcomingMealsCard>)}
        </div>
      </div>
    </motion.div>
  );
};

export default UpcomingMeals;
