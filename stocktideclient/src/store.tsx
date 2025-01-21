import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '@/store/sagas/rootSaga';
import { memberReducer } from '@slices/memberSlice';
import { companyIdReducer } from '@slices/companyIdSlice';
import { compareIdReducer } from '@slices/compareIdSlice';
import { cashReducer, CashSliceState } from '@slices/cashSlice';
import { stockOrderTypeReducer } from '@slices/stockOrderTypeSlice';
import { stockOrderPriceReducer } from '@slices/stockOrderPriceSlice';
import { stockOrderVolumeReducer } from '@slices/stockOrderVolumeSlice';
import { decisionWindowReducer } from '@slices/decisionWindowSlice';
import { chatReducer, ChatSliceState } from '@slices/chatSlice';
import { MemberSliceState } from '@typings/member';
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    memberSlice: memberReducer,
    companyIdSlice: companyIdReducer,
    compareIdSlice: compareIdReducer,
    cashSlice: cashReducer,
    stockOrderTypeSlice: stockOrderTypeReducer,
    stockOrderPriceSlice: stockOrderPriceReducer,
    stockOrderVolumeSlice: stockOrderVolumeReducer,
    decisionWindowSlice: decisionWindowReducer,
    chatSlice: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Thunk 비활성화
      serializableCheck: false, // Saga 에서 Promise 사용을 위해 비활성화
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export interface RootState {
  memberSlice: MemberSliceState;
  companyIdSlice: number;
  compareIdSlice: number;
  cashSlice: CashSliceState;
  stockOrderTypeSlice: boolean;
  stockOrderPriceSlice: number;
  stockOrderVolumeSlice: number;
  decisionWindowSlice: boolean;
  chatSlice: ChatSliceState;
}

export type AppDispatch = typeof store.dispatch;


export default store;