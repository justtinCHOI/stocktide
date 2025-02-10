import { FC, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import useCustomCash from "@hooks/useCustomCash";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '@/store';
import { AccountState, ExchangeProps } from '@typings/account';
import { Cash } from '@typings/entity';
import { RefreshCw, ArrowLeft, AlertTriangle, ArrowLeftRight } from 'lucide-react';
import { useMediaQuery } from '@hooks/useMediaQuery';
import {
    Section,
    TitleRow,
    Title,
    InfoContainer,
    InfoRow,
    Label,
    Value,
    ErrorContainer,
    ErrorMessage,
    RefreshButton,
} from '@styles/CustomStockTideStyles';
import {
    SkeletonExchangeContainer,
    SkeletonExchangeRow,
    SkeletonExchangeLabel,
    SkeletonExchangeValue,
} from '@styles/SkeletonAccountStyles';
import ToastManager from '@utils/toastUtil';
import { useTranslation } from 'react-i18next';

const exchangeRate = 1386.83; // 상수로 분리

const initAccountState: AccountState = {
    cashId: 0,
    accountNumber: '',
    money: 0,
    dollar: 0,
}

const ExchangeComponent: FC<ExchangeProps> = ({ cashId }) => {
    const { t } = useTranslation();

    const isMobile = useMediaQuery('(max-width: 768px)');
    const cashState = useSelector((state: RootState) => state.cashSlice);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { doUpdateCash } = useCustomCash();
    const [account, setAccount] = useState(initAccountState);
    const [exchangeCurrency, setExchangeCurrency] = useState("money");
    const [exchangeAmount, setExchangeAmount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const selectedAccount = cashState.cashList.find((cash: Cash) => cash.cashId === cashId);
        if (selectedAccount) {
            setAccount(selectedAccount);
            setIsLoading(false);
        } else {
            setIsError(true);
        }
    }, [cashState, cashId]);


    const handleRefresh = async () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    const handleExchange = async () => {
        if (!exchangeAmount || exchangeAmount <= 0) {
            ToastManager.error("환전 금액을 확인해주세요");
            return;
        }

        let newMoney = account.money;
        let newDollar = account.dollar;

        if (exchangeCurrency === "money") {
            if (exchangeAmount > account.money) {
                ToastManager.error("보유 원화가 부족합니다");
                return;
            }
            newMoney -= exchangeAmount;
            newDollar += exchangeAmount / exchangeRate;
        } else {
            if (exchangeAmount > account.dollar) {
                ToastManager.error("보유 달러가 부족합니다");
                return;
            }
            newMoney += exchangeAmount * exchangeRate;
            newDollar -= exchangeAmount;
        }

        try {
            await doUpdateCash(cashId, Math.floor(newMoney), Math.floor(newDollar));
            ToastManager.success("환전이 완료되었습니다");
            setExchangeAmount(0);
        } catch (error) {
            ToastManager.error("환전 처리 중 오류가 발생했습니다");
        }
    };

    if (isLoading) {
        return (
          <Section>
              <TitleRow>
                  <Title>{t('account.exchange.title')}</Title>
              </TitleRow>
              <SkeletonExchangeContainer>
                  {[...Array(5)].map((_, index) => (
                    <SkeletonExchangeRow key={index}>
                        <SkeletonExchangeLabel />
                        <SkeletonExchangeValue />
                    </SkeletonExchangeRow>
                  ))}
              </SkeletonExchangeContainer>
          </Section>
        );
    }

    if (isError) {
        return (
          <Section>
              <ErrorContainer>
                  <AlertTriangle size={24} />
                  <ErrorMessage>계좌 정보를 불러올 수 없습니다.</ErrorMessage>
                  <RefreshButton onClick={() => {
                      setIsError(false);
                      setIsLoading(true);
                  }}>
                      <RefreshCw size={16} />
                      다시 시도
                  </RefreshButton>
              </ErrorContainer>
          </Section>
        );
    }

    return (
      <Section>
          <TitleRow>
              <Title>계좌 환전</Title>
              <RefreshButton
                onClick={handleRefresh}
                disabled={isRefreshing}
                $isRefreshing={isRefreshing}
              >
                  <RefreshCw size={16} />
              </RefreshButton>
          </TitleRow>

          <InfoContainer $isMobile={isMobile}>
              <InfoRow $isMobile={isMobile}>
                  <Label>계좌번호</Label>
                  <Value>{account.accountNumber}</Value>
              </InfoRow>
              <InfoRow $isMobile={isMobile}>
                  <Label>보유 원화</Label>
                  <Value>{account.money.toLocaleString()}원</Value>
              </InfoRow>
              <InfoRow $isMobile={isMobile}>
                  <Label>보유 달러</Label>
                  <Value>{account.dollar.toLocaleString()}달러</Value>
              </InfoRow>
              <InfoRow $isMobile={isMobile}>
                  <Label>환전 화폐</Label>
                  <CurrencySelector
                    value={exchangeCurrency}
                    onChange={(e) => setExchangeCurrency(e.target.value)}
                  >
                      <option value="money">원화 ➝ 달러</option>
                      <option value="dollar">달러 ➝ 원화</option>
                  </CurrencySelector>
              </InfoRow>
              <InfoRow $isMobile={isMobile}>
                  <Label>환전 금액</Label>
                  <ExchangeInput
                    type="number"
                    value={exchangeAmount || ''}
                    onChange={(e) => setExchangeAmount(Number(e.target.value))}
                    placeholder={`${exchangeCurrency === 'money' ? '원화' : '달러'} 금액 입력`}
                  />
              </InfoRow>
              <InfoRow $isMobile={isMobile}>
                  <Label>환전 결과</Label>
                  <Value>
                      {exchangeAmount ? (
                        exchangeCurrency === "money"
                          ? `${(exchangeAmount / exchangeRate).toFixed(2)} 달러`
                          : `${(exchangeAmount * exchangeRate).toLocaleString()} 원`
                      ) : '-'}
                  </Value>
              </InfoRow>
          </InfoContainer>

          <ButtonContainer>
              <Button
                $variant="secondary"
                onClick={() => navigate('../manage')}
              >
                  <ArrowLeft size={20} />
                  계좌 관리
              </Button>
              <Button
                $variant="primary"
                onClick={handleExchange}
              >
                  <ArrowLeftRight size={20} />
                  환전하기
              </Button>
          </ButtonContainer>
      </Section>
    );
};

export default ExchangeComponent;

const ButtonContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 20px;
`;

const Button = styled.button<{ $variant: 'primary' | 'secondary' }>`
    padding: 12px;
    background-color: ${({ $variant }) => $variant === 'primary' ? '#4A90E2' : '#f5f5f5'};
    color: ${({ $variant }) => $variant === 'primary' ? 'white' : '#666'};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s ease;

    &:hover {
        background-color: ${({ $variant }) => $variant === 'primary' ? '#357ABD' : '#e0e0e0'};
    }
`;

const ExchangeInput = styled.input`
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    outline: none;

    &:focus {
        border-color: #4A90E2;
        box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
    }
`;

const CurrencySelector = styled.select`
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    outline: none;
    cursor: pointer;

    &:focus {
        border-color: #4A90E2;
        box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
    }
`;