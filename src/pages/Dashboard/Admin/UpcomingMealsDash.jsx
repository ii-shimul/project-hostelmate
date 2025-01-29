import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import LoadingHand from "../../../components/LoadingHand";
import { Publish } from "@mui/icons-material";
import toast from "react-hot-toast";

const UpcomingMealsDash = () => {
  const axiosPublic = useAxios();
  const {
    data: meals,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["upcoming-meals"],
    queryFn: async () => {
      const result = await axiosPublic.get("/upcoming-meals/sort");
      return result.data;
    },
  });
  if (isLoading) {
    return <LoadingHand />;
  }
  return (
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
              Price
            </th>
            <th className="p-1 md:p-3 text-left text-sm font-semibold text-black">
              Publish
            </th>
          </tr>
        </thead>
        <tbody className="whitespace-nowrap">
          {meals.map((meal, index) => {
            const handlePublish = async () => {
              const result = await axiosPublic.patch(
                `/upcoming-meals/publish/${meal._id}`,
              );
              if (result.data.deletedCount > 0) {
                toast.success(`${meal.title} is published.`);
                refetch();
              }
            };
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
                <td className="p-4 text-sm text-black">{meal.price}</td>
                <td className="p-4 space-x-2">
                  <button
                    onClick={handlePublish}
                    title="Update"
                    className="text-yellow-500 hover:text-yellow-300 transition-all duration-200"
                  >
                    <Publish />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UpcomingMealsDash;
