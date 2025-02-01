import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import LoadingHand from "../../../components/LoadingHand";
import moment from "moment";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import ReactPaginate from "react-paginate";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [poading, setPoading] = useState(false);
  const handlePageClick = (event) => {
    setPoading(true);
    setPage(event.selected + 1);
  };
  const { data: payments, isPending } = useQuery({
    queryKey: ["paymentQuery", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}?page=${page}`);
      setTotalPage(res.data.totalPages);
      setPoading(false);
      return res.data.payments;
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
          {poading ? (
            <div className="w-full h-80">
              <LoadingHand />
            </div>
          ) : (
            payments.map((payment, index) => {
              return (
                <tr key={payment._id} className="odd:bg-blue-50">
                  <td className="p-4 text-sm text-black">
                    {index + 1 + page * 10 - 10}
                  </td>
                  <td className="p-4 text-sm text-black">
                    {payment.paymentMethod}
                  </td>
                  <td className="p-4 text-sm text-black">
                    {payment.transactionId}
                  </td>
                  <td className="p-4 text-sm text-black">
                    {payment.membership}
                  </td>
                  <td className="p-4 text-sm text-black">{payment.status}</td>
                  <td className="p-4 text-sm text-black">
                    {moment(payment.paidAt).calendar()}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={totalPage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"activePage"}
        activeLinkClassName="active-link"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
      />
    </div>
  );
};

export default PaymentHistory;
