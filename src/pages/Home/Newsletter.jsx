import Button from "../../components/Button";
import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <div className="bg-secondary dark:bg-opacity-5 py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center md:gap-6 gap-12">
        <motion.div
          className="max-md:order-1"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-primary dark:text-secondary text-4xl font-extrabold mb-6">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Subscribe to our newsletter to get the latest info about our meals. You will be the first to know new meals arrive and get published. Don&apos;t miss a single meal. Be the first one to taste them.
          </p>
          <div className="max-w-md bg-gray-100 flex p-1 rounded text-left mt-12">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border-none text-gray-800 placeholder-gray-500 outline-none bg-transparent text-sm px-4 py-3"
            />
            <Button text="Subscribe" textSize="text-base"></Button>
          </div>
        </motion.div>
        <motion.div
          className="text-end"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="sm:w-60 w-40 shrink-0 inline-block"
            viewBox="0 0 512 512"
          >
            <path
              fill="#64b5f6"
              d="m0 192 246.528 156.896c2.816 2.08 6.144 3.104 9.472 3.104s6.656-1.024 9.472-3.104L512 192 265.6 3.2a16.032 16.032 0 0 0-19.2 0L0 192z"
              data-original="#64b5f6"
            />
            <path
              fill="#eceff1"
              d="M416 0H96C78.368 0 64 14.368 64 32v352c0 8.832 7.168 16 16 16h352c8.832 0 16-7.168 16-16V32c0-17.632-14.336-32-32-32z"
              data-original="#eceff1"
            />
            <path
              fill="#90a4ae"
              d="M144 96h224c8.832 0 16-7.168 16-16s-7.168-16-16-16H144c-8.832 0-16 7.168-16 16s7.168 16 16 16zm224 32H144c-8.832 0-16 7.168-16 16s7.168 16 16 16h224c8.832 0 16-7.168 16-16s-7.168-16-16-16zm-96 64H144c-8.832 0-16 7.168-16 16s7.168 16 16 16h128c8.832 0 16-7.168 16-16s-7.168-16-16-16z"
              data-original="#90a4ae"
            />
            <path
              fill="#1e88e5"
              d="M265.472 348.896c-2.816 2.08-6.144 3.104-9.472 3.104s-6.656-1.024-9.472-3.104L0 192v288c0 17.664 14.336 32 32 32h448c17.664 0 32-14.336 32-32V192L265.472 348.896z"
              data-original="#1e88e5"
            />
            <path
              fill="#2196f3"
              d="M480 512H32c-17.952 0-32-14.048-32-32a16.02 16.02 0 0 1 6.528-12.896l240-160c2.816-2.08 6.144-3.104 9.472-3.104s6.656 1.024 9.472 3.104l240 160A16.02 16.02 0 0 1 512 480c0 17.952-14.048 32-32 32z"
              data-original="#2196f3"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default Newsletter;
