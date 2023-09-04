import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

/**AUTHGAURD FOR INNER PAGES */
export const RequireAuth = (props: any) => {
  const isLogin = useSelector((state: any) => state.user.walletAddress)
  return props?.children


  //return isLogin ? props.children : <Navigate to="/" />;
}

