import { FC } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase";

interface ProtectedRoutesProps {
  component: FC;
}

const ProtectedRoute = ({ component: Component }: ProtectedRoutesProps) => {
  // https://github.com/CSFrequency/react-firebase-hooks/blob/master/auth/README.md#useauthstate
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading..</div>;
  }

  return user ? <Component /> : <Navigate to="/login" replace></Navigate>;
};

export default ProtectedRoute;
