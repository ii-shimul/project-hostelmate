import { Link } from "react-router";

const ErrorPage = () => {

  return (
    <div className="grid h-screen place-content-center bg-white px-4 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200 dark:text-gray-700">
          404
        </h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500 dark:text-gray-400">
          We can&apos;t find that page.
        </p>

        <Link
          to={"/"}
          className="mt-6 inline-block rounded-md bg-[#235784] px-5 py-3 text-sm font-medium text-white hover:bg-[#ddeaf6] hover:text-black focus:ring-3 focus:outline-hidden"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;