import { useQuery } from "@tanstack/react-query";
import LoadingHand from "../../../components/LoadingHand";
import { Edit } from "lucide-react";
import useMeals from "../../../hooks/useMeals";
import { Wysiwyg } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ReactPaginate from "react-paginate";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AllReviews = () => {
  const [searchValue, setSearchValue] = useState("");
  const axiosSecure = useAxiosSecure();
  const [meals, loading, refetch] = useMeals();
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [poading, setPoading] = useState(false);
  const handlePageClick = (event) => {
    setPoading(true);
    setPage(event.selected + 1);
  };
  const { data, isLoading, refetch: reload } = useQuery({
    queryKey: ["allReviewsQuery", page],
    queryFn: async () => {
      const result = await axiosSecure.get(`/reviews/paginate?page=${page}`);
      setTotalPage(result.data.totalPages);
      setReviews(result.data.reviews);
      setPoading(false);
      return result.data;
    },
  });

  useEffect(() => {
    const searchReviews = async () => {
      const result = await axiosSecure.post("/search-review", { searchValue });
      setReviews(result.data);
    };
    if (searchValue !== "") {
      searchReviews();
    } else {
      refetch();
    }
  }, [searchValue, axiosSecure, refetch]);

  if (isLoading || loading) {
    return <LoadingHand />;
  }

  return (
    <>
      <div className="w-full my-3 flex justify-center">
        <TextField
          onChange={(e) => setSearchValue(e.target.value)}
          fullWidth
          className="max-w-xl"
          label="Search reviews"
          id="fullWidth"
        />
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
                Likes
              </th>
              <th className="p-1 md:p-3 text-left text-sm font-semibold">
                Review Count
              </th>
              <th className="p-1 md:p-3 text-left text-sm font-semibold">
                Review
              </th>
              <th className="p-1 md:p-3 text-left text-sm font-semibold">
                Edit
              </th>
              <th className="p-1 md:p-3 text-left text-sm font-semibold">
                Delete
              </th>
              <th className="p-1 md:p-3 text-left text-sm font-semibold">
                View
              </th>
            </tr>
          </thead>
          <tbody>
            {poading ? (
              <div className="w-full h-80">
                <LoadingHand />
              </div>
            ) : (
              reviews.map((review, index) => {
                const meal = meals.find((item) => item._id === review.mealId);
                const handleDelete = async () => {
                  const result = await axiosSecure.delete(
                    `/reviews/${review._id}?mealId=${meal._id}`,
                  );
                  if (result.data.result.deletedCount > 0) {
                    reload();
                    toast.success(`Review deleted.`);
                  }
                };
                return (
                  <tr
                    key={review._id}
                    className="odd:bg-blue-50 dark:odd:bg-opacity-15"
                  >
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
                    <td className="p-4 text-sm">{meal.likes}</td>
                    <td className="p-4 text-sm">{meal.reviews_count}</td>
                    <td className="p-4 text-sm">{review.review}</td>
                    <td className="p-4 text-sm">
                      <Edit className="text-blue-600 hover:text-blue-300 cursor-pointer" />
                    </td>
                    <td className="p-4">
                      <button onClick={handleDelete} title="Delete">
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
                    <td className="p-4 text-sm">
                      <Link to={`/meals/${review.mealId}`}>
                        <Wysiwyg className="hover:text-gray-600 cursor-pointer" />
                      </Link>
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

export default AllReviews;
