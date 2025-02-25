import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import { GrMoney } from "react-icons/gr";
import LoadingHand from "../../../components/LoadingHand";
import {
  Legend,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
const Overview = () => {
  const axiosSecure = useAxiosSecure();
  const { userDB, loading } = useUser();
    const [paymentData, setPaymentData] = useState([]);
  
  const { data: stats, isLoading } = useQuery({
    queryKey: ["student-stats"],
    queryFn: async () => {
      const stats = await axiosSecure.get(`/student-stats/${userDB.email}`);
      const formattedData = await stats.data.data.pay.map((item) => ({
        date: new Date(item.paidAt).toLocaleDateString(),
        Payment: item.amount,
      }));
      setPaymentData(formattedData)
      return stats.data.data;
    },
  });
  if (isLoading || loading) {
    return <LoadingHand />;
  }
  return (
    <>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-x-6 gap-y-12 divide-x divide-gray-300 py-4">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fill-blue-600 w-10 inline-block"
            viewBox="0 0 512 512"
          >
            <path
              d="M437 268.152h-50.118c-6.821 0-13.425.932-19.71 2.646-12.398-24.372-37.71-41.118-66.877-41.118h-88.59c-29.167 0-54.479 16.746-66.877 41.118a74.798 74.798 0 0 0-19.71-2.646H75c-41.355 0-75 33.645-75 75v80.118c0 24.813 20.187 45 45 45h422c24.813 0 45-20.187 45-45v-80.118c0-41.355-33.645-75-75-75zm-300.295 36.53v133.589H45c-8.271 0-15-6.729-15-15v-80.118c0-24.813 20.187-45 45-45h50.118c4.072 0 8.015.553 11.769 1.572a75.372 75.372 0 0 0-.182 4.957zm208.59 133.589h-178.59v-133.59c0-24.813 20.187-45 45-45h88.59c24.813 0 45 20.187 45 45v133.59zm136.705-15c0 8.271-6.729 15-15 15h-91.705v-133.59a75.32 75.32 0 0 0-.182-4.957 44.899 44.899 0 0 1 11.769-1.572H437c24.813 0 45 20.187 45 45v80.119z"
              data-original="#000000"
            />
            <path
              d="M100.06 126.504c-36.749 0-66.646 29.897-66.646 66.646-.001 36.749 29.897 66.646 66.646 66.646 36.748 0 66.646-29.897 66.646-66.646s-29.897-66.646-66.646-66.646zm-.001 103.292c-20.207 0-36.646-16.439-36.646-36.646s16.439-36.646 36.646-36.646 36.646 16.439 36.646 36.646-16.439 36.646-36.646 36.646zM256 43.729c-49.096 0-89.038 39.942-89.038 89.038s39.942 89.038 89.038 89.038 89.038-39.942 89.038-89.038c0-49.095-39.942-89.038-89.038-89.038zm0 148.076c-32.554 0-59.038-26.484-59.038-59.038 0-32.553 26.484-59.038 59.038-59.038s59.038 26.484 59.038 59.038c0 32.554-26.484 59.038-59.038 59.038zm155.94-65.301c-36.748 0-66.646 29.897-66.646 66.646.001 36.749 29.898 66.646 66.646 66.646 36.749 0 66.646-29.897 66.646-66.646s-29.897-66.646-66.646-66.646zm0 103.292c-20.206 0-36.646-16.439-36.646-36.646.001-20.207 16.44-36.646 36.646-36.646 20.207 0 36.646 16.439 36.646 36.646s-16.439 36.646-36.646 36.646z"
              data-original="#000000"
            />
          </svg>
          <h3 className="text-xl sm:text-3xl font-extrabold text-blue-600 dark:text-white mt-5">
            {stats.mealRequests ? stats.mealRequests : 0}+
          </h3>
          <p className="text-base text-gray-800 dark:text-gray-400 font-semibold mt-3">
            Requests
          </p>
        </div>
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fill-blue-600 w-10 inline-block"
            viewBox="0 0 512 512"
          >
            <path
              fillRule="evenodd"
              d="M64.217 333.491h41.421c5.508 0 10 4.492 10 10v97.833c0 5.508-4.492 10-10 10H64.217c-5.508 0-10-4.492-10-10v-97.833c0-5.508 4.492-10 10-10zm155.471-61.737h-41.422c-5.508 0-10 4.492-10 10v159.571c0 5.508 4.492 10 10 10h41.422c5.508 0 10-4.492 10-10V281.754c0-5.508-4.493-10-10-10zm114.049-64.466h-41.421c-5.508 0-10 4.492-10 10v224.036c0 5.508 4.492 10 10 10h41.421c5.508 0 10-4.492 10-10V217.288c-.001-5.507-4.493-10-10-10zm72.625-57.992h41.421c5.508 0 10 4.492 10 10v282.028c0 5.508-4.492 10-10 10h-41.421c-5.508 0-10-4.492-10-10V159.296c0-5.508 4.492-10 10-10zm2.707-106.018a7.98 7.98 0 0 1-.812-15.938l49.121-2.666a7.98 7.98 0 0 1 8.307 9.094l.006.001-7.088 48.68a7.986 7.986 0 0 1-15.812-2.25l3.878-26.632C385.642 108.019 321.72 152.702 257.158 189.5c-69.131 39.402-138.98 69.744-206.779 93.355a7.976 7.976 0 0 1-5.25-15.062c66.943-23.313 135.906-53.269 204.154-92.167 63.527-36.208 126.449-80.188 186.56-133.799zM45.262 481.873h421.477c5.508 0 10 4.492 10 10v3.193c0 5.508-4.492 10-10 10H45.262c-5.508 0-10-4.492-10-10v-3.193c0-5.508 4.492-10 10-10zM139.587 6.935c-48.325 0-87.5 39.175-87.5 87.5s39.175 87.5 87.5 87.5 87.5-39.175 87.5-87.5c-.001-48.325-39.176-87.5-87.5-87.5zm-8 32.13v5.279c-5.474 1.183-10.606 3.537-14.768 6.92-6.626 5.387-10.827 13.21-10.353 22.965.476 9.817 5.372 16.4 12.186 20.849 5.887 3.844 13.093 5.827 19.733 6.917 5.206.855 10.757 2.201 14.95 4.733 3.261 1.969 5.71 4.838 6.23 9.127.072.595.111 1.013.117 1.26.08 3.359-1.536 5.926-3.962 7.767-3.135 2.379-7.564 3.785-12.005 4.324a33.57 33.57 0 0 1-3.172.254c-5.25.126-10.424-1.156-14.458-3.842-3.274-2.18-5.775-5.367-6.818-9.552a7.982 7.982 0 0 0-15.5 3.812c2.094 8.399 7.044 14.749 13.505 19.052 4.252 2.831 9.164 4.736 14.315 5.711v5.165a8 8 0 1 0 16-.001v-5.01c6.309-1.038 12.699-3.388 17.758-7.226 6.302-4.782 10.494-11.632 10.275-20.829a29.17 29.17 0 0 0-.179-2.76c-1.22-10.052-6.653-16.591-13.856-20.94-6.27-3.786-13.768-5.668-20.637-6.796-4.832-.793-9.912-2.13-13.607-4.543-2.767-1.806-4.752-4.416-4.937-8.224-.202-4.157 1.615-7.512 4.478-9.84 2.281-1.854 5.196-3.144 8.362-3.781a22.978 22.978 0 0 1 10.115.244c5.278 1.338 10.083 4.817 12.614 10.845a7.997 7.997 0 0 0 10.469 4.281 7.997 7.997 0 0 0 4.281-10.469c-4.701-11.196-13.65-17.664-23.489-20.158a37.3 37.3 0 0 0-1.646-.377v-5.161a8 8 0 1 0-16.001.004z"
              clipRule="evenodd"
              data-original="#000000"
            />
          </svg>
          <h3 className="text-xl sm:text-3xl font-extrabold text-blue-600 dark:text-white mt-5">
            {stats.reviews?stats.reviews:0}+
          </h3>
          <p className="text-base text-gray-800 dark:text-gray-400 font-semibold mt-3">
            Meal Reviews
          </p>
        </div>
        <div className="text-center">
          <p className="flex items-center justify-center">
            <GrMoney className="text-[37px] text-blue-600" />
          </p>
          <h3 className="text-xl sm:text-3xl font-extrabold text-blue-600 dark:text-white mt-5">
            {stats?.payments[0]?.totalAmount?stats.payments[0].totalAmount:0}৳+
          </h3>
          <p className="text-base text-gray-800 dark:text-gray-400 font-semibold mt-3">
            Spent
          </p>
        </div>
      </div>
              <div className="flex flex-col max-lg:w-full justify-center items-center flex-1 px-5">
                <h1 className="sm:text-2xl mb-5">Payment Timeline</h1>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={paymentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="Payment"
                      stroke="#007bff"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
    </>
  );
};

export default Overview;
