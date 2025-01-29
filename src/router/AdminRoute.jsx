import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import useUser from "../hooks/useUser";

const AdminRoute = ({ children }) => {
  const { userDB, loading } = useUser();
  const location = useLocation();
  if (loading) {
    return <Loader />;
  }
  if (userDB && userDB.role === "admin") {
    return children;
  }
  return <Navigate state={location.pathname} to={"/"}></Navigate>;
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute;
