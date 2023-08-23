import { createSlice } from "@reduxjs/toolkit";

/**USER DETAILS SLICE */
export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        walletAddress: "",
        isWalletConnected: "",
        walletType: "",
        walletDetails: "",
        userDetails: {},
        network: "matic",
        token: '',
        conversionRate: 1,
        currencySymbol: 'USD'
    },

    reducers: {
        userDetails: (state, param) => {
            const { payload } = param;
            state.userDetails = payload;
        },

        walletAddress: (state, param) => {
            const { payload } = param;
            state.walletAddress = payload;
        },
        walletDetails: (state, param) => {
            const { payload } = param;
            state.walletDetails = payload;
        },
        token: (state, param) => {
            const { payload } = param;
            state.token = payload;
        },
        walletType: (state, param) => {
            const { payload } = param;
            state.walletType = payload;
        },
        conversionRate: (state, param) => {
            const { payload } = param;
            state.conversionRate = payload;
        },
        currencySymbol: (state, param) => {
            const { payload } = param;
            state.currencySymbol = payload;
        },

        logoutUser: (state) => {
            state.walletAddress = "";
            state.walletType = "";
        }
    }
})

/**ACTIONS FOR SLICE*/
export const { userDetails, walletAddress, logoutUser, token, walletType, walletDetails, conversionRate, currencySymbol } = UserSlice.actions

