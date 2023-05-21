import { IRect } from ".";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IPopoverCardState{
    rect: IRect;
    data: any;
    show: boolean;
}

export const slice = createSlice({
    name: "popoverCard",
    initialState: { rect: {x:0, y:0, height:0}, show:false } as IPopoverCardState,
    reducers: {
        setPos(state, action:PayloadAction<IRect>){
            return {...state, rect: action.payload};
        },
        setShow(state, action:PayloadAction<boolean>){
            return  {...state, show: action.payload}
        },
        setData(state, action:PayloadAction<any>){
            return {...state, data: action.payload};
        }
    }
});

export const popoverCardAction = slice.actions;

export default slice.reducer;