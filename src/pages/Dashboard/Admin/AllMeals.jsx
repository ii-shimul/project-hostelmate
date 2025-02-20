import { Button } from "@mui/material";
import LoadingHand from "../../../components/LoadingHand";
import { Edit, Trash, View } from "lucide-react";
import useAxios from "../../../hooks/useAxios";
import ReactPaginate from "react-paginate";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const AllMeals = () => {
  const axiosPublic = useAxios();
  const [meals, setMeals] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [poading, setPoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const handlePageClick = (event) => {
    setPoading(true);
    setPage(event.selected + 1);
  };
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["allReviewsQuery", page],
    queryFn: async () => {
      const result = await axiosPublic.get(`/meals/paginate?page=${page}`);
      setTotalPage(result.data.totalPages);
      setMeals(result.data.reviews);
      setPoading(false);
      return result.data;
    },
  });

  if (isLoading) {
    return <LoadingHand />;
  }
  const sortMeals = async (sort) => {
    const result = await axiosPublic.post("/meals/sort", { sort });
    setMeals(result.data);
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
                Distributor
              </th>
              <th className="p-1 md:p-3 text-left text-sm font-semibold">
                Likes
              </th>
              <th className="p-1 md:p-3 text-left text-sm font-semibold">
                Reviews
              </th>
              <th className="p-1 md:p-3 text-left text-sm font-semibold">
                Rating
              </th>
              <th className="p-1 md:p-3 text-left text-sm font-semibold">
                Update, Delete or View
              </th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap">
            {poading ? (
              <div className="w-full h-80">
                <LoadingHand />
              </div>
            ) : (
              meals.map((meal, index) => {
                const handleDelete = async () => {
                  const result = await axiosSecure.delete(`/meals/${meal._id}`);
                  if (result.data.deletedCount > 0) {
                    toast.success(`${meal.title} deleted.`)
                    refetch();
                  } else {
                    toast.error("Something went wrong.")
                  }
                };
                return (
                  <tr key={meal._id} className="odd:bg-blue-50 dark:odd:bg-opacity-15">
                    <td className="p-4 text-sm">
                      {index + 1 + page * 10 - 10}
                    </td>

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
                    <td className="p-4 text-sm">
                      {meal.distributor.name}
                    </td>
                    <td className="p-4 text-sm">{meal.likes}</td>
                    <td className="p-4 text-sm">
                      {meal.reviews_count}
                    </td>
                    <td className="p-4 text-sm">{meal.rating}</td>
                    <td className="p-4 space-x-2">
                      <button
                        title="Update"
                        className="text-yellow-500 hover:text-yellow-300 transition-all duration-200"
                      >
                        <Edit />
                      </button>
                      <button
                        onClick={handleDelete}
                        title="Delete"
                        className="text-red-500 hover:text-red-300 transition-all duration-200"
                      >
                        <Trash />
                      </button>
                      <button
                        title="View"
                        className="text-blue-500 hover:text-blue-300 transition-all duration-200"
                      >
                        <Link to={`/meals/${meal._id}`}>
                          <View />
                        </Link>
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
    </>
  );
};

export default AllMeals;
