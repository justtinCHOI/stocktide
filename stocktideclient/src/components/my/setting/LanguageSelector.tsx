import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { SectionTitle, ThemeOption, ThemeSelector } from '@components/my/setting/SettingComponent';

const LanguageSelector: FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then(() =>{
      lng === 'ko'
        ? t('settings.language.changeToKorean')
        : t('settings.language.changeToEnglish')
      }
    );
  };

  return (
    <>
      <SectionTitle>
        <Globe size={20} />{t('settings.language.title')}
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