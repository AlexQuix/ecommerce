import { IRect } from ".";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IGalleryPopoverState{
    rect: IRect;
    data: any;
    show: boolean;
}

export const popoverSlice = createSlice({
    name: "popoverGallery",
    initialState: { rect: {x:0, y:0, height:0}, show:false } as IGalleryPopoverState,
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

export const popGalleryActions = popoverSlice.actions;

export default popoverSlice.reducer;