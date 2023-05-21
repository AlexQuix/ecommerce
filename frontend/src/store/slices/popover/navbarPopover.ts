import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PointerConfig } from "../../../components/Popover/PopoverWithPointer";

export interface INavbarPopoverState {
    isLinkHover: boolean;
    isPopoverHover: boolean;
    posx: number;
    posy: number;
    pointer: PointerConfig;
    popoverContent: JSX.Element;
}

export const navbarPopover = createSlice({
    name: "navbarPopover",
    initialState: {
        isLinkHover: false,
        isPopoverHover: false,
        posx: 0,
        posy: 0,
        pointer: {},
        popoverContent: {}
    } as INavbarPopoverState,
    reducers: {
        setIsLinkHover(state, action:PayloadAction<boolean>){
            return {...state, isLinkHover: action.payload};
        },
        setIsPopoverHover(state, action:PayloadAction<boolean>){
            return {...state, isPopoverHover: action.payload};
        },
        setPosition(state, action:PayloadAction<{posx:number, posy:number}>){
            let { posx, posy } = action.payload;
            return {...state, posx, posy};
        },
        setPointer(state, action:PayloadAction<PointerConfig>){
            return {...state, pointer: action.payload};
        },
        setPopoverContent(state, action:PayloadAction<JSX.Element>){
            return {...state, popoverContent: action.payload};
        }
    } 
});

export const navbarPopoverAction = navbarPopover.actions;

export default navbarPopover.reducer;