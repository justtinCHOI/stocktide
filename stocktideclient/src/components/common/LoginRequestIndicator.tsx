import styled from "styled-components";
import useCustomMember from "@hooks/useCustomMember.ts";
import { FC } from 'react';
const loginRequiredText = "로그인이 필요한 서비스입니다";
const loginBtnText = "StockHolm 로그인";

const LoginRequestIndicator: FC = () => {
    const {moveToLogin} = useCustomMember();

    return (
        <LoginRequestContainer>
            <div className="Notification">{loginRequiredText}</div>
            <button className="LoginButton" onClick={moveToLogin}>{loginBtnText}</button>
        </LoginRequestContainer>
    );
};

const LoginRequestContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  .Notification {
    color: #999999;
  }

  .LoginButton {
    width: 170px;
    height: 32px;
    font-size: 15px;
    font-weight: 400;
    color: white;
    background-color: #2f4f4f;
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;  
  }
`;

export default LoginRequestIndicator;
