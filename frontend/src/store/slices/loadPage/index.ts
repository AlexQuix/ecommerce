import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ILoadPageState{
    load: boolean;
}

export const slice = createSlice({
    name: "load",
    initialState: { load: false } as ILoadPageState,
    reducers: {
        setLoad(state, payload:PayloadAction<boolean>){
            return { load: payload.payload };
        }
    }
});

export const loadPageActions = slice.actions;

export default slice.reducer;