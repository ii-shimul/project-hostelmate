import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import LoadingHand from "../components/LoadingHand";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <LoadingHand></LoadingHand>;
  }
  if (user && user.email) {
    return children;
  }
  return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
