import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useCustomMember from '@hooks/useCustomMember';
import ToastManager from '@utils/toastUtil';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const {isLogin, doLogout} = useCustomMember();

  if (!isLogin) {
    doLogout();
    ToastManager.success('로그인이 필요한 서비스 입니다');
    return <Navigate to="/member/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;