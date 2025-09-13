import { Link } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";
import { motion } from "framer-motion";

const Membership = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <div className="mt-10 p-4">
      <div className="max-w-5xl max-lg:max-w-2xl mx-auto">
        <SectionTitle
          title="Our Membership Plans"
          subtitle={
            "Subscribe to one of our membership plans according to your taste."
          }
        />
        <motion.div
          className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 mt-10 max-sm:max-w-sm max-sm:mx-auto"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="border rounded-md p-6" variants={item} whileHover={{ y: -4, scale: 1.01 }} transition={{ type: "spring", stiffness: 250, damping: 20 }}>
            <h3 className="text-gray-800 dark:text-secondary text-xl font-semibold mb-2">Silver</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              For Individuals and Small Teams
            </p>
            <div className="mt-6">
              <h3 className="text-gray-800 dark:text-secondary text-2xl font-semibold">
                ৳ 10,000
                <sub className="text-gray-500 dark:text-gray-300 text-sm font-medium">
                  per month
                </sub>
              </h3>
            </div>
            <div className="mt-6">
              <h4 className="text-gray-800 dark:text-secondary text-lg font-semibold mb-2">
                Include
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Everything you get in this plan
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    className="mr-3 fill-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  50 Shared Meals Per Month
                </li>
                <li className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    className="mr-3 fill-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Access to 10 Community Groups
                </li>
                <li className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    className="mr-3 fill-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  6 Team Members
                </li>
                <li className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    className="mr-3 fill-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Unlimited Recipe Bookmarks
                </li>
                <li className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    className="mr-3 fill-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Basic Support
                </li>
              </ul>
              <Link to={"/checkout/Silver"}>
                <button
                  type="button"
                  className="w-full mt-6 px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                >
                  Buy now
                </button>
              </Link>
            </div>
          </motion.div>
          <motion.div className="border rounded-md p-6" variants={item} whileHover={{ y: -4, scale: 1.01 }} transition={{ type: "spring", stiffness: 250, damping: 20 }}>
            <h3 className="text-gray-800 dark:text-secondary text-xl font-semibold mb-2 flex items-center">
              Gold
              <span className="px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-md ml-3">
                Best Deal
              </span>
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              For Individuals and Largest Teams
            </p>
            <div className="mt-6">
              <h3 className="text-gray-800 dark:text-secondary text-2xl font-semibold">
                ৳ 20,000
                <sub className="text-gray-500 dark:text-gray-300 text-sm font-medium">
                  per month
                </sub>
              </h3>
            </div>
            <div className="mt-6">
              <h4 className="text-gray-800 dark:text-secondary text-lg font-semibold mb-2">
                Include
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Everything you get in this plan
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    className="mr-3 fill-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  100 Shared Meals Per Month
                </li>
                <li className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    className="mr-3 fill-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Access to 20 Community Groups
                </li>
                <li className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    className="mr-3 fill-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  8 Team Members
                </li>
                <li className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    className="mr-3 fill-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Unlimited Recipe Bookmarks
                </li>
                <li className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    className="mr-3 fill-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Priority Support
                </li>
              </ul>
              <Link to={"/checkout/Gold"}>
                <button
                  type="button"
                  className="w-full mt-6 px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                >
                  Buy now
                </button>
              </Link>
            </div>
          </motion.div>
          <motion.div className="border rounded-md p-6" variants={item} whileHover={{ y: -4, scale: 1.01 }} transition={{ type: "spring", stiffness: 250, damping: 20 }}>
            <h3 className="text-gray-800 dark:text-secondary text-xl font-semibold mb-2">
              Platinum
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              For Multiples and Largest Teams
            </p>
            <div className="mt-6">
              <h3 className="text-gray-800 dark:text-secondary text-2xl font-semibold">
                ৳ 30,000
                <sub className="text-gray-500 dark:text-gray-300 text-sm font-medium">
                  per month
                </sub>
              </h3>
            </div>
            <div className="mt-6">
              <h4 className="text-gray-800 dark:text-secondary text-lg font-semibold mb-2">
                Include
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Everything you get in this plan
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    className="mr-3 fill-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  300 Shared Meals Per Month
                </li>
                <li className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    className="mr-3 fill-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Access to All Community Groups
                </li>
                <li className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    className="mr-3 fill-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  100 Team Members
                </li>
                <li className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    className="mr-3 fill-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Unlimited Recipe Bookmarks
                </li>
                <li className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    className="mr-3 fill-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Premium Support
                </li>
              </ul>
              <Link to={"/checkout/Platinum"}>
                <button
                  type="button"
                  className="w-full mt-6 px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                >
                  Buy now
                </button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Membership;
