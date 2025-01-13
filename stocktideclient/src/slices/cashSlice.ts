import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorage, setLocalStorage } from '@utils/localStorageUtil';
import { Cash } from '@typings/entity';

const LOCAL_STORAGE_KEY = 'cashState';

const initState: CashSliceState = {
    cashList: [],
    cashId: 0,
    loading: false,
    error: null
};

export interface CashSliceState {
    cashList: Cash[];
    cashId: number;
    loading: boolean;
    error: string | null;
}

// LocalStorage 에서 초기 상태를 로드
const loadInitialState = () => {
    const savedState = getLocalStorage(LOCAL_STORAGE_KEY);
    return savedState !== null ? savedState : initState;
};

const cashSlice = createSlice({
    name: 'cash',
    initialState: loadInitialState(),
    reducers: {
        setCashList: (state, action) => {
            state.cashList = action.payload;
            if (action.payload.length > 0) {
                state.cashId = action.payload[0].cashId;
            }
            setLocalStorage(LOCAL_STORAGE_KEY, state, 30);
        },
        setCashId: (state, action) => {
            state.cashId = action.payload;
            setLocalStorage(LOCAL_STORAGE_KEY, state, 30);
        },
        // 요청 액션들
        getCashListRequest: (state, action: PayloadAction<number>) => {
            console.log('getCashListRequest', state, action.payload);
            state.loading = true;
            state.error = null;
        },
        createCashRequest: (state, action: PayloadAction<number>) => {
            console.log('createCashRequest', state, action.payload);
            state.loading = true;
            state.error = null;
        },
        deleteCashRequest: (state, action: PayloadAction<number>) => {
            console.log('deleteCashRequest', state, action.payload);
            state.loading = true;
            state.error = null;
        },
        updateCashRequest: (state, action: PayloadAction<{cashId: number; money: number; dollar: number}>) => {
            console.log('updateCashRequest', state, action.payload);
            state.loading = true;
            state.error = null;
        },
        // 성공 액션들
        getCashListSuccess: (state, action: PayloadAction<Cash[]>) => {
            state.cashList = action.payload;
            if (action.payload.length > 0) {
                state.cashId = action.payload[0].cashId;
            }
            state.loading = false;
            state.error = null;
            setLocalStorage(LOCAL_STORAGE_KEY, state, 30);
        },
        createCashSuccess: (state, action: PayloadAction<Cash>) => {
            console.log('createCashSuccess', state, action.payload);
            state.cashList.push(action.payload);
            if (state.cashList.length === 1) {
                state.cashId = action.payload.cashId;
            }
            state.loading = false;
            state.error = null;
            setLocalStorage(LOCAL_STORAGE_KEY, state, 30);
        },
        deleteCashSuccess: (state, action: PayloadAction<number>) => {
            state.cashList = state.cashList.filter((cash: Cash) => cash.cashId !== action.payload);
            if (state.cashList.length === 0) {
                state.cashId = 0;
            } else if (action.payload === state.cashId) {
                state.cashId = state.cashList[0].cashId;
            }
            state.loading = false;
            state.error = null;
            setLocalStorage(LOCAL_STORAGE_KEY, state, 30);
        },
        updateCashSuccess: (state, action: PayloadAction<Cash>) => {
            const index = state.cashList.findIndex((cash: Cash) => cash.cashId === action.payload.cashId);
            if (index !== -1) {
                state.cashList[index] = action.payload;
            }
            state.loading = false;
            state.error = null;
            setLocalStorage(LOCAL_STORAGE_KEY, state, 30);
        },
        // 실패 액션
        cashFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
});

export const {
    setCashList,
    setCashId,
    getCashListRequest,
    createCashRequest,
    deleteCashRequest,
    updateCashRequest,
    getCashListSuccess,
    createCashSuccess,
    deleteCashSuccess,
    updateCashSuccess,
    cashFailure
} = cashSlice.actions;
export const cashReducer = cashSlice.reducer;
