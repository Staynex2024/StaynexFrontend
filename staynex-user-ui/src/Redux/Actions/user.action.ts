import Swal from "sweetalert2";
import Web3 from "web3";
import toaster from "../../Components/Common/Toast";
import { CHAIN_ID, EXPLORAR_LINK, NETWORK_DECIMALS, NETWORK_NAME, NETWORK_SYMBOL, RPC_URL } from "../../Constant";
import { apiCallPost, storeInstance } from "../../Services/axios.service";
import { APIURL } from "../../Utils";
import { token, walletAddress, walletType } from "../Slices/user.slice";

/**DECLARE ETHEREUM TYPE */
declare global {
    interface Window {
        ethereum?: any
    }
}

/**CHECK WHETHER METAMASK IS INSTALLED OR NOT */
export const isMetaMaskInstalled = async () => {
    const { ethereum } = window;
    const result = await Boolean(ethereum);
    return result;
};

const { ethereum }: any = window;
if (ethereum) {
    ethereum.on('networkChanged', function () {
        approveNetwork();
    })

    ethereum.on('accountsChanged', function (account: any) {
        if (!account.length) {
            storeInstance.dispatch(walletAddress(""))
            Swal.fire({
                icon: "info",
                title: "Wallet Disconnected",
                text: "Please connect wallet to continue",
                showCancelButton: false,
                confirmButtonText: "Ok",
            })
        }
    })
}

/**CONNECT WITH METAMASK */
export const connectmetamask = () => {
    return (dispatch: DispatchType) =>
        new Promise(async (resolve, reject) => {
            /**CHECK METAMASK IN INSTALLED OR NOT */
            const installed = await isMetaMaskInstalled();
            try {
                let address;
                if (installed) {
                    const { ethereum } = window;

                    /**VERIFY METAMASK HAVE OUR NETWORK AND METAMASK SHOULD BE ON OUR NETWORK */
                    let validNetwork: any = await approveNetwork();
                    if (validNetwork) {

                        /**METHOD CALL WHEN ACCOUNT CHANGED IN METAMASK */
                        ethereum.on("accountsChanged", async function (accounts: string[]) {
                            address = accounts[0];

                            /**SAVE WALLET ADDRESS AND WALLET TYPE IN REDUX */
                            dispatch(walletType("MetaMask"));
                            return dispatch(walletAddress(address));
                        });

                        /**METHOD CALL WHEN NETWORK CHANGED IN METAMASK */
                        // ethereum.on('chainChanged', function (networkId: number) {
                        //     setTimeout(function () { window.location.reload(); }, 1000);
                        // })

                        /**GET ACCOUNT DETAILS */
                        const accounts = await ethereum.request({
                            method: "eth_requestAccounts",
                        });
                        address = accounts[0];

                        /**SAVE WALLET ADDRESS AND WALLET TYPE IN REDUX */
                        dispatch(walletType("MetaMask"));
                        resolve(address);
                        return dispatch(walletAddress(address));
                    } else {
                        reject(false);
                    }
                } else {
                    /**IF METAMASK NOT INSTALLED */
                    reject(false);
                    return toaster.error("Please install Metamask.");
                }
            } catch (error: any) {  
                reject(error);
                return toaster.error(error.message);
            }
        });
};


/**VERIFY METAMASK HAVE OUR NETWORK AND METAMASK SHOULD BE ON OUR NETWORK */
export const approveNetwork = async () => {
    return new Promise(async (resolve, reject) => {
        const { ethereum } = window;
        /**IF METAMASK IS ON DIFFRENT NETWORK */
        if (ethereum.networkVersion !== CHAIN_ID) {
            try {
                /**SWITCH METAMASK TO OUR NETWORK */

                await ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: Web3.utils.toHex(CHAIN_ID) }]
                });
                resolve(true)
            } catch (err: any) {
                /**IF METAMASK DO'NT HAVE OUR NETWORK. ADD NEW NETWORK */
                if (err.code === 4902) {
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: Web3.utils.toHex(CHAIN_ID),
                                chainName: NETWORK_NAME,
                                nativeCurrency: { name: NETWORK_NAME, symbol: NETWORK_SYMBOL, decimals: NETWORK_DECIMALS },
                                rpcUrls: [RPC_URL],
                                blockExplorerUrls: [EXPLORAR_LINK],
                            }
                        ]
                    });
                    resolve(true)
                } else {
                    resolve(err)
                }
            }
        } else {
            resolve(true)
        }
    });
}

/**DISCONNECT WALLET */
export const disconnectWallet = () => async (dispatch: DispatchType) => {
    try {
        dispatch(walletType(""));
        dispatch(walletAddress(''));
    } catch (error: any) {
        return toaster.error(error.message);
    }
};

// Login Function
export const loginAdmin = (data: any) => {
    return (dispatch: any) =>
        new Promise((resolve, reject) => {
            apiCallPost(APIURL.LOGIN, data, {}, true)
                .then(async (result: any) => {
                    let data: any = result
                    data.token = result.token
                    await dispatch(token(data.token))
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        });
};

// Logout Function
export const logOut = (message = true) => async (dispatch: any, getState: any) => {
    try {
      dispatch(walletAddress(''))
      dispatch(token(''))
      if (message) {
        toaster.success("Logged out successfully")
      }
    } catch (error: any) {
      return toaster.error(error.message);
    }
  };
