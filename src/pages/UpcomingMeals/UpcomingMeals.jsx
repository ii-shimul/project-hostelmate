import SectionTitle from "../../components/SectionTitle";
import useAxios from "../../hooks/useAxios";
import { Helmet } from "react-helmet";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUser from "../../hooks/useUser";
import Loader from "../../components/Loader";
import { useQuery } from "@tanstack/react-query";

const UpcomingMeals = () => {
  const axiosPublic = useAxios();
  const axiosSecure = useAxiosSecure();
  const { userDB, loading } = useUser();

  const { data: meals,isLoading, refetch } = useQuery({
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
          {meals.map((meal) => {
            let isLiked = false;
            if (meal?.likedUsers?.includes(userDB?.email)) {
              isLiked = true;
            }
            const handleLike = async () => {
              if (!userDB) {
                toast.error("You have to login first.");
                return;
              } else if (userDB.badge === "Bronze") {
                toast.error("You have to have a membership.");
                return;
              } else if (isLiked) {
                toast.error("You can like once one meal.");
                return;
              }
              const result = await axiosSecure.patch(
                `/upcoming-likes/${meal._id}?email=${userDB.email}`,
              );
              if (result.data.modifiedCount > 0) {
                toast.success(`You liked ${meal.title}`);
                isLiked = true;
                refetch();
                if (meal.likes == 9) {
                  const result = await axiosSecure.patch(
                    `/upcoming-meals/publish/${meal._id}`,
                  );
                  if (result.data.deletedCount > 0) {
                    toast.success(
                      `${meal.title} got 10 likes and is published.`,
                    );
                    refetch();
                  } else {
                    toast.error("Something went wrong while publishing!");
                  }
                }
              } else {
                toast.error("Something went wrong!");
              }
            };
            return (
              <div
                key={meal._id}
                className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-2xl font-[sans-serif] overflow-hidden mx-auto mt-4"
              >
                <div className="max-h-[190px]">
                  <img
                    src="https://placehold.co/600x400"
                    className="w-full rounded-2xl"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl text-gray-800 font-extrabold">
                    {meal.title}
                  </h3>
                  <div className="mt-6 flex items-center">
                    <h3 className="text-xl text-gray-800 font-bold flex-1">
                      ৳ {meal.price}
                    </h3>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-lg">{meal.likes}</span>
                      <button
                        onClick={() => {
                          handleLike();
                        }}
                        disabled={isLiked}
                        className="w-12 h-12 rounded-full cursor-pointer bg-pink-100 disabled:bg-pink-900"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                          className="fill-pink-600 mx-auto"
                          viewBox="0 0 64 64"
                        >
                          <path
                            d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                            data-original="#000000"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default UpcomingMeals;
