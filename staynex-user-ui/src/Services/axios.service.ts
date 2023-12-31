import axios from "axios";
import toaster from "../Components/Common/Toast";
import store from "../Redux/Store";
import { RESPONSES } from "../Utils";
import { formatUrl } from "./common.service";
import { API_HOST } from "../Constant";
import { logoutUser } from "../Redux/Slices/user.slice";
import { handleJWTExpiry } from "./common.service";

export const storeInstance = store;
axios.defaults.baseURL = API_HOST;

let failedQueue: any = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  })
  failedQueue = [];
}

/**AXIOS INTERCEPTOR */
axios.interceptors.request.use(
  (config) => {
    // let walletAddress = storeInstance.getState().user.walletAddress;
    // config.headers["Authorization"] = walletAddress
    // config.headers["Content-Type"] = "application/json";
    config.headers["Access-Control-Allow-Origin"] = "*";
    // config.headers['Access-Control-Allow-Credentials'] = true
    // config.withCredentials= true;
    return config;
  },
  (error) => {
    return error;
  }
);

/**HANDLE AXIOS RESPONSE */
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {

    if (error.response.status === 401 && error.response.statusText === 'Unauthorized') {
      handleJWTExpiry(error.response.status)
      processQueue(error, null);
    }

    if (!error.response) {
      toaster.error("Server not responding. Please try again later.");
    } else {
      return manageErrorConnection(error)
    }

    const originalRequest = error.config;
    failedQueue.push(originalRequest);
    // CommonService.handleJWTExpiry(error)
    // if (error.response.status === 401) {
    //   processQueue(error, null);
    // }

  }
)
/**HANDLE AXIOS ERROR */
function manageErrorConnection(err) {
  if (err.response && err.data.statusCode >= 400 && err.response.status <= 500) {
    toaster.error(err.data.message);
    if (err.data.statusCode === 401) {
      setTimeout(function () { store.dispatch(logoutUser()) }, 1000);
    }
    return Promise.reject(err)
  } else if (err.code === 'ECONNREFUSED') {
    toaster.error('ECONNREFUSED');
    return 'nevermind'
  } else {
    toaster.error(err);
    return Promise.reject(err)
  }
}

// /**HANDLE AXIOS SUCCESS */
function handleSuccess(res) {
  if (res.data.statusCode === RESPONSES.SUCCESS || res.data.statusCode === RESPONSES.CREATED)
    res?.data?.message && toaster.success(res.data.message);
  else if (res.data.statusCode === RESPONSES.BADREQUEST) {
    res.data?.message && toaster.error(res.data.message);
  }
  else if (res.data.statusCode === RESPONSES.UN_AUTHORIZED) {
    res.data?.message && toaster.error(res.data.message);
  }
  else {
    res?.data?.message && toaster.error(res.data.message);
  }
}

/**METHOD FOR CALL API */
export const apiCallPost = (url, data, params = {}, showtoaster = false) =>
  new Promise((resolve) => {
    axios
      .post(formatUrl(url, params), data, { withCredentials: true })
      .then((res) => {
        showtoaster && handleSuccess(res);
        resolve(res.data);
      })
      .catch((error) => {
        resolve(null);
      });
  });

/**METHOD FOR SEND API */
export const apiCallGet = (url, params = {}, showtoaster = false) =>

  new Promise((resolve) => {
    axios
      .get(formatUrl(url, params), { withCredentials: true })
      .then((res) => {
        showtoaster && handleSuccess(res);
        resolve(res.data);
      })
      .catch((error) => {
        resolve(null);
      });
  });

