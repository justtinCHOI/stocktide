import {useNavigate} from "react-router-dom";
import { loginRequest, logout } from '@slices/memberSlice';
import {useDispatch, useSelector} from "react-redux";
import { AppDispatch, RootState, store } from '@/store';
import { CustomLoginHook } from '@typings/hooks';
import { LoginParam, MemberSliceState } from '@typings/member';
import { Member } from '@typings/entity';
import { toast } from 'react-toastify';

const useCustomMember = (): CustomLoginHook => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const memberState = useSelector((state: RootState) => state.memberSlice) as MemberSliceState;
  const loginState = memberState.member as Member;
  const isLogin = !!memberState.member?.email;

  const doLogin = async (loginParam: LoginParam) => {
    dispatch(loginRequest(loginParam));
    return new Promise((resolve) => {
      const unsubscribe = store.subscribe(() => {
        const state = store.getState().memberSlice as MemberSliceState;
        if (!state.loading) {
          unsubscribe();
          if (state.error) {
            toast.error("이메일과 비밀번호를 확인해주세요");
          } else if (state.member) {
            toast.success("로그인 성공!");
            moveToPath('/');
          }
          resolve(state);
        }
      });
    });
  };

  const doLogout = async () => {
    dispatch(logout());
  }

  const moveToPath = (path: string) => {  //----------------페이지 이동
    navigate({pathname: path}, {replace:true})
  }

  const moveToLogin = () => { //----------------------로그인 페이지로 이동 // 이벤트 기반
    navigate({pathname: '/member/login'}, {replace:true})
  }

  return  {loginState, isLogin, doLogin, doLogout, moveToPath, moveToLogin}

}

export default useCustomMember
