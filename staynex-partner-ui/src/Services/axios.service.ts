import axios from "axios";
import toaster from "../Components/Common/Toast";
import store from "../Redux/Store";
import { RESPONSES } from "../Utils";
import { formatUrl } from "./common.service";
import { API_HOST } from "../Constant";
import { logoutUser } from "../Redux/Slices/user.slice";
import { loader } from "../Redux/Slices/loader.slice";
import { handleJWTExpiry } from "./common.service";

export const storeInstance = store
axios.defaults.baseURL = API_HOST

let failedQueue: any = []

const processQueue = (error, token = null) => {
  return new Promise((resolve, reject) => {
    let rejectedCount = 0;

    failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
        rejectedCount++;
      } else {
        prom.resolve(token);
      }
    });

    // Reset the failed queue after it has been processed
    failedQueue = [];

    if (rejectedCount === failedQueue.length) {
      reject(error); // Reject the entire array if all promises were rejected
    } else {
      resolve(token); // Resolve with the token if there were no errors
    }
  });
};

/**AXIOS INTERCEPTOR */
axios.interceptors.request.use(
  (config) => {
    let token = storeInstance.getState().user.token || ''
    config.headers['Authorization'] = `Bearer ${token}`
    // config.headers['Content-Type'] = 'application/json'
    config.headers['Access-Control-Allow-Origin'] = '*'
    // config.headers['Content-Type'] = 'multipart/form-data'
    return config
  },
  (error) => {
    storeInstance.dispatch(loader(false));

    const originalRequest = error.config;
    // Add the failed API call to the queue
    failedQueue.push(originalRequest);
    if (error.response.status === 401 && error.response.data.message === 'Invalid Credentials') {
      return error;
    } else if (error.response.status === 401 && error.response.data.message === 'Unauthorized') {
      handleJWTExpiry(error.response.status)
      processQueue(error, null);
    }

    return error;
  }
);

/**HANDLE AXIOS RESPONSE */
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (!error.response) {
      toaster.error('Server not responding. Please try again later.')
    } else {
      return manageErrorConnection(error)
    }

    const originalRequest = error.config
    failedQueue.push(originalRequest)
    // CommonService.handleJWTExpiry(error)
    if (error.response.status === 403) {
      processQueue(error, null)
    }
  },
)
/**HANDLE AXIOS ERROR */
function manageErrorConnection(err) {
  if (
    err.response &&
    err.response.status >= 400 &&
    err.response.status <= 500
  ) {
    toaster.error(err.response.data.message)
    if (err.response.status === 401) {
      setTimeout(function () {
        store.dispatch(logoutUser())
      }, 1000)
    }
    return Promise.reject(err)
  } else if (err.code === 'ECONNREFUSED') {
    toaster.error('ECONNREFUSED')
    return 'nevermind'
  } else {
    toaster.error(err)
    return Promise.reject(err)
  }
}

// /**HANDLE AXIOS SUCCESS */
function handleSuccess(res) {
  if (res.status === RESPONSES.SUCCESS || res.status === RESPONSES.CREATED)
    res?.data?.message && toaster.success(res.data.message)
  else if (res.response.status === RESPONSES.BADREQUEST) {
    res.response?.data?.message && toaster.error(res.response.data.message)
  } else if (res.response.status === RESPONSES.UN_AUTHORIZED) {
    res.response?.data?.message && toaster.error(res.response.data.message)
  } else {
    res?.data?.message && toaster.error(res.data.message)
  }
}

/**METHOD FOR CALL API */
export const apiCallPost = (
  url,
  data,
  params = {},
  showtoaster = false,
  showLoader = true,
) =>
  new Promise((resolve) => {
    showLoader && storeInstance.dispatch(loader(true))
    axios
      .post(formatUrl(url, params), data)
      .then((res) => {
        showLoader && storeInstance.dispatch(loader(false))
        showtoaster && handleSuccess(res)
        resolve(res.data)
      })
      .catch((error) => {
        showLoader && storeInstance.dispatch(loader(false))
        resolve(null)
      })
  })

/**METHOD FOR SEND API */
export const apiCallGet = (url, params = {}, showtoaster = false) =>
  new Promise((resolve) => {
    axios
      .get(formatUrl(url, params))
      .then((res) => {
        showtoaster && handleSuccess(res)
        resolve(res.data)
      })
      .catch((error) => {
        resolve(null)
      })
  })
