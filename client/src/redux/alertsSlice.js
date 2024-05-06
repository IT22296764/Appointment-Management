import { createSlice } from '@reduxjs/toolkit';


export const alertsSlice = createSlice({
    name:"alerts",
    initialState:{
        loarding:false,
    },
    reducers: {
        showLoarding:(state) => {
            state.loarding = true;
        },
        hideLoarding:(state) => {
            state.loarding = false;
    
    }
},
});
export const { reducer: alertsReducer } = alertsSlice;
export const {showLoarding, hideLoarding } = alertsSlice.actions;