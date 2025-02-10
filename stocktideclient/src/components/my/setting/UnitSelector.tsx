import { FC, useState } from 'react';
import { SectionTitle, ThemeOption, ThemeSelector } from '@components/my/setting/SettingComponent';
import { useTranslation } from 'react-i18next';

const UnitSelector: FC = () => {
  const { t } = useTranslation();
  const [currencyUnit, setCurrencyUnit] = useState('krw');

  const handleCurrencyChange = (unit: string) => {
    setCurrencyUnit(unit);
    // 글로벌 상태 관리 또는 localStorage에 저장
    localStorage.setItem('currencyUnit', unit);
  };
  return (
    <>
      <SectionTitle>
        💱 {t('settings.currency.title')}
      </SectionTitle>
      <ThemeSelector>
        <ThemeOption
          onClick={() => handleCurrencyChange('krw')}
          $isSelected={currencyUnit === 'krw'}
        >
          {t('settings.currency.krw')}
        </ThemeOption>
        <ThemeOption
          onClick={() => handleCurrencyChange('usd')}
          $isSelected={currencyUnit === 'usd'}
        >
          {t('settings.currency.usd')}
        </ThemeOption>
      </ThemeSelector>
    </>
  );
};



export default UnitSelector;