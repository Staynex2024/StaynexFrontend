import { createSlice } from "@reduxjs/toolkit";

/**USER DETAILS SLICE */
export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        walletAddress: "",
        walletType: "",
        email: "",
        network: "matic",
        token: '',
    },

    reducers: {
        email: (state, param) => {
            const { payload } = param;
            state.email = payload;
        },

        walletAddress: (state, param) => {
            const { payload } = param;
            state.walletAddress = payload;
        },
        token: (state, param) => {
            const { payload } = param;
            state.token = payload;
        },
        walletType: (state, param) => {
            const { payload } = param;
            state.walletType = payload;
        },

        logoutUser: (state) => {
            state.walletAddress = "";
            state.walletType = "";
        }
    }
})

/**ACTIONS FOR SLICE*/
export const { email, walletAddress, logoutUser, token, walletType } = UserSlice.actions

