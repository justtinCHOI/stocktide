import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { FC } from 'react';
import { toast } from 'react-toastify';

const LanguageSelector: FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then(() =>{
        if(lng === 'ko'){
          toast.success("한국어로 변경되었습니다");
        }else{
          toast.success("영어로 변경되었습니다.");
        }
      }
    );
  };

  return (
    <Container>
      <Button onClick={() => changeLanguage('ko')}>한국어</Button>
      <Button onClick={() => changeLanguage('en')}>English</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
`;

export default LanguageSelector;