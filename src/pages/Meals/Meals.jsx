import { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import useAxios from "../../hooks/useAxios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";
import { Helmet } from "react-helmet";
import { motion } from "motion/react";

const Meals = () => {
  const axiosPublic = useAxios();
  const [meals, setMeals] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMeals = async () => {
    try {
      const response = await axiosPublic.get(`/meals?page=${page}&limit=8`);
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
      className="max-w-7xl w-[95%] lg:w-[90%] max-md:max-w-md mx-auto"
    >
      <Helmet>
        <title>Meals | HostelMate</title>
      </Helmet>
      <div className="font-sans p-4 mx-auto lg:max-w-7xl md:max-w-4xl max-w-xl">
        <SectionTitle
          title="Delicious Meals Just for You"
          subtitle={
            "Explore a variety of freshly prepared dishes to satisfy every craving."
          }
        ></SectionTitle>
        <InfiniteScroll
          dataLength={meals.length}
          next={fetchMeals}
          hasMore={hasMore}
          loader={<DotLoader className="mx-auto my-4" size={40} />}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-2">
            {meals.map((meal, index) => {
              return (
                <div
                  key={index}
                  className="hover:bg-secondary transition-all rounded-md duration-500 ease-in-out p-2 overflow-hidden"
                >
                  <div className="bg-white flex flex-col h-full border rounded-md overflow-hidden">
                    <div className="w-full">
                      <img
                        src={meal.image}
                        alt={meal.title}
                        className="aspect-[139/125] w-full object-cover"
                      />
                    </div>
                    <div className="p-4 text-center flex-1">
                      <h4 className="text-sm sm:text-base font-bold text-gray-800">
                        {meal.title}
                      </h4>
                      <h4 className="text-sm sm:text-base text-gray-800 font-bold mt-2">
                        ৳ {meal.price}{" "}
                        <strike className="text-gray-500 ml-1">
                          ৳{Math.ceil(meal.price * 1.09)}
                        </strike>
                      </h4>
                    </div>
                    <Link
                      to={`/meals/${meal._id}`}
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
        </InfiniteScroll>
      </div>
    </motion.div>
  );
};

export default Meals;
