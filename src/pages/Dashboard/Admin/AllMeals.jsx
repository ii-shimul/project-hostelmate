import { Button } from "@mui/material";
import LoadingHand from "../../../components/LoadingHand";
import useMeals from "../../../hooks/useMeals";
import { Edit, Trash, View } from "lucide-react";
import useAxios from "../../../hooks/useAxios";
import { useEffect, useState } from "react";

const AllMeals = () => {
  const axiosPublic = useAxios();
  const [searchMeals, setSearchMeals] = useState([]);
  const [meals, loading, refetch] = useMeals();
  useEffect(() => {
    setSearchMeals(meals);
  }, [meals]);

  if (loading) {
    return <LoadingHand />;
  }
  const sortMeals = async (sort) => {
    const result = await axiosPublic.post("/meals/sort", { sort });
    console.log(result);
    setSearchMeals(result.data);
  };
  return (
    <>
      <div className="flex justify-center gap-3 my-3">
        <Button onClick={() => sortMeals(1)} variant="contained">
          Sort by likes
        </Button>
        <Button onClick={() => sortMeals(0)} variant="outlined">
          sort by reviews
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="whitespace-nowrap">
            <tr>
              <th className="p-1 md:p-3 text-left text-sm font-semibold text-black">
                No.
              </th>
              <th className="p-1 md:p-3 text-left text-sm font-semibold text-black">
                Meal Title
              </th>
              <th className="p-1 md:p-3 text-left text-sm font-semibold text-black">
                Distributor
              </th>
              <th className="p-1 md:p-3 text-left text-sm font-semibold text-black">
                Likes
              </th>
              <th className="p-1 md:p-3 text-left text-sm font-semibold text-black">
                Reviews
              </th>
              <th className="p-1 md:p-3 text-left text-sm font-semibold text-black">
                Rating
              </th>
              <th className="p-1 md:p-3 text-left text-sm font-semibold text-black">
                Update, Delete or View
              </th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap">
            {searchMeals.map((meal, index) => {
              return (
                <tr key={meal._id} className="odd:bg-blue-50">
                  <td className="p-4 text-sm text-black">{index + 1}</td>

                  <td className="p-4 text-sm">
                    <div className="flex items-center cursor-pointer w-max">
                      <img
                        src={meal.image}
                        className="w-9 h-9 rounded-full shrink-0"
                      />
                      <div className="ml-4">
                        <p className="text-md text-black">{meal.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-black">
                    {meal.distributor.name}
                  </td>
                  <td className="p-4 text-sm text-black">{meal.likes}</td>
                  <td className="p-4 text-sm text-black">
                    {meal.reviews_count}
                  </td>
                  <td className="p-4 text-sm text-black">{meal.rating}</td>
                  <td className="p-4 space-x-2">
                    <button
                      title="Update"
                      className="text-yellow-500 hover:text-yellow-300 transition-all duration-200"
                    >
                      <Edit />
                    </button>
                    <button
                      title="Delete"
                      className="text-red-500 hover:text-red-300 transition-all duration-200"
                    >
                      <Trash />
                    </button>
                    <button
                      title="View"
                      className="text-blue-500 hover:text-blue-300 transition-all duration-200"
                    >
                      <View />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllMeals;
