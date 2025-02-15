import {useNavigate} from "react-router-dom";
import { loginRequest, logout, modifyMemberRequest } from '@slices/memberSlice';
import {useDispatch, useSelector} from "react-redux";
import { AppDispatch, RootState, store } from '@/store';
import { LoginParam, MemberSliceState } from '@typings/member';
import { Member } from '@typings/entity';
import { MemberModifyDTO } from '@typings/dto';
import ToastManager from '@utils/toastUtil';

const useCustomMember = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const memberState = useSelector((state: RootState) => state.memberSlice) as MemberSliceState;
  const loginState = memberState.member as Member;
  const isLogin = !!memberState.member?.email;
  const isLoading = memberState.loading;

  const doLogin = async (loginParam: LoginParam) => {
    dispatch(loginRequest(loginParam));
    return new Promise((resolve) => {
      const unsubscribe = store.subscribe(() => {
        const state = store.getState().memberSlice as MemberSliceState;
        if (!state.loading) {
          unsubscribe();
          if (state.error) {
            ToastManager.error("이메일과 비밀번호를 확인해주세요");
          } else if (state.member) {
            ToastManager.success("로그인 성공!");
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

  const doModifyMember = async (memberModifyDTO: MemberModifyDTO) => {
    dispatch(modifyMemberRequest(memberModifyDTO));
    return new Promise((resolve) => {
      const unsubscribe = store.subscribe(() => {
        const state = store.getState().memberSlice as MemberSliceState;
        if (!state.loading) {
          unsubscribe();
          if (state.error) {
            ToastManager.error("회원정보 수정에 실패했습니다");
          } else {
            ToastManager.success("회원정보가 수정되었습니다");
            moveToPath('/my/info');
          }
          resolve(state);
        }
      });
    });
  };

  const moveToPath = (path: string) => {  //----------------페이지 이동
    navigate({pathname: path}, {replace:true})
  }

  const moveToLogin = () => { //----------------------로그인 페이지로 이동 // 이벤트 기반
    navigate({pathname: '/member/login'}, {replace:true})
  }

  return  {loginState, isLogin, isLoading, doLogin, doLogout, doModifyMember, moveToPath, moveToLogin}

}

export default useCustomMember
