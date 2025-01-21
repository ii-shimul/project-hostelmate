import luLogo from "../../assets/lu-logo.svg";
import sustLogo from "../../assets/sust-logo.png";
import duLogo from "../../assets/du-logo.png";
import buetLogo from "../../assets/buet-logo.png";
import { Box, TextField } from "@mui/material";

const Banner = () => {
  return (
    <div className="max-w-7xl max-md:max-w-md mx-auto">
      <div className="grid md:grid-cols-2 items-center md:gap-8 gap-6">
        <div className="max-md:order-1 max-md:text-center">
          <p className="text-sm font-bold text-blue-600 mb-2">
            <span className="rotate-90 inline-block mr-2">|</span> ALL IN ONE
            MEALS
          </p>
          <h2 className="text-gray-800 md:text-5xl text-3xl font-extrabold mb-4 md:!leading-[55px]">
            Amazing hostel for the spirited students
          </h2>
          <p className="mt-4 text-base text-gray-600 leading-relaxed">
            Embark on a gastronomic journey with our curated dishes, delivered
            promptly to your doorstep. Elevate your dining experience today.
          </p>
          <form className="mt-8 max-w-full mx-auto">
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
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Breakfast, Lunch..."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
          <hr className="mt-8 border-gray-300" />
          <div className="mt-8">
            <h4 className="text-gray-800 font-bold text-base mb-4">
              Trusted by students around the country
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
              <img src={luLogo} className="w-28 mx-auto" alt="google-logo" />
              <img
                src={sustLogo}
                className="w-28 mx-auto"
                alt="facebook-logo"
              />
              <img src={duLogo} className="w-28 mx-auto" alt="linkedin-logo" />
              <img
                src={buetLogo}
                className="w-28 mx-auto"
                alt="pinterest-logo"
              />
            </div>
          </div>
        </div>
        <div className="lg:h-[650px] md:h-[550px] flex items-center relative max-md:before:hidden before:absolute before:bg-blue-200 before:h-full before:w-3/4 before:right-0 before:z-0">
          <img
            src="https://readymadeui.com/photo.webp"
            className="rounded-md lg:w-3/4 md:w-11/12 z-50 relative"
            alt="Dining Experience"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
