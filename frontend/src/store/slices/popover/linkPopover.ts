import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ILinkPopoverState {
    closeAll: boolean;
}

export const linkPopover = createSlice({
    name: "linkPopover",
    initialState: {
        closeAll: false
    } as ILinkPopoverState,
    reducers: {
        setCloseAll(state, action:PayloadAction<boolean>){
            return {closeAll: action.payload};
        }
    } 
});

export const navbarPopoverAction = linkPopover.actions;

export default linkPopover.reducer;