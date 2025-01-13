import { createSlice } from "@reduxjs/toolkit";

const initialState = 0;

const stockOrderPriceSlice = createSlice({
    name: "stockOrderPrice",
    initialState: initialState,
    reducers: {
        setStockOrderPrice: (state, action) => {
            state = action.payload;
            return state;
        },
        plusStockOrderPrice: (state, action) => state + action.payload,
        minusStockOrderPrice: (state, action) => (state > action.payload ? state - action.payload : state),
    },
});

export const { setStockOrderPrice, plusStockOrderPrice, minusStockOrderPrice } = stockOrderPriceSlice.actions;
export const stockOrderPriceReducer = stockOrderPriceSlice.reducer;
