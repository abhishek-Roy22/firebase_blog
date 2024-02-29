import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  // console.log(user.email);
  if (!user) {
    return <Navigate to="/signup" replace={true} />;
  }
  return children;
};

export default PrivateRoute;
