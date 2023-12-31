import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

/**AUTHGAURD FOR INNER PAGES */
export const RequireAuth = (props: any) => {
  const isLogin = useSelector((state: any) => state.user.token)
  
  return isLogin ? props.children : <Navigate to="/" />;


  // return userDetails?.walletAddress ? props.children : <Navigate to="/" />;
}

