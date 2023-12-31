import axios from "axios";
import toaster from "../Components/Common/Toast";
import store from "../Redux/Store";
import { RESPONSES } from "../Utils";
import { formatUrl } from "./common.service";
import { API_HOST } from "../Constant";
import { logoutUser } from "../Redux/Slices/user.slice";
import { loader } from "../Redux/Slices/loader.slice";

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
    let token = storeInstance.getState().user.token || "";
    config.headers["Authorization"] = `Bearer ${token}`
    config.headers["Content-Type"] = "application/json";
    config.headers["Access-Control-Allow-Origin"] = "*";
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
    if (!error.response) {
      toaster.error("Server not responding. Please try again later.");
    } else {
      return manageErrorConnection(error)
    }

    const originalRequest = error.config;
    failedQueue.push(originalRequest);
    // CommonService.handleJWTExpiry(error)
    if (error.response.status === 403) {
      processQueue(error, null);
    }
  }
)
/**HANDLE AXIOS ERROR */
function manageErrorConnection(err) {
  if (err.response && err.response.status >= 400 && err.response.status <= 500) {
    toaster.error(err.response.data.message);
    if (err.response.status === 401) {
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
  if (res.status === RESPONSES.SUCCESS || res.status === RESPONSES.CREATED)
    res?.data?.message && toaster.success(res.data.message);
  else if (res.response.status === RESPONSES.BADREQUEST) {
    res.response?.data?.message && toaster.error(res.response.data.message);
  }
  else if (res.response.status === RESPONSES.UN_AUTHORIZED) {
    res.response?.data?.message && toaster.error(res.response.data.message);
  }
  else {
    res?.data?.message && toaster.error(res.data.message);
  }
}

/**METHOD FOR CALL API */
export const apiCallPost = (url, data, params = {}, showtoaster = false, showLoader = true) =>
  new Promise((resolve) => {
    showLoader && storeInstance.dispatch(loader(true));
    axios
      .post(formatUrl(url, params), data)
      .then((res) => {
        showLoader && storeInstance.dispatch(loader(false));
        showtoaster && handleSuccess(res);
        resolve(res.data);
      })
      .catch((error) => {
        showLoader && storeInstance.dispatch(loader(false));
        resolve(null);
      });
  });

/**METHOD FOR SEND API */
export const apiCallGet = (url, params = {}, showtoaster = false) =>
  new Promise((resolve) => {
    axios
      .get(formatUrl(url, params))
      .then((res) => {
        showtoaster && handleSuccess(res);
        resolve(res.data);
      })
      .catch((error) => {
        resolve(null);
      });
  });

