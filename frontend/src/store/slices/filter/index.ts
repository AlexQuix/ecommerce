import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProductQuery } from "../../../services/product";


export interface IFilterForm{
    category: "*" | string,
    offer: number,
    minPrice: number,
    maxPrice: number,
    page: number;
}

export interface IFilterState{
    visibility: boolean;
    query: IProductQuery;
    refreshData: boolean;
}

let initialState: IFilterState = {
    visibility: false,
    query: {
        product: "*",
        category: "Todos",
        offer: 0,
        minPrice: 0,
        maxPrice: 50000,
        page: 1
    },
    refreshData: false
}

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        showFilter(state){
            state.visibility = true;
        },
        hideFilter(state){
            state.visibility = false;
        },
        setQuery(state, action:PayloadAction<IFilterForm>){
            state.query = {...state.query, ...action.payload};
        },
        setKeyword(state, action:PayloadAction<string>){
            state.query.product = action.payload;
        },
        notRefresh(state){
            state.refreshData = false;
        },
        refresh(state){
            state.refreshData = true;
        }
    }
})

export const filterActions = filterSlice.actions;

export default filterSlice.reducer