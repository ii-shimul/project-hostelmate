import { Button } from "@mui/material";
import LoadingHand from "../../../components/LoadingHand";
import { Edit, Trash, View } from "lucide-react";
import useAxios from "../../../hooks/useAxios";
import ReactPaginate from "react-paginate";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const AllMeals = () => {
  const axiosPublic = useAxios();
  const [searchMeals, setSearchMeals] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [poading, setPoading] = useState(false);
  const handlePageClick = (event) => {
    setPoading(true);
    setPage(event.selected + 1);
  };
  const {
    data,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ["allReviewsQuery", page],
    queryFn: async () => {
      const result = await axiosPublic.get(`/meals/paginate?page=${page}`);
      setTotalPage(result.data.totalPages);
      setSearchMeals(result.data.reviews);
      setPoading(false);
      return result.data;
    },
  });

  if (isLoading) {
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
            {poading ? (
              <div className="w-full h-80">
                <LoadingHand />
              </div>
            ) : (
              searchMeals.map((meal, index) => {
                return (
                  <tr key={meal._id} className="odd:bg-blue-50">
                    <td className="p-4 text-sm text-black">
                      {index + 1 + page * 10 - 10}
                    </td>

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
