import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface INavbarState{ 
    show: boolean
}

const navbarSlice = createSlice({
    name: "navbar",
    initialState: { show: true} as INavbarState,
    reducers: {
        setShow(state, {payload}:PayloadAction<boolean>){
            return { show: payload };
        }
    }
})

export default navbarSlice.reducer;

export const navbarActions = navbarSlice.actions;