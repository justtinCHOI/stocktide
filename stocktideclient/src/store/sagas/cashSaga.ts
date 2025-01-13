import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { createCash, deleteCash, getCashList, updateCash } from '@api/accountApi';
import {
  getCashListRequest,
  createCashRequest,
  deleteCashRequest,
  updateCashRequest,
  getCashListSuccess,
  createCashSuccess,
  deleteCashSuccess,
  updateCashSuccess,
  cashFailure
} from '@slices/cashSlice';
import { Cash } from '@typings/entity';

function* getCashListSaga(action: PayloadAction<number>): Generator<any, void, Cash[]> {
  try {
    const cashList = yield call(getCashList, action.payload);
    yield put(getCashListSuccess(cashList));
  } catch (error: any) {
    yield put(cashFailure(error.message));
  }
}

function* createCashSaga(action: PayloadAction<number>): Generator<any, void, Cash> {
  try {
    const newCash = yield call(createCash, action.payload);
    yield put(createCashSuccess(newCash));
  } catch (error: any) {
    yield put(cashFailure(error.message));
  }
}

function* deleteCashSaga(action: PayloadAction<number>): Generator<any, void, number> {
  try {
    const deletedCashId = yield call(deleteCash, action.payload);
    yield put(deleteCashSuccess(deletedCashId));
  } catch (error: any) {
    yield put(cashFailure(error.message));
  }
}

interface UpdateCashPayload {
  cashId: number;
  money: number;
  dollar: number;
}

function* updateCashSaga(action: PayloadAction<UpdateCashPayload>): Generator<any, void, Cash> {
  try {
    const { cashId, money, dollar } = action.payload;
    const updatedCash = yield call(updateCash, cashId, money, dollar);
    yield put(updateCashSuccess(updatedCash));
  } catch (error: any) {
    yield put(cashFailure(error.message));
  }
}

export function* watchCash() {
  yield takeLatest(getCashListRequest.type, getCashListSaga);
  yield takeLatest(createCashRequest.type, createCashSaga);
  yield takeLatest(deleteCashRequest.type, deleteCashSaga);
  yield takeLatest(updateCashRequest.type, updateCashSaga);
}