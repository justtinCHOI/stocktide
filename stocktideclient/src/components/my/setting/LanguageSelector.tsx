import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import ToastManager from '@utils/toastUtil';
import { SectionTitle, ThemeOption, ThemeSelector } from '@components/my/setting/SettingComponent';

const LanguageSelector: FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then(() =>{
        if(lng === 'ko'){
          ToastManager.success("한국어로 변경되었습니다");
        }else{
          ToastManager.success("영어로 변경되었습니다.");
        }
      }
    );
  };

  return (
    <>
      <SectionTitle>
        <Globe size={20} />언어 설정
      </SectionTitle>
      <ThemeSelector>
        <ThemeOption
          onClick={() => changeLanguage('ko')}
          $isSelected={i18n.language === 'ko'}
        >
          한국어
        </ThemeOption>
        <ThemeOption
          onClick={() => changeLanguage('en')}
          $isSelected={i18n.language === 'en'}
        >
          English
        </ThemeOption>
      </ThemeSelector>
    </>
  );
};

export default LanguageSelector;