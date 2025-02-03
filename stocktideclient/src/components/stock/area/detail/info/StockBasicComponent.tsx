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
  const { i18n } = useTranslation();

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
          <Title>기업 기본 정보</Title>
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
          {error?.message || '데이터를 불러올 수 없습니다.'}
        </ErrorMessage>
        <RefreshButton onClick={handleRefresh}>
          <RefreshCw size={16} />
          다시 시도
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
    { label: '종목번호', value: pdno },
    { label: '상품명', value: i18n.language === 'ko' ? prdt_abrv_name : prdt_eng_abrv_name },
    { label: '상장주식수', value: `${Number(lstg_stqt).toLocaleString()} 주` }, // 2
    { label: '자본금', value: `${Number(cpta).toLocaleString()} 원` }, // 1
    { label: '액면가', value: `${Number(papr).toLocaleString()} 원` }, // 1, 2
  ];

  return (
    <Section>
      <TitleRow>
        <Title>기업 기본 정보</Title>
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
