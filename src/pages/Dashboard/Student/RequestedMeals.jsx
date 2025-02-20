import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import LoadingHand from "../../../components/LoadingHand";
import useMeals from "../../../hooks/useMeals";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ReactPaginate from "react-paginate";
import { useState } from "react";

const RequestedMeals = () => {
  const [meals, loading] = useMeals();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [poading, setPoading] = useState(false);
  const handlePageClick = (event) => {
    setPoading(true);
    setPage(event.selected + 1);
  };
  const {
    data: requestedMeals,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["requestedMealQueryForAStudent", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/requestedMeals/${user.email}?page=${page}`,
      );
      setTotalPage(res.data.totalPages);
      setPoading(false);
      return res.data.meals;
    },
  });
  if (isLoading || loading) {
    return <LoadingHand />;
  }
  if (!requestedMeals.length) {
    return (
      <h1 className="h-[50%] text-center mt-[20%] text-xl md:text-3xl">
        You have not requested for any meal yet!
      </h1>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-inherit">
        <thead className="whitespace-nowrap">
          <tr>
            <th className="p-1 md:p-3 text-left text-sm font-semibold">
              No.
            </th>
            <th className="p-1 md:p-3 text-left text-sm font-semibold">
              Meal Title
            </th>
            <th className="p-1 md:p-3 text-left text-sm font-semibold">
              Likes
            </th>
            <th className="p-1 md:p-3 text-left text-sm font-semibold">
              Reviews
            </th>
            <th className="p-1 md:p-3 text-left text-sm font-semibold">
              Status
            </th>
            <th className="p-1 md:p-3 text-left text-sm font-semibold">
              Cancel
            </th>
          </tr>
        </thead>
        <tbody className="whitespace-nowrap">
          {poading ? (
            <div className="w-full h-80">
              <LoadingHand />
            </div>
          ) : (
            requestedMeals.map((requestedMeal, index) => {
              const meal = meals.find(
                (item) => item._id === requestedMeal.requestedMeal.id,
              );
              const handleCancel = async () => {
                const res = await axiosSecure.delete(
                  `/requestedMeals/${requestedMeal._id}`,
                );
                refetch();
                if (res.data.deletedCount > 0) {
                  toast.success("Request canceled!");
                }
              };
              return (
                <tr
                  key={requestedMeal._id}
                  className="odd:bg-blue-50 dark:odd:bg-opacity-15"
                >
                  <td className="p-4 text-sm">{index + 1 + page * 10 - 10}</td>

                  <td className="p-4 text-sm">
                    <div className="flex items-center cursor-pointer w-max">
                      <img
                        src={meal.image}
                        className="w-9 h-9 rounded-full shrink-0"
                      />
                      <div className="ml-4">
                        <p className="text-md">{meal.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{meal.likes}</td>
                  <td className="p-4 text-sm">{meal.reviews_count}</td>
                  <td className="p-4 text-sm">{requestedMeal.status}</td>
                  <td className="p-4">
                    <button onClick={handleCancel} title="Delete">
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
                </tr>
              );
            })
          )}
        </tbody>
      </table>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={totalPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"activePage"}
          activeLinkClassName="active-link"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
        />
    </div>
  );
};

export default RequestedMeals;
