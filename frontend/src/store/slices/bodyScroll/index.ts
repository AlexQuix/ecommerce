import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IBodyScrollState{
    hidden: boolean;
}

export const bodyScrollSlice = createSlice({
    name: "body-scroll",
    initialState: { hidden:false } as IBodyScrollState,
    reducers: {
        setHidden(state, {payload}:PayloadAction<boolean>){
            return { hidden: payload };
        }
    }
});

export const bodySrollActions = bodyScrollSlice.actions

export default bodyScrollSlice.reducer;