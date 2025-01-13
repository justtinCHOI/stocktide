import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@utils/localStorageUtil';
import { LoginParam, MemberSliceState } from '@typings/member';

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

export const { logout, loginSuccess, loginRequest, loginFailure } = memberSlice.actions;
export const memberReducer =  memberSlice.reducer;
