import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import LoadingHand from "../../../components/LoadingHand";
import useMeals from "../../../hooks/useMeals";
import { Edit, Wysiwyg } from "@mui/icons-material";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import toast from "react-hot-toast";
import ReactModal from "react-modal";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
const Reviews = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
    data: reviews,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["reviewQueryForAStudent", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/student_reviews/${user.email}?page=${page}`,
      );

      setTotalPage(res.data.totalPages);
      setPoading(false);
      return res.data.reviews;
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
    <>
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
                Your Review
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
                const ModalForm = ({ isOpen, onRequestClose }) => {
                  const axiosSecure = useAxiosSecure();
                  const { register, handleSubmit } = useForm();
                  const onSubmit = async (data) => {
                    const result = await axiosSecure.patch("/reviews", data)
                    refetch();
                    if (result.data.modifiedCount > 0) {
                      toast.success("Updated review.")
                      onRequestClose();
                    }
                  };
                  return (
                    <ReactModal
                      isOpen={isOpen}
                      onRequestClose={onRequestClose}
                      ariaHideApp={false}
                      className={
                        "max-w-2xl mx-auto mt-16 lg:mt-40 rounded-lg border p-5 bg-white"
                      }
                    >
                      <button
                        onClick={onRequestClose}
                        className="text-red-500 float-right"
                      >
                        ✖
                      </button>
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="max-w-4xl mx-auto md:mt-5"
                      >
                        <div className="relative flex items-center w-full mt-8 mb-3">
                          <input
                            type="text"
                            placeholder="Review ID"
                            readOnly
                            value={review._id}
                            {...register("id", { required: true })}
                            className="px-2 py-3 rounded-md bg-white w-full text-sm border-b-2 focus:border-[#007bff] outline-none"
                          />
                        </div>
                        <div className="">
                          <div className="relative flex items-center sm:col-span-2">
                            <textarea
                              rows={5}
                              type="text"
                              placeholder="Write your review..."
                              {...register("review", { required: true })}
                              className="px-2 py-3 rounded-md bg-white w-full text-sm border-b-2 focus:border-[#007bff] outline-none"
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="mt-10 px-6 py-2.5 w-full text-sm bg-[#007bff] text-white hover:bg-[#006bff] rounded-md"
                        >
                          Submit
                        </button>
                      </form>
                    </ReactModal>
                  );
                };
                const handleDelete = async () => {
                  const result = await axiosSecure.delete(
                    `/reviews/${review._id}?mealId=${meal._id}`,
                  );
                  if (result.data.result.deletedCount > 0) {
                    refetch();
                    toast.success(`Review deleted.`);
                  }
                };
                return (
                  <>
                    <ModalForm
                      isOpen={modalIsOpen}
                      onRequestClose={() => setModalIsOpen(false)}
                    />
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
                      <td className="p-4 text-sm">{review.review}</td>
                      <td className="p-4 text-sm">
                        <Edit
                          onClick={() => setModalIsOpen(true)}
                          className="text-blue-600 hover:text-blue-300 cursor-pointer"
                        />
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
                        <Link to={`/meals/${meal._id}`}>
                          <Wysiwyg className="hover:text-gray-600 cursor-pointer" />
                        </Link>
                      </td>
                    </tr>
                  </>
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

export default Reviews;
