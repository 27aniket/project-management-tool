import { Navigate } from "react-router-dom";
import type { JSX } from "react/jsx-dev-runtime";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;
