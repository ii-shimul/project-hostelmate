import useUser from "../../hooks/useUser";

const CheckAdmin = () => {
  const { userDB, loading } = useUser();
  if (loading) {
    return;
  }
  if (userDB.role === "admin") {
    return true;
  }
  return false;
};

export default CheckAdmin;
