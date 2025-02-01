import { useQuery } from "@tanstack/react-query";
import LoadingHand from "../../../components/LoadingHand";
import { GrUserAdmin } from "react-icons/gr";
import toast from "react-hot-toast";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ReactPaginate from "react-paginate";

const ManageUsers = () => {
  const [searchValue, setSearchValue] = useState();
  const [users, setUsers] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [poading, setPoading] = useState(false);
  const handlePageClick = (event) => {
    setPoading(true);
    setPage(event.selected + 1);
  };
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["usersQuery", page],
    queryFn: async () => {
      const result = await axiosSecure.get(`/users?page=${page}`);
      console.log(result);
      setTotalPage(result.data.totalPages);
      setUsers(result.data.meals);
      setPoading(false);
      return result.data;
    },
  });

  useEffect(() => {
    const searchUsers = async () => {
      const result = await axiosSecure.post("/search-users", { searchValue });
      setUsers(result.data.results);
    };
    if (searchValue) {
      searchUsers();
    } else {
      refetch();
    }
  }, [searchValue, axiosSecure, refetch]);

  const handleMakeAdmin = async (email, name) => {
    const result = await axiosSecure.patch("/user/admin", { email });
    if (result.data.modifiedCount > 0) {
      toast.success(`${name} is now admin.`);
      refetch();
    } else {
      toast.error("Something went wrong!");
    }
  };

  if (isLoading) {
    return <LoadingHand />;
  }
  return (
    <>
      <div className="w-full my-3 flex justify-center">
        <TextField
          onChange={(e) => setSearchValue(e.target.value)}
          fullWidth
          className="max-w-xl"
          label="Search users"
          id="fullWidth"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="whitespace-nowrap">
            <tr>
              <th className="p-1 md:p-3 text-left text-sm font-semibold text-black">
                No.
              </th>
              <th className="p-1 md:p-3 text-left text-sm font-semibold text-black">
                Image & Name
              </th>
              <th className="p-1 md:p-3 text-left text-sm font-semibold text-black">
                Email
              </th>
              <th className="p-1 md:p-3 text-left text-sm font-semibold text-black">
                Membership
              </th>
              <th className="p-1 md:p-3 text-left text-sm font-semibold text-black">
                Make Admin
              </th>
            </tr>
          </thead>
          <tbody>
            {poading ? (
              <div className="w-full h-80">
                <LoadingHand />
              </div>
            ) : (
              users.map((user, index) => {
                return (
                  <tr key={user._id} className="odd:bg-blue-50">
                    <td className="p-4 text-sm text-black">{index + 1}</td>

                    <td className="p-4 text-sm">
                      <div className="flex items-center cursor-pointer w-max">
                        <img
                          src={user.image}
                          className="w-9 h-9 rounded-full shrink-0"
                        />
                        <div className="ml-4">
                          <p className="text-md text-black">{user.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-black">{user.email}</td>
                    <td className="p-4 text-sm text-black">{user.badge}</td>
                    <td className="p-4">
                      {user.role === "admin" ? (
                        "Admin"
                      ) : (
                        <button
                          onClick={() => handleMakeAdmin(user.email, user.name)}
                          className="text-xl text-primary hover:text-secondary transition-all duration-300 ease-in-out"
                        >
                          <GrUserAdmin />
                        </button>
                      )}
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
    </>
  );
};

export default ManageUsers;
