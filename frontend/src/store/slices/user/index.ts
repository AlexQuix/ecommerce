import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IClient } from "../../../services/client";

export type IUserState = {
    data: IClient | null;
    isLogged: boolean;
}

let initialState: IUserState = { 
    data: null, 
    isLogged: false 
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setData(state, action:PayloadAction<IClient>){
            state.data = action.payload;
        },
        setIsLogged(state, action:PayloadAction<boolean>){
            state.isLogged = action.payload;
        },
        reset(state, action){
            state.data = null;
            state.isLogged = false;
        }
    }
});


export const userActions = userSlice.actions;
export default userSlice.reducer;