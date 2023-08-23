import Swal from 'sweetalert2'
import Web3 from 'web3'
import toaster from '../../Components/Common/Toast'
import {
  CHAIN_ID,
  EXPLORAR_LINK,
  // NETWORK_DECIMALS,
  NETWORK_NAME,
  // NETWORK_SYMBOL,
  RPC_URL,
} from '../../Constant'
import {
  apiCallGet,
  apiCallPost,
  storeInstance,
} from '../../Services/axios.service'
import { APIURL } from '../../Utils'
import { loader } from '../Slices/loader.slice'
import { email, token, walletAddress, walletType } from '../Slices/user.slice'

/**DECLARE ETHEREUM TYPE */
declare global {
  interface Window {
    ethereum?: any
  }
}

/**CHECK WHETHER METAMASK IS INSTALLED OR NOT */
export const isMetaMaskInstalled = async () => {
  const { ethereum } = window
  const result = await Boolean(ethereum)
  return result
}

const { ethereum }: any = window
if (ethereum) {
  ethereum.on('networkChanged', function () {
    approveNetwork()
  })

  ethereum.on('accountsChanged', function (account: any) {
    if (!account.length) {
      storeInstance.dispatch(walletAddress(''))
      Swal.fire({
        icon: 'info',
        title: 'Wallet Disconnected',
        text: 'Please connect wallet to continue',
        showCancelButton: false,
        confirmButtonText: 'Ok',
      })
    }
  })
}

/**CONNECT WITH METAMASK */
export const connectmetamask = () => {
  return (dispatch: DispatchType) =>
    new Promise(async (resolve, reject) => {
      /**CHECK METAMASK IN INSTALLED OR NOT */
      const installed = await isMetaMaskInstalled()
      try {
        let address
        if (installed) {
          dispatch(loader(true))
          const { ethereum } = window

          /**VERIFY METAMASK HAVE OUR NETWORK AND METAMASK SHOULD BE ON OUR NETWORK */
          let validNetwork: any = await approveNetwork()
          if (validNetwork) {
            /**METHOD CALL WHEN ACCOUNT CHANGED IN METAMASK */
            ethereum.on('accountsChanged', async function (accounts: string[]) {
              address = accounts[0]

              /**SAVE WALLET ADDRESS AND WALLET TYPE IN REDUX */
              dispatch(walletType('MetaMask'))
              return dispatch(walletAddress(address))
            })

            /**METHOD CALL WHEN NETWORK CHANGED IN METAMASK */
            // ethereum.on('chainChanged', function (networkId: number) {
            //     setTimeout(function () { window.location.reload(); }, 1000);
            // })

            /**GET ACCOUNT DETAILS */
            const accounts = await ethereum.request({
              method: 'eth_requestAccounts',
            })
            address = accounts[0]
            if (!walletAddress || accounts) {
              await ethereum.request({ method: 'personal_sign', params: [Web3.utils.fromUtf8("Welcome to stayNex app."), address] });
            }

            /**SAVE WALLET ADDRESS AND WALLET TYPE IN REDUX */
            dispatch(walletType('MetaMask'))
            resolve(address)
            return dispatch(walletAddress(address))
          } else {
            reject(false)
            dispatch(loader(false))
          }
        } else {
          /**IF METAMASK NOT INSTALLED */
          dispatch(loader(false))
          reject(false)
          return toaster.error('Please install Metamask.')
        }
      } catch (error: any) {
        // reject(error)
        dispatch(loader(false))
        return toaster.error(error.message)
      }
    })
}

/**VERIFY METAMASK HAVE OUR NETWORK AND METAMASK SHOULD BE ON OUR NETWORK */
export const approveNetwork = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { ethereum } = window as any;
      await ethereum
        .request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: CHAIN_ID }],
        })
        .then((result: any) => {
          resolve(true);
        });
    } catch (switchError: any) {
      const { ethereum } = window as any;

      if (!ethereum) {
        resolve(false);
        return
      }
      if (switchError.code === 4902) {
        try {
          const { ethereum } = window as any;
          await ethereum
            .request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: CHAIN_ID,
                  chainName: NETWORK_NAME,
                  rpcUrls: [
                    RPC_URL,
                  ],
                  blockExplorerUrls: [EXPLORAR_LINK],
                  iconUrls: [
                    "",
                  ],
                  nativeCurrency: {
                    name: "MATIC",
                    symbol: "MATIC",
                    decimals: 18,
                  },
                },
              ],
            })
            .then((result: any) => {
              resolve(true);
            });
        } catch (addError: any) {
          toaster.error(addError.message);
          resolve(false);
        }
      } else {
        toaster.error(switchError.message);
        resolve(false);
      }
    }
  });
};

/**DISCONNECT WALLET */
export const disconnectWallet = () => async (dispatch: DispatchType) => {
  try {
    dispatch(walletType(''))
    dispatch(walletAddress(''))
  } catch (error: any) {
    return toaster.error(error.message)
  }
}

// Login Function
export const loginAdmin = (data: any) => {
  return (dispatch: any) =>
    new Promise((resolve, reject) => {
      apiCallPost(APIURL.LOGIN, data, {}, true, true)
        .then(async (result: any) => {
          let data: any = result
          data.token = result.token
          await dispatch(token(data.token))
          await dispatch(email(data.email))
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
}

// Logout Function
export const logOut = (message = true) => async (
  dispatch: any,
  getState: any,
) => {
  try {
    dispatch(walletAddress(''))
    dispatch(token(''))
    if (message) {
      toaster.success('Logged out successfully')
    }
  } catch (error: any) {
    return toaster.error(error.message)
  }
}

export const getPropertyList = (
  currentPage?: any,
  limit?: any,
  seachData?: any,
  data?: any,
) => {
  return (dispatch: any) =>
    new Promise((resolve, reject) => {
      let query: any = {}
      if (currentPage) {
        query.page = currentPage
      }
      if (limit) {
        query.limit = limit
      }
      if (data) {
        query.remittance = data
      }
      if (seachData) {
        query.search = seachData
      }

      apiCallGet(APIURL.GET_ALL_PROPERTY, query, false)
        .then(async (result) => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
}

export const seeDetails = (data: any) => {
  return (dispatch: any) =>
    new Promise((resolve, reject) => {
      let query: any = {}
      if (data) {
        query.email = data
      }
      apiCallGet(APIURL.SEE_DETAILS, query, false)
        .then(async (result) => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
}

// unlist property
// export const UnListProperty = (data: any) => {
//     return (dispatch: any) =>
//         new Promise((resolve, reject) => {
//             apiCallPost(APIURL.UNLIST_PROPERTY, data, {}, false, true)
//                 .then(async (result) => {
//                     resolve(result);
//                 })
//                 .catch((error) => {
//                     reject(error);
//                 });
//         });
// };

// add property
export const addProperty = (data: any) => {
  return (dispatch: any) =>
    new Promise((resolve, reject) => {
      apiCallPost(APIURL.ADD_PROPERTY, data, {}, false, true)
        .then(async (result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
};


// Reset passowrd Function
// export const resetPassword = (data: any) => {
//   return (dispatch: any) =>
//     new Promise((resolve, reject) => {
//       apiCallPost(APIURL.RESET_PASSWORD, data, {}, true, true)
//         .then(async (result) => {
//           resolve(result)
//         })
//         .catch((error) => {
//           reject(error)
//         })
//     })
// }