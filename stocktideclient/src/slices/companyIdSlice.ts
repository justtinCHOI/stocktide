import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorage, setLocalStorage } from "@utils/localStorageUtil";

const LOCAL_STORAGE_KEY = 'companyId';

const companyIdSlice = createSlice({
    name: "companyId",
    initialState:  getLocalStorage(LOCAL_STORAGE_KEY) || 5,
    reducers: {
        changeCompanyId: (action: PayloadAction<number>) => {
            setLocalStorage(LOCAL_STORAGE_KEY, action.payload, 30);
            return action.payload;
        },
    },
});

export const { changeCompanyId } = companyIdSlice.actions;
export const companyIdReducer = companyIdSlice.reducer;
