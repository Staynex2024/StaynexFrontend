import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from "react-router-dom";
import Swal from 'sweetalert2';
import { callApiGetMethod } from '../../Redux/Actions/api.action';
import { logOut } from '../../Redux/Actions/user.action';
import { APIURL } from '../../Utils';

/**AUTHGAURD FOR INNER PAGES */
export const RequireAuth = (props: any) => {
  /**CREATE DISPATCH OBJECT */
  const dispatch: any = useDispatch()

  /**CREATE LOCATION OBJECT */
  const location: any = useLocation()

  const isLogin = useSelector((state: any) => state.user.token)


  useEffect(() => {
    if (isLogin) {
      // function to check jwt token expiry
      checkJWTExpire()
    }
    // eslint-disable-next-line
  }, [location])

  const checkJWTExpire = async () => {
    const result = await dispatch(callApiGetMethod(APIURL.GET_EXCHANGE_RATE, {}, false, false))
    if (result === null) {
      // function to logout on expiry of jwt token
      tokenExpire()
    }
  }

  const tokenExpire = async () => {
    localStorage.clear()
    Swal.fire({
      icon: "info",
      title: "Session Expired",
      text: "Your session is expired, You have to login again to continue",
      showCancelButton: false,
      confirmButtonText: "Ok",
    }).then(() => {
      dispatch(logOut(false));
    });
  }

  return isLogin ? props.children : <Navigate to="/" />;


  // return userDetails?.walletAddress ? props.children : <Navigate to="/" />;
}

