import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@utils/localStorageUtil';
import { LoginParam, MemberSliceState } from '@typings/member';
import { MemberModifyDTO } from '@typings/dto';

const initState: MemberSliceState = {
    member: null,
    loading: false,
    error: null,
};

const memberSlice = createSlice({
    name: 'loginSlice',
    initialState: loadMemberLocalStorage() || initState,
    reducers: {
        loginRequest: (state, action: PayloadAction<LoginParam>) => {
            console.log('loginRequest', action.payload);
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            setLocalStorage("member", action.payload, 1);
            state.member = action.payload;
            state.loading = false;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.member = null;
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            removeLocalStorage("member");
            removeLocalStorage("cashState");
            state.member = null;
            state.loading = false;
            state.error = null;
        },
        modifyMemberRequest: (state, action: PayloadAction<MemberModifyDTO>) => {
            console.log('modifyMemberRequest', action.payload);
            state.loading = true;
            state.error = null;
        },
        modifyMemberSuccess: (state, action: PayloadAction<MemberModifyDTO>) => {
            state.member = {
                ...state.member,
                name: action.payload.name,
                email: action.payload.email,
                password: action.payload.password
            };
            setLocalStorage("member", state.member, 1);
            state.loading = false;
            state.error = null;
        },
        modifyMemberFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload as any;
        }
    },
});

function loadMemberLocalStorage() {
    const memberInfo = getLocalStorage("member");
    if (memberInfo && memberInfo.nickname) {
        memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
    }
    return {
        member: memberInfo || null,
        loading: false,
        error: null,
    }
}

export const { logout, loginSuccess, loginRequest, loginFailure, modifyMemberRequest,
    modifyMemberSuccess,
    modifyMemberFailure } = memberSlice.actions;
export const memberReducer =  memberSlice.reducer;
