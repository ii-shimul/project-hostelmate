import useUser from "../../hooks/useUser";

const checkAdmin = () => {
  const { userDB, loading } = useUser();
  if (userDB.role === "admin") {
    return true;
  }
  return false;
};

export default checkAdmin;
