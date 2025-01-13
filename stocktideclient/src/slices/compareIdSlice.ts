import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from '@utils/localStorageUtil';

const LOCAL_STORAGE_KEY = 'compareId';

const compareIdSlice = createSlice({
  name: "compareId",
  initialState: getLocalStorage(LOCAL_STORAGE_KEY) || 6,
  reducers: {
    changeCompareId: (action) => {
      setLocalStorage(LOCAL_STORAGE_KEY, action.payload, 30); // 30일 동안 유효한 상태로 저장
      return action.payload;
    },
  },
});

export const { changeCompareId } = compareIdSlice.actions;
export const compareIdReducer = compareIdSlice.reducer;
