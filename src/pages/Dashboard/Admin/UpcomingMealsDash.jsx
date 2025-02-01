import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import LoadingHand from "../../../components/LoadingHand";
import { Publish } from "@mui/icons-material";
import toast from "react-hot-toast";
import { Button } from "@mui/material";
import ReactModal from "react-modal";
import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ReactPaginate from "react-paginate";
const key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const ModalForm = ({ isOpen, onRequestClose }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const { title, category, ingredients, description, price, image } = data;
    const imageFile = image[0];
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "bombax");
    formData.append("cloud_name", `${key}`);
    const result = await axios.post(
      "https://api.cloudinary.com/v1_1/dqhaqoupz/image/upload",
      formData,
    );
    if (result.data.url) {
      const newMeal = {
        title: title,
        category: category,
        image: result.data.url,
        ingredients: ingredients.split(","),
        description: description,
        price: parseFloat(price),
        distributor: {
          name: user.displayName,
          email: user.email,
        },
        postTime: new Date().toISOString(),
        rating: 0,
        likes: 0,
        reviews_count: 0,
      };
      const res = await axiosSecure.post("/upcoming-meals", newMeal);
      if (res.data.insertedId) {
        toast.success(`${title} added to the meals collection.`);
        onRequestClose();
      }
    } else {
      toast.error("Error uploading image!");
    }
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={
        "max-w-2xl mx-auto mt-16 lg:mt-40 rounded-lg border p-5 bg-white"
      }
    >
      <button onClick={onRequestClose} className="text-red-500 float-right">
        ✖
      </button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto md:mt-5"
      >
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Title"
              {...register("title", { required: true })}
              className="px-2 py-3 rounded-md bg-white text-black w-full text-sm border-b-2 focus:border-[#007bff] outline-none"
            />
          </div>
          <div className="relative flex items-center">
            <FormControl fullWidth className="" sx={{ m: 1 }}>
              <InputLabel id="demo-select-small-label">Category</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Category"
                {...register("category", { required: true })}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
                <MenuItem value={"Lunch"}>Lunch</MenuItem>
                <MenuItem value={"Dinner"}>Dinner</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="relative flex items-center">
            <input
              type="number"
              placeholder="Price"
              {...register("price", { required: true })}
              className="px-2 py-3 rounded-md bg-white text-black w-full text-sm border-b-2 focus:border-[#007bff] outline-none"
            />
          </div>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Ingredients (Chicken,Potato,Beef,Bread...)"
              {...register("ingredients", { required: true })}
              className="px-2 py-3 rounded-md bg-white text-black w-full text-sm border-b-2 focus:border-[#007bff] outline-none"
            />
          </div>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Distributor name"
              defaultValue={user.displayName}
              readOnly
              className="px-2 py-3 rounded-md bg-white text-black w-full text-sm border-b-2 focus:border-[#007bff] outline-none"
            />
          </div>
          <div className="relative flex items-center">
            <input
              type="email"
              placeholder="Distributor email"
              defaultValue={user.email}
              readOnly
              className="px-2 py-3 rounded-md bg-white text-black w-full text-sm border-b-2 focus:border-[#007bff] outline-none"
            />
          </div>
          <div className="relative flex items-center sm:col-span-2">
            <input
              type="text"
              placeholder="Description"
              {...register("description", { required: true })}
              className="px-2 py-3 rounded-md bg-white text-black w-full text-sm border-b-2 focus:border-[#007bff] outline-none"
            />
          </div>
          <div className="max-w-md">
            <label className="text-base text-gray-500 font-semibold mb-2 block">
              Upload file
            </label>
            <input
              type="file"
              {...register("image", { required: true })}
              className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:text-gray-500 rounded"
            />
            <p className="text-xs text-gray-400 mt-2">
              PNG, JPG SVG, WEBP, and GIF are Allowed.
            </p>
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

const UpcomingMealsDash = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const axiosPublic = useAxios();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [poading, setPoading] = useState(false);
  const handlePageClick = (event) => {
    setPoading(true);
    setPage(event.selected + 1);
  };
  const {
    data: meals,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["upcoming-meals", page],
    queryFn: async () => {
      const result = await axiosPublic.get("/upcoming-meals/paginate");
      setTotalPage(result.data.totalPages);
      setPoading(false);
      return result.data.meals;
    },
  });
  if (isLoading) {
    return <LoadingHand />;
  }

  return (
    <>
      <ModalForm
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      />
      <div className="flex justify-center my-3">
        <Button onClick={() => setModalIsOpen(true)} variant="contained">
          Add Upcoming Meal
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
                Price
              </th>
              <th className="p-1 md:p-3 text-left text-sm font-semibold text-black">
                Publish
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

export default UpcomingMealsDash;
