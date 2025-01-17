import { FC, useState } from 'react';
import useGetStockBasic from '@hooks/companyInfo/useGetStockBasic';
import styled from 'styled-components';
import { SkeletonBox } from '@components/common/Skeleton';
import { RefreshCw } from 'lucide-react';
import { useMediaQuery } from '@hooks/useMediaQuery';

interface StockBasicComponentProps {
  companyId: number;
}

const StockBasicComponent: FC<StockBasicComponentProps> = ({ companyId }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { data, isLoading, isError, error, refetch } = useGetStockBasic(companyId);

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
          {[...Array(6)].map((_, index) => (
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
    prdt_name = '-',
    lstg_stqt = '0',
    lstg_cptl_amt = '0',
    cpta = '0',
    papr = '0'
  } = data.output || {};

  const infoItems = [
    { label: '종목번호', value: pdno },
    { label: '상품명', value: prdt_name },
    { label: '상장주식수', value: `${Number(lstg_stqt).toLocaleString()} 주` },
    { label: '상장자본금', value: `${Number(lstg_cptl_amt).toLocaleString()} 원` },
    { label: '자본금', value: `${Number(cpta).toLocaleString()} 원` },
    { label: '액면가', value: `${Number(papr).toLocaleString()} 원` },
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

const Section = styled.section`
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
`;

const TitleRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

const Title = styled.h2`
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
`;

const InfoContainer = styled.div<{ $isMobile?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: ${({ $isMobile }) => ($isMobile ? '8px' : '16px')};
`;

const InfoRow = styled.div<{ $isMobile?: boolean }>`
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #eee;
    flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
    gap: ${({ $isMobile }) => ($isMobile ? '4px' : '0')};
`;

const Label = styled.span`
    color: #666;
    font-size: 0.9rem;
`;

const Value = styled.span`
    color: #333;
    font-weight: 500;
    text-align: right;
`;

const ErrorContainer = styled.div`
    text-align: center;
    padding: 20px;
    background-color: #fff3f3;
    border-radius: 8px;
    border: 1px solid #ffcdd2;
`;

const ErrorMessage = styled.p`
    color: #e74c3c;
    margin-bottom: 12px;
`;

interface RefreshButtonProps {
  $isRefreshing?: boolean;
}

const RefreshButton = styled.button<RefreshButtonProps>`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    background-color: #f5f5f5;
    color: #666;
    cursor: pointer;
    transition: all 0.2s ease;

    svg {
        animation: ${({ $isRefreshing }) =>
                $isRefreshing ? 'spin 1s linear infinite' : 'none'};
    }

    &:hover {
        background-color: #eeeeee;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.7;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;