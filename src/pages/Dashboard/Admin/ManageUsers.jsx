import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import LoadingHand from "../../../components/LoadingHand";
import { GrUserAdmin } from "react-icons/gr";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const axiosPublic = useAxios();
  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ["usersQuery"],
    queryFn: async () => {
      const result = await axiosPublic.get("/users");
      return result.data;
    },
  });

  const handleMakeAdmin = async (email, name) => {
    const result = await axiosPublic.patch("/user/admin", {email});
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
        <tbody className="">
          {users.map((user, index) => {
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
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
