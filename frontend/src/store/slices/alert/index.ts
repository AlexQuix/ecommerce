import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AlertType = "success" | "danger" | "warning";

export interface IAlertState {
    show: boolean;
    message: string;
    type: AlertType;
}


const initialState: IAlertState = {
    show: false,
    message: "",
    type: "danger"
}

export const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        setShow(state, {payload}:PayloadAction<boolean>){
            return {...state, show: payload};
        },
        setMessage(state, {payload}:PayloadAction<string>){
            return {...state, message: payload};
        },
        setType(state, {payload}:PayloadAction<AlertType>){
            return {...state, type: payload};
        }
    }
});

export const alertActions = alertSlice.actions;
export default alertSlice.reducer