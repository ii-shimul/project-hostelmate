import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import useAxios from "../../../hooks/useAxios";
const key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const AddMeal = () => {
  const axiosPublic = useAxios();
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
      const res = await axiosPublic.post("/meals", newMeal);
      if (res.data.insertedId) {
        toast.success(`${title} added to the meals collection.`)
      }
    } else {
      toast.error("Error uploading image!");
    }
  };
  return (
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
  );
};

export default AddMeal;
