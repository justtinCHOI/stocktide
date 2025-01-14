import { call, CallEffect, put, PutEffect, takeLatest } from 'redux-saga/effects';
import { loginPost, modifyMember } from '@api/memberApi';
import {
  loginSuccess,
  loginFailure,
  loginRequest,
  modifyMemberSuccess,
  modifyMemberFailure, modifyMemberRequest,
} from '@slices/memberSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { LoginParam, LoginResponse } from '@typings/member';
import { MemberModifyDTO } from '@typings/dto';

type LoginSuccessAction = ReturnType<typeof loginSuccess>;
type LoginFailureAction = ReturnType<typeof loginFailure>;

interface loginFailurePayload {
  error?: string;
}

function* loginSaga(action: PayloadAction<LoginParam>): Generator<
  | CallEffect<LoginResponse>
  | PutEffect<LoginSuccessAction>
  | PutEffect<LoginFailureAction>,
  void,
  LoginResponse
>  {
  try {
    const response = yield call(loginPost, action.payload) ;
    const availableResponse = response as loginFailurePayload;
    if (availableResponse.error === 'ERROR_LOGIN') {
      yield put(loginFailure('ERROR_LOGIN'));
    }
    yield put(loginSuccess(response));
  } catch (error) {
    yield put(loginFailure(error));
  }
}

// 수정 saga 추가
function* modifyMemberSaga(action: PayloadAction<MemberModifyDTO>) {
  try {
    const response: MemberModifyDTO = yield call(modifyMember, action.payload);
    yield put(modifyMemberSuccess(response));
  } catch (error: any) {
    yield put(modifyMemberFailure(error.message));
  }
}



export function* watchLogin() {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(modifyMemberRequest.type, modifyMemberSaga);
}
