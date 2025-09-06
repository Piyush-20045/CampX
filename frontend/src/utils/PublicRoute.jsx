import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  return user ? <Navigate to="/" /> : children;
};

export default PublicRoute;
