import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const decisionWindowSlice = createSlice({
    name: "stock order decision window",
    initialState: initialState,
    reducers: {
        openDecisionWindow: () => true,
        closeDecisionWindow: () => false,
    },
});

export const { openDecisionWindow, closeDecisionWindow } = decisionWindowSlice.actions;
export const decisionWindowReducer = decisionWindowSlice.reducer;
