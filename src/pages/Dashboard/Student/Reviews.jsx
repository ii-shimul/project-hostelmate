import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import LoadingHand from "../../../components/LoadingHand";
import useMeals from "../../../hooks/useMeals";
import toast from "react-hot-toast";
import {
  Details,
  Edit,
  ViewAgenda,
  ViewCozy,
  Wysiwyg,
} from "@mui/icons-material";

const Reviews = () => {
  const [meals, loading] = useMeals();
  const axiosPublic = useAxios();
  const { user } = useAuth();
  const {
    data: reviews,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["reviewQueryForAStudent"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/student_reviews/${user.email}`);
      console.log(res);
      return res.data;
    },
  });

  if (isPending || loading) {
    return <LoadingHand />;
  }
  if (!reviews.length) {
    return (
      <h1 className="h-[50%] text-center mt-[20%] text-xl md:text-3xl">
        You have not reviewed any meal yet!
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
              Likes
            </th>
            <th className="p-1 md:p-3 text-left text-sm font-semibold text-black">
              Your Review
            </th>
            <th className="p-1 md:p-3 text-left text-sm font-semibold text-black">
              Edit
            </th>
            <th className="p-1 md:p-3 text-left text-sm font-semibold text-black">
              Delete
            </th>
            <th className="p-1 md:p-3 text-left text-sm font-semibold text-black">
              View
            </th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => {
            const meal = meals.find((item) => item._id === review.mealId);
            return (
              <tr key={review._id} className="odd:bg-blue-50">
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
                <td className="p-4 text-sm text-black">{meal.likes}</td>
                <td className="p-4 text-sm text-black">{review.review}</td>
                <td className="p-4 text-sm text-black">
                  <Edit className="text-blue-600 hover:text-blue-300 cursor-pointer" />
                </td>
                <td className="p-4">
                  <button title="Delete">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 fill-red-500 hover:fill-red-700"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                        data-original="#000000"
                      />
                      <path
                        d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                        data-original="#000000"
                      />
                    </svg>
                  </button>
                </td>
                <td className="p-4 text-sm text-black">
                  <Wysiwyg className="hover:text-gray-600 cursor-pointer" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Reviews;
