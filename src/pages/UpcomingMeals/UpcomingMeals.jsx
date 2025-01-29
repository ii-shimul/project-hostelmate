import { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import useAxios from "../../hooks/useAxios";
import InfiniteScroll from "react-infinite-scroll-component";
import DotLoader from "react-spinners/DotLoader";
import { Helmet } from "react-helmet";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import useUser from "../../hooks/useUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UpcomingCard from "./UpcomingCard";
import Loader from "../../components/Loader";

const UpcomingMeals = () => {
  const axiosPublic = useAxios();
  const axiosSecure = useAxiosSecure();
  const [meals, setMeals] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { userDB, loading } = useUser();

  const fetchMeals = async () => {
    try {
      const response = await axiosPublic.get(
        `/upcoming-meals?page=${page}&limit=8`,
      );
      const { meals: newMeals, hasMore: more } = response.data;

      setMeals((prevMeals) => [...prevMeals, ...newMeals]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(more);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  if (!meals.length && page === 1) {
    fetchMeals();
  }

  const handleLike = async (meal) => {
    if (!userDB) {
      toast.error("You have to login first.");
      return;
    } else if (userDB.badge === "Bronze") {
      toast.error("You have to have a membership.");
      return;
    }
    const result = await axiosSecure.patch(`/upcoming-likes/${meal._id}`);
    if (result.data.modifiedCount > 0) {
      toast.success(`You liked ${meal.title}`);
      if (meal.likes == 9) {
        const result = await axiosSecure.patch(
          `/upcoming-meals/publish/${meal._id}`,
        );
        if (result.data.deletedCount > 0) {
          toast.success(`${meal.title} got 10 likes and is published.`);
        } else {
          toast.error("Something went wrong while publishing!");
        }
      }
    } else {
      toast.error("Something went wrong!");
    }
    return true;
  };

  if (loading) {
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
        <InfiniteScroll
          dataLength={meals.length}
          next={fetchMeals}
          hasMore={hasMore}
          loader={<DotLoader className="mx-auto my-4" size={40} />}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 mb-3 sm:gap-2">
            {meals.map((meal) => (
              <UpcomingCard
                handleLike={handleLike}
                meal={meal}
                key={meal._id}
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </motion.div>
  );
};

export default UpcomingMeals;
