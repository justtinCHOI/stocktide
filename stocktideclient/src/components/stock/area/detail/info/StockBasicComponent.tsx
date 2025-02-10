import { FC, useState } from 'react';
import useStockBasic from '@hooks/companyInfo/useStockBasic'
import { SkeletonBox } from '@styles/SkeletonStyles';
import { RefreshCw } from 'lucide-react';
import { useMediaQuery } from '@hooks/useMediaQuery';
import {Section, TitleRow, Title, InfoContainer, InfoRow, Label, Value, ErrorContainer, ErrorMessage, RefreshButton } from '@styles/CustomStockTideStyles';
import { useTranslation } from 'react-i18next';

interface StockBasicComponentProps {
  companyId: number;
}

const StockBasicComponent: FC<StockBasicComponentProps> = ({ companyId }) => {
  const { t, i18n } = useTranslation();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { data, isLoading, isError, error, refetch } = useStockBasic(companyId);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };
  if (isLoading) {
    return (
      <Section>
        <TitleRow>
          <Title>{t('stockBasic.title')}</Title>
        </TitleRow>
        <InfoContainer>
          {[...Array(5)].map((_, index) => (
            <InfoRow key={index}>
              <SkeletonBox $height="24px" $width="30%" />
              <SkeletonBox $height="24px" $width="60%" />
            </InfoRow>
          ))}
        </InfoContainer>
      </Section>
    );
  }

  if (isError || !data) {
    return (
      <ErrorContainer>
        <ErrorMessage>
          {error?.message ||  t('error.data.loadFail')}
        </ErrorMessage>
        <RefreshButton onClick={handleRefresh}>
          <RefreshCw size={16} />
          {t('error.data.retry')}
        </RefreshButton>
      </ErrorContainer>
    );
  }

  // 안전한 데이터 추출
  const {
    pdno = '-',
    prdt_abrv_name = '-',
    prdt_eng_abrv_name = '-',
    lstg_stqt = '0',
    cpta = '0',
    papr = '0'
  } = data || {};

  const infoItems = [
    {
      label: t('stockBasic.stockNumber'),
      value: pdno
    },
    {
      label: t('stockBasic.productName'),
      value: i18n.language === 'ko' ? prdt_abrv_name : prdt_eng_abrv_name
    },
    {
      label: t('stockBasic.listedShares'),
      value: `${Number(lstg_stqt).toLocaleString()} ${t('unit.shares')}`
    },
    {
      label: t('stockBasic.capital'),
      value: `${Number(cpta).toLocaleString()} ${t('unit.currency.krw')}`
    },
    {
      label: t('stockBasic.faceValue'),
      value: `${Number(papr).toLocaleString()} ${t('unit.currency.krw')}`
    }
  ];

  return (
    <Section>
      <TitleRow>
        <Title>{t('stockBasic.title')}</Title>
        <RefreshButton
          onClick={handleRefresh}
          disabled={isRefreshing}
          $isRefreshing={isRefreshing}
        >
          <RefreshCw size={16} />
        </RefreshButton>
      </TitleRow>
      <InfoContainer $isMobile={isMobile}>
        {infoItems.map(({ label, value }, index) => (
          <InfoRow key={index} $isMobile={isMobile}>
            <Label>{label}</Label>
            <Value>{value}</Value>
          </InfoRow>
        ))}
      </InfoContainer>
    </Section>
  );
};

export default StockBasicComponent;
