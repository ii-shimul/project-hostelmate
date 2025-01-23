import { Rating, Stack, styled } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#1C64F2",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});
const MealDetails = () => {
  const meal = useLoaderData();
  const { data } = useQuery({
    queryKey: ["getReviews"],
    queryFn: async () => {
      const reviews = await axios.get(
        `http://localhost:5000/reviews/${meal._id}`
      );
      return reviews;
    },
  });
  console.log(data);
  return (
    <div className="bg-white">
      <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(169,170,172,0.8)] p-6 rounded">
          <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
            <div className="px-4 py-10 rounded shadow-md relative">
              <img
                src={meal.image}
                alt={meal.title}
                className="w-4/5 aspect-[251/171] rounded object-cover mx-auto"
              />
              <button type="button" className="absolute top-4 right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  fill="#ccc"
                  className="mr-1 hover:fill-[#333]"
                  viewBox="0 0 64 64"
                >
                  <path
                    d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                    data-original="#000000"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="lg:col-span-2 flex flex-col h-full">
            <h3 className="text-xl font-bold text-gray-800">{meal.title}</h3>
            <div className="flex items-center space-x-1 mt-2">
              <Stack spacing={1}>
                <StyledRating
                  name="customized-color"
                  defaultValue={meal.rating}
                  precision={0.1}
                  readOnly
                />
              </Stack>
              <h4 className="text-gray-500 text-base !ml-3">
                {meal.reviews_count} Reviews
              </h4>
            </div>
            <p className="text-sm text-gray-500 mt-2">{meal.description}</p>
            <div className="flex flex-wrap gap-4 mt-3 md:mt-6">
              <p className="text-gray-800 text-2xl font-bold">৳{meal.price}</p>
              <p className="text-gray-500 text-base">
                <strike>৳{Math.ceil(meal.price * 1.09)}</strike>
                <span className="text-sm ml-1">Tax included</span>
              </p>
            </div>
            <div className="mt-3 md:mt-6 flex-1">
              <h3 className="text-xl font-bold text-gray-800">Ingredients</h3>
              <div className="flex flex-col flex-wrap gap-1 mt-4">
                {meal.ingredients.map((ingred, indx) => {
                  return (
                    <p key={indx}>
                      {indx + 1}. {ingred}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="flex gap-4 mt-3 md:mt-12 max-w-md">
              <button
                type="button"
                className="w-full px-4 py-2.5 outline-none border border-blue-600 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded"
              >
                Buy now
              </button>
              <button
                type="button"
                className="w-full px-4 py-2.5 outline-none border border-blue-600 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <div className="mt-5 md:mt-12 shadow-[0_2px_10px_-3px_rgba(169,170,172,0.8)] p-6">
          <h3 className="text-xl font-bold text-gray-800">Meal information</h3>
          <ul className="mt-4 space-y-2 text-gray-800">
            <li className="text-sm hover:bg-gray-100 transition-all duration-150 py-1 px-1">
              Category <span className="ml-4 float-right">{meal.category}</span>
            </li>
            <li className="text-sm hover:bg-gray-100 transition-all duration-150 py-1 px-1">
              Distributor{" "}
              <span className="ml-4 float-right">{meal.distributor.name}</span>
            </li>
            <li className="text-sm hover:bg-gray-100 transition-all duration-150 py-1 px-1">
              Distributor email{" "}
              <span className="ml-4 float-right">{meal.distributor.email}</span>
            </li>
            <li className="text-sm hover:bg-gray-100 transition-all duration-150 py-1 px-1">
              Likes
              <span className="ml-4 float-right">{meal.likes}</span>
            </li>
            <li className="text-sm hover:bg-gray-100 transition-all duration-150 py-1 px-1">
              Reviews
              <span className="ml-4 float-right">{meal.reviews_count}</span>
            </li>
            <li className="text-sm hover:bg-gray-100 transition-all duration-150 py-1 px-1">
              Rating <span className="ml-4 float-right">{meal.rating}</span>
            </li>
            <li className="text-sm hover:bg-gray-100 transition-all duration-150 py-1 px-1">
              Posted Time{" "}
              <span className="ml-4 float-right">{meal.postTime}</span>
            </li>
          </ul>
        </div>
        <div className="mt-5 md:mt-12 shadow-[0_2px_10px_-3px_rgba(169,170,172,0.8)] p-6">
          <h3 className="text-xl font-bold text-gray-800">Reviews(10)</h3>
          <div className="grid md:grid-cols-2 gap-12 mt-4">
            <div className="space-y-3 max-w-md">
              <div className="flex items-center">
                <p className="text-sm text-gray-800 font-bold">5.0</p>
                <svg
                  className="w-5 fill-blue-600 ml-1"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <div className="bg-gray-400 rounded w-full h-2 ml-3">
                  <div className="w-2/3 h-full rounded bg-blue-600" />
                </div>
                <p className="text-sm text-gray-800 font-bold ml-3">66%</p>
              </div>
              <div className="flex items-center">
                <p className="text-sm text-gray-800 font-bold">4.0</p>
                <svg
                  className="w-5 fill-blue-600 ml-1"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <div className="bg-gray-400 rounded w-full h-2 ml-3">
                  <div className="w-1/3 h-full rounded bg-blue-600" />
                </div>
                <p className="text-sm text-gray-800 font-bold ml-3">33%</p>
              </div>
              <div className="flex items-center">
                <p className="text-sm text-gray-800 font-bold">3.0</p>
                <svg
                  className="w-5 fill-blue-600 ml-1"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <div className="bg-gray-400 rounded w-full h-2 ml-3">
                  <div className="w-1/6 h-full rounded bg-blue-600" />
                </div>
                <p className="text-sm text-gray-800 font-bold ml-3">16%</p>
              </div>
              <div className="flex items-center">
                <p className="text-sm text-gray-800 font-bold">2.0</p>
                <svg
                  className="w-5 fill-blue-600 ml-1"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <div className="bg-gray-400 rounded w-full h-2 ml-3">
                  <div className="w-1/12 h-full rounded bg-blue-600" />
                </div>
                <p className="text-sm text-gray-800 font-bold ml-3">8%</p>
              </div>
              <div className="flex items-center">
                <p className="text-sm text-gray-800 font-bold">1.0</p>
                <svg
                  className="w-5 fill-blue-600 ml-1"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <div className="bg-gray-400 rounded w-full h-2 ml-3">
                  <div className="w-[6%] h-full rounded bg-blue-600" />
                </div>
                <p className="text-sm text-gray-800 font-bold ml-3">6%</p>
              </div>
            </div>
            <div>
              <div className="flex items-start">
                <img
                  src="https://readymadeui.com/team-2.webp"
                  className="w-12 h-12 rounded-full border-2 border-white"
                />
                <div className="ml-3">
                  <h4 className="text-sm font-bold text-gray-800">John Doe</h4>
                  <div className="flex items-center space-x-1 mt-1">
                    <svg
                      className="w-3 h-3 fill-blue-600"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg
                      className="w-3 h-3 fill-blue-600"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg
                      className="w-3 h-3 fill-blue-600"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg
                      className="w-3 h-3 fill-[#CED5D8]"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg
                      className="w-3 h-3 fill-[#CED5D8]"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <p className="text-xs !ml-2 font-semibold text-gray-800">
                      2 mins ago
                    </p>
                  </div>
                  <p className="text-sm mt-3 text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipisci elit, sed
                    eiusmod tempor incidunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              </div>
              <div>
                <p className="text-blue-600 text-sm mt-6 cursor-pointer font-semibold">
                  Read all reviews
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
