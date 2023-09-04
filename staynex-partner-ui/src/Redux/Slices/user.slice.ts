import { createSlice } from "@reduxjs/toolkit";

/**USER DETAILS SLICE */
export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        walletAddress: "",
        walletType: "",
        userDetails: {},
        network: "matic",
        token: '',
        propertyDetails : {}
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
        token: (state, param) => {
            const { payload } = param;
            state.token = payload;
        },
        walletType: (state, param) => {
            const { payload } = param;
            state.walletType = payload;
        },
        propertyDetails: (state, param) => {
            const { payload } = param;            
            state.propertyDetails = payload;
        },
        logoutUser: (state) => {
            state.walletAddress = "";
            state.walletType = "";
        }
    }
});

/**ACTIONS FOR SLICE*/
export const { userDetails, walletAddress, logoutUser, token, walletType , propertyDetails} = UserSlice.actions

 