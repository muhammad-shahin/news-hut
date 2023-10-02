import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (user && user.emailVerified) {
    return children;
  }
  return <Navigate to="/sign-up" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
