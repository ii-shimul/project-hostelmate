import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUser from "../../hooks/useUser";
import Loader from "../../components/Loader";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Helmet } from "react-helmet";
import moment from "moment";
import SectionTitle from "../../components/SectionTitle";


const Requests = () => {
  const { userDB, loading } = useUser();
  const axiosSecure = useAxiosSecure();
  const { data: meals, isLoading } = useQuery({
    queryKey: ["requests-query"],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `/requestedMeals/page/${userDB.email}`,
      );
      return result.data;
    },
  });
  if (loading || isLoading) {
    return <Loader />;
  }
  if (!meals.length) {
    return (
      <p className="my-14">
        <span className="text-2xl font-bold mb-2">Oops!</span>
        <br />
        Nothing here.
      </p>
    );
  }
  console.log(meals);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
      className="max-w-7xl w-[95%] lg:w-[90%] max-md:max-w-md mx-auto pb-5"
    >
      <Helmet>
        <title>Meals | HostelMate</title>
      </Helmet>
      <SectionTitle title="Your Requested Meals"></SectionTitle>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-2">
        {meals.map((meal, index) => {
          return (
            <div
              key={index}
              className="hover:bg-secondary dark:hover:bg-primary transition-all rounded-md duration-500 ease-in-out p-2 overflow-hidden"
            >
              <div className="bg-white dark:bg-slate-800 flex flex-col h-full border rounded-md overflow-hidden">
                <div className="w-full">
                  <img
                    src={meal.requestedMeal.image}
                    alt={meal.requestedMeal.title}
                    className="aspect-[139/125] w-full object-cover"
                  />
                </div>
                <div className="p-4 text-center flex-1">
                  <h4 className="text-sm sm:text-base font-bold text-gray-800 dark:text-slate-300">
                    {meal.requestedMeal.title}
                  </h4>
                  {meal.status === "Delivered" ? (
                    <p className="mt-1 text-sm text-green-500">{meal.status}</p>
                  ) : (
                    <p className="mt-1 text-sm">{meal.status}</p>
                  )}
                  <p className="mt-1 text-xs">
                    {moment(meal.requestedAt).fromNow()}
                  </p>
                </div>
                <Link
                  to={`/meals/${meal.requestedMeal.id}`}
                  type="button"
                  className="bg-primary text-center font-semibold hover:bg-gray-800 text-white text-sm px-2 py-2 w-full"
                >
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Requests;
