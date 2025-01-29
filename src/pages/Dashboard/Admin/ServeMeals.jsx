import { useQuery } from "@tanstack/react-query";
import LoadingHand from "../../../components/LoadingHand";
import useMeals from "../../../hooks/useMeals";
import toast from "react-hot-toast";
import { DeliveryDining } from "@mui/icons-material";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ServeMeals = () => {
  const [meals, loading] = useMeals();
  const axiosSecure = useAxiosSecure();
  const {
    data: requestedMeals,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["requestedMealQueryForAStudent"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requestedMeals`);
      return res.data;
    },
  });
  if (isPending || loading) {
    return <LoadingHand />;
  }
  if (!requestedMeals.length) {
    return (
      <h1 className="h-[50%] text-center mt-[20%] text-xl md:text-3xl">
        No request for any meal yet!
      </h1>
    );
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
              User Email
            </th>
            <th className="p-1 md:p-3 text-left text-sm font-semibold text-black">
              User Name
            </th>
            <th className="p-1 md:p-3 text-left text-sm font-semibold text-black">
              Status
            </th>
            <th className="p-1 md:p-3 text-left text-sm font-semibold text-black">
              Serve
            </th>
          </tr>
        </thead>
        <tbody className="whitespace-nowrap">
          {requestedMeals.map((requestedMeal, index) => {
            const handleServe = async () => {
              const res = await axiosSecure.patch(
                `/requestedMeals/${requestedMeal._id}`,
              );
              if (res.data.modifiedCount) {
                refetch();
                toast.success(
                  `${requestedMeal.requestedMeal.title} served to ${requestedMeal.requester.name}`,
                );
              } else {
                toast.error("Something went wrong!");
              }
            };
            return (
              <tr key={requestedMeal._id} className="odd:bg-blue-50">
                <td className="p-4 text-sm text-black">{index + 1}</td>
                <td className="p-4 text-sm text-black">
                  {requestedMeal.requestedMeal.title}
                </td>
                <td className="p-4 text-sm text-black">
                  {requestedMeal.requester.email}
                </td>
                <td className="p-4 text-sm text-black">
                  {requestedMeal.requester.name}
                </td>
                <td className="p-4 text-sm text-black">
                  {requestedMeal.status}
                </td>
                <td
                  className={`p-4 ${requestedMeal.status === "Delivered" ? "text-secondary" : "text-primary"} hover:text-blue-400 transition-all duration-200 ease-in-out`}
                >
                  <button
                    disabled={requestedMeal.status === "Delivered"}
                    onClick={handleServe}
                  >
                    <DeliveryDining />
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

export default ServeMeals;
