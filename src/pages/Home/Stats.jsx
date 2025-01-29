import SectionTitle from "../../components/SectionTitle";

const Stats = () => {
  return (
    <div className="bg-gray-50 p- min-h-[350px] flex flex-col items-center justify-center">
      <div className="w-full mb-5">
        <SectionTitle title="Our Achievements" />
      </div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-6 max-lg:gap-12 max-w-7xl">
        <div className="text-center">
          <h3 className="text-gray-800 text-4xl font-extrabold">
            5.4<span className="text-blue-600">M+</span>
          </h3>
          <p className="text-base font-bold mt-4">Total Users</p>
          <p className="text-sm text-gray-500 mt-2">
            The total number of registered users on the platform.
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-gray-800 text-4xl font-extrabold">
            $80<span className="text-blue-600">K</span>
          </h3>
          <p className="text-base font-bold mt-4">Revenue</p>
          <p className="text-sm text-gray-500 mt-2">
            The total revenue generated by the application.
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-gray-800 text-4xl font-extrabold">
            100<span className="text-blue-600">K</span>
          </h3>
          <p className="text-base font-bold mt-4">Engagement</p>
          <p className="text-sm text-gray-500 mt-2">
            The level of user engagement with the application&apos;s content and
            features.
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-gray-800 text-4xl font-extrabold">
            99.9<span className="text-blue-600">%</span>
          </h3>
          <p className="text-base font-bold mt-4">Server Uptime</p>
          <p className="text-sm text-gray-500 mt-2">
            The percentage of time the server has been operational and
            available.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
