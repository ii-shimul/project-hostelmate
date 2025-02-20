import { useQuery } from "@tanstack/react-query";
import LoadingHand from "../../../components/LoadingHand";
import toast from "react-hot-toast";
import { DeliveryDining } from "@mui/icons-material";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import ReactPaginate from "react-paginate";

const ServeMeals = () => {
  const axiosSecure = useAxiosSecure();
  const [requestedMeals, setRequestedMeals] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [poading, setPoading] = useState(false);
  const handlePageClick = (event) => {
    setPoading(true);
    setPage(event.selected + 1);
  };
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["requestedMealQuery", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/requestedMeals/paginate?page=${page}`,
      );
      setTotalPage(res.data.totalPages);
      setRequestedMeals(res.data.meals);
      setPoading(false);
      return res.data;
    },
  });
  if (isLoading) {
    return <LoadingHand />;
  }

  console.log(requestedMeals);

  if (!requestedMeals.length) {
    return (
      <h1 className="h-[50%] text-center mt-[20%] text-xl md:text-3xl">
        No request for any meal yet!
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
              User Email
            </th>
            <th className="p-1 md:p-3 text-left text-sm font-semibold">
              User Name
            </th>
            <th className="p-1 md:p-3 text-left text-sm font-semibold">
              Status
            </th>
            <th className="p-1 md:p-3 text-left text-sm font-semibold">
              Serve
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
                <tr
                  key={requestedMeal._id}
                  className="odd:bg-blue-50 dark:odd:bg-opacity-15"
                >
                  <td className="p-4 text-sm">{index + 1 + page * 10 - 10}</td>
                  <td className="p-4 text-sm">
                    {requestedMeal.requestedMeal.title}
                  </td>
                  <td className="p-4 text-sm">
                    {requestedMeal.requester.email}
                  </td>
                  <td className="p-4 text-sm">
                    {requestedMeal.requester.name}
                  </td>
                  <td className="p-4 text-sm">{requestedMeal.status}</td>
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

export default ServeMeals;
