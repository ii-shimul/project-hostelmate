import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import LoadingHand from "../../../components/LoadingHand";
import moment from "moment";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments, isPending } = useQuery({
    queryKey: ["paymentQuery"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });
  if (isPending) {
    return <LoadingHand />;
  }
  if (!payments.length) {
    return (
      <h1 className="h-[50%] text-center mt-[20%] text-xl md:text-3xl">
        You have not made any payment yet!
      </h1>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="whitespace-nowrap">
          <tr>
            <th className="p-1 md:p-3 text-left text-sm font-semibold text-black">
              No.
            </th>
            <th className="p-1 md:p-3 text-left text-sm font-semibold text-black">
              Method
            </th>
            <th className="p-1 md:p-3 text-left text-sm font-semibold text-black">
              TransactionID
            </th>
            <th className="p-1 md:p-3 text-left text-sm font-semibold text-black">
              Membership
            </th>
            <th className="p-1 md:p-3 text-left text-sm font-semibold text-black">
              Status
            </th>
            <th className="p-1 md:p-3 text-left text-sm font-semibold text-black">
              Paid At
            </th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => {
            return (
              <tr key={payment._id} className="odd:bg-blue-50">
                <td className="p-4 text-sm text-black">{index + 1}</td>
                <td className="p-4 text-sm text-black">
                  {payment.paymentMethod}
                </td>
                <td className="p-4 text-sm text-black">
                  {payment.transactionId}
                </td>
                <td className="p-4 text-sm text-black">{payment.membership}</td>
                <td className="p-4 text-sm text-black">{payment.status}</td>
                <td className="p-4 text-sm text-black">
                  {moment(payment.paidAt).calendar()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
