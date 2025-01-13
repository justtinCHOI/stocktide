import { call, CallEffect, put, PutEffect, takeLatest } from 'redux-saga/effects';
import { loginPost } from '@api/memberApi';
import { loginSuccess, loginFailure, loginRequest } from '@slices/memberSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { LoginParam, LoginResponse } from '@typings/member';

type LoginSuccessAction = ReturnType<typeof loginSuccess>;
type LoginFailureAction = ReturnType<typeof loginFailure>;

function* loginSaga(action: PayloadAction<LoginParam>): Generator<
  | CallEffect<LoginResponse>
  | PutEffect<LoginSuccessAction>
  | PutEffect<LoginFailureAction>,
  void,
  LoginResponse
>  {
  try {
    const response = yield call(loginPost, action.payload);
    yield put(loginSuccess(response));
  } catch (error) {
    yield put(loginFailure(error));
  }
}

export function* watchLogin() {
  yield takeLatest(loginRequest.type, loginSaga);
}
