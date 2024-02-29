import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../auth/firebase";

const ProtectedRoute = ({ component: Component }) => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Loading..</div>;
  }

  return user ? <Component /> : <Navigate to="/login" replace></Navigate>;
};

export default ProtectedRoute;
