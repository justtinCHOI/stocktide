import React, { FC, useState } from 'react';
import styled from "styled-components";
import useCustomMember from "@hooks/useCustomMember.ts";
import KakaoLoginComponent from '@components/member/kakao/KakaoLoginComponent';
import { LoginState } from '@typings/member';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ToastManager from '@utils/toastUtil';

const initState: LoginState = {
    email: '',
    password: ''
};

const LoginComponent: FC = () => {
    const { t } = useTranslation();
    const [loginParam, setLoginParam] = useState<LoginState>({ ...initState });
    const { doLogin } = useCustomMember();

    const handleChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginParam(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleClickLogin = () => {
        if (!loginParam.email) {
            ToastManager.warning("이메일을 입력해주세요");
            return;
        }
        if (!loginParam.password) {
            ToastManager.warning("비밀번호를 입력해주세요");
            return;
        }

        doLogin(loginParam).then();
    };

    const handleClickSignin = () => {
        //todo
    };

    return (
      <Container>
          <InputContainer>
              <Label>{t('login.email')}</Label>
              <Input
                name="email"
                type="text"
                value={loginParam.email}
                onChange={handleChange}
              />
          </InputContainer>
          <InputContainer>
              <Label>{t('login.password')}</Label>
              <Input
                name="password"
                type="password"
                value={loginParam.password}
                onChange={handleChange}
              />
          </InputContainer>
          <ButtonContainer>
              <Button onClick={handleClickLogin}>
                  {t('login.loginButton')}
              </Button>
              <Button onClick={handleClickSignin}>
                  {t('login.signupButton')}
              </Button>
          </ButtonContainer>
          <KakaoLoginComponent buttonText={t('login.kakaoLogin')} />
      </Container>
    );
};

export default LoginComponent;

// Styled Components
const Container = styled.div`
    margin-top: 6rem;
  .flex {
    display: flex;
    justify-content: center;
  }
`;

const InputContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Label = styled.div`
  width: 100%;
  padding: 1rem;
  text-align: left;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.25rem;
  border: 1px solid #999;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
`;

const ButtonContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Button = styled.div`
    padding: 0.8rem;
    width: 8rem;
    margin: 0 1rem;
    background-color: #007bff;
    color: white;
    font-size: 1rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    text-align: center;

    &:hover {
        background-color: #0056b3;
    }
`;
