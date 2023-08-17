import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

/**AUTHGAURD FOR OUTER PAGES */
export const WithoutAuth = (props: any) => {
  const isLogin = useSelector((state: any) => state.user.walletAddress)

  return !isLogin ? props.children : <Navigate to="/auth/profile-login" />;



  // return !userDetails?.walletAddress ? props.children : <Navigate to="/auth/dashboard" />;
}

