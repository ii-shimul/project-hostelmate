import luLogo from "../../assets/lu-logo.svg";
import sustLogo from "../../assets/sust-logo.png";
import duLogo from "../../assets/du-logo.png";
import buetLogo from "../../assets/buet-logo.png";
import bannerImg from "../../assets/banner.jpg";
import { useState } from "react";
import { useNavigate } from "react-router";

const Banner = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl w-[90%] max-md:max-w-md mx-auto lg:mt-10">
      <div className="grid md:grid-cols-2 items-center md:gap-8 gap-6">
        <div className="max-md:order-1 max-md:text-center">
          <p className="text-sm font-bold text-blue-600 mb-2">
            <span className="rotate-90 inline-block mr-2">|</span> ALL IN ONE
            MEALS
          </p>
          <h2 className="text-gray-800 md:text-5xl text-3xl font-extrabold mb-4 md:!leading-[55px] dark:text-white">
            Amazing hostel for the spirited students
          </h2>
          <p className="mt-4 text-base text-gray-600 leading-relaxed dark:text-white dark:opacity-75">
            Embark on a gastronomic journey with our curated dishes, delivered
            promptly to your doorstep. Elevate your dining experience today.
          </p>
          <div className="mt-8 max-w-full mx-auto">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                name="search"
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Breakfast, Lunch..."
                required
              />
              <button
                onClick={() => {
                  navigate("/meals", { state: value });
                }}
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </div>
          <hr className="mt-8 border-gray-300" />
          <div className="mt-8">
            <h4 className="text-gray-800 font-bold text-base mb-4 dark:text-white">
              Trusted by students around the country
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
              <img src={luLogo} className="w-28 mx-auto" alt="lu-logo" />
              <img src={sustLogo} className="w-28 mx-auto" alt="sust-logo" />
              <img src={duLogo} className="w-28 mx-auto" alt="du-logo" />
              <img src={buetLogo} className="w-28 mx-auto" alt="buet-logo" />
            </div>
          </div>
        </div>
        <div className="lg:h-[650px] md:h-[550px] flex items-center relative max-md:before:hidden before:absolute before:bg-blue-200 dark:before:bg-slate-500 before:h-full before:rounded-md before:w-3/4 before:right-0 before:z-0">
          <img
            src={bannerImg}
            className="rounded-md  w-[95%] h-auto relative mx-auto"
            alt="Meal Experience"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
