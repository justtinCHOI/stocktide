import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Globe } from 'lucide-react';
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
    <LanguageContainer>
      <LanguageHeader>
        <Globe size={20} />
        <HeaderText>언어 설정</HeaderText>
      </LanguageHeader>
      <LanguageButtonGroup>
        <LanguageButton
          $isActive={i18n.language === 'ko'}
          onClick={() => changeLanguage('ko')}
        >
          한국어
        </LanguageButton>
        <LanguageButton
          $isActive={i18n.language === 'en'}
          onClick={() => changeLanguage('en')}
        >
          English
        </LanguageButton>
      </LanguageButtonGroup>
    </LanguageContainer>
  );
};

const LanguageContainer = styled.div`
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const LanguageHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    color: #333;
`;

const HeaderText = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
`;

const LanguageButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const LanguageButton = styled.button<{ $isActive: boolean }>`
  flex: 1;
  padding: 12px;
  border: 2px solid ${props => props.$isActive ? '#4A90E2' : '#E0E0E0'};
  border-radius: 8px;
  background: ${props => props.$isActive ? '#4A90E2' : 'white'};
  color: ${props => props.$isActive ? 'white' : '#333'};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$isActive ? '#357ABD' : '#F5F5F5'};
    border-color: ${props => props.$isActive ? '#357ABD' : '#CCCCCC'};
  }
`;

export default LanguageSelector;