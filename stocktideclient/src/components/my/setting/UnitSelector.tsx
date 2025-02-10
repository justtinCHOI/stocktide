import { FC, useState } from 'react';
import { SectionTitle, ThemeOption, ThemeSelector } from '@components/my/setting/SettingComponent';
import { useTranslation } from 'react-i18next';

const UnitSelector: FC = () => {
  const { t, i18n } = useTranslation();
  const [currencyUnit, setCurrencyUnit] = useState('krw');

  const handleCurrencyChange = (unit: string) => {
    setCurrencyUnit(unit);
    // 글로벌 상태 관리 또는 localStorage에 저장
    localStorage.setItem('currencyUnit', unit);
  };
  return (
    <>
      <SectionTitle>
        💱 화폐 단위
      </SectionTitle>
      <ThemeSelector>
        <ThemeOption
          onClick={() => handleCurrencyChange('krw')}
          $isSelected={currencyUnit === 'krw'}
        >
          한국 원 (KRW)
        </ThemeOption>
        <ThemeOption
          onClick={() => handleCurrencyChange('usd')}
          $isSelected={currencyUnit === 'usd'}
        >
          미국 달러 (USD)
        </ThemeOption>
      </ThemeSelector>
    </>
  );
};



export default UnitSelector;