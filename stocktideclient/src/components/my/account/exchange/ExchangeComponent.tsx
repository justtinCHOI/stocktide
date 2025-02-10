import { FC, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import useCustomCash from "@hooks/useCustomCash";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '@/store';
import { AccountState, ExchangeProps } from '@typings/account';
import { Cash } from '@typings/entity';
import { RefreshCw, ArrowLeft, AlertTriangle, ArrowLeftRight, ChevronDown } from 'lucide-react';
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

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
            ToastManager.error(t('account.exchange.errors.recheckFunds'));
            return;
        }

        let newMoney = account.money;
        let newDollar = account.dollar;

        if (exchangeCurrency === "money") {
            if (exchangeAmount > account.money) {
                ToastManager.error(t('account.exchange.errors.insufficientKrw'));

                return;
            }
            newMoney -= exchangeAmount;
            newDollar += exchangeAmount / exchangeRate;
        } else {
            if (exchangeAmount > account.dollar) {
                ToastManager.error(t('account.exchange.errors.insufficientDollar'));
                return;
            }
            newMoney += exchangeAmount * exchangeRate;
            newDollar -= exchangeAmount;
        }

        try {
            await doUpdateCash(cashId, Math.floor(newMoney), Math.floor(newDollar));
            ToastManager.error(t('account.exchange.success.exchangingSuccess'));
            setExchangeAmount(0);
        } catch (error) {
            ToastManager.error(t('account.exchange.errors.exchangeFailed'));
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleCurrencyChange = (currency: string) => {
        setExchangeCurrency(currency);
        setIsDropdownOpen(false);
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
                  <ErrorMessage>{t('account.errors.accountGettingFailed')}</ErrorMessage>
                  <RefreshButton onClick={() => {
                      setIsError(false);
                      setIsLoading(true);
                  }}>
                      <RefreshCw size={16} />{t('error.retry')}
                  </RefreshButton>
              </ErrorContainer>
          </Section>
        );
    }

    return (
      <Section>
          <TitleRow>
              <Title>{t('account.exchange.title')}</Title>
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
                  <Label>{t('account.accountNumber')}</Label>
                  <Value>{account.accountNumber}</Value>
              </InfoRow>
              <InfoRow $isMobile={isMobile}>
                  <Label>{t('account.balance.krw')}</Label>
                  <Value>{account.money.toLocaleString()}{t('unit.currency.krw')}</Value>
              </InfoRow>
              <InfoRow $isMobile={isMobile}>
                  <Label>{t('account.balance.usd')}</Label>
                  <Value>{account.dollar.toLocaleString()}{t('unit.currency.usd')}</Value>
              </InfoRow>
              <InfoRow $isMobile={isMobile}>
                  <Label>{t('account.exchange.exchangeCurrency')}</Label>
                  <CurrencyDropdown>
                      <DropdownHeader onClick={toggleDropdown}>
                          {exchangeCurrency === 'money' ? t('account.exchange.exchangeDirection.krwToUsd') : t('account.exchange.exchangeDirection.usdToKrw')}
                          <ChevronDown size={20} />
                      </DropdownHeader>
                      {isDropdownOpen && (
                        <DropdownList>
                            <DropdownItem
                              onClick={() => handleCurrencyChange('money')}
                            >
                                원화 ➝ 달러
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => handleCurrencyChange('dollar')}
                            >
                                달러 ➝ 원화
                            </DropdownItem>
                        </DropdownList>
                      )}
                  </CurrencyDropdown>
              </InfoRow>
              <InfoRow $isMobile={isMobile}>
                  <Label>{t('account.exchange.exchangeAmount')}</Label>
                  <ExchangeInput
                    type="number"
                    value={exchangeAmount || ''}
                    onChange={(e) => setExchangeAmount(Number(e.target.value))}
                    placeholder={`${exchangeCurrency === 'money' ? t('account.balance.krw') : t('account.balance.usd')} ${t('account.exchange.typeExchangeAmount')}`}
                  />
              </InfoRow>
              <InfoRow $isMobile={isMobile}>
                  <Label>{t('account.exchange.exchangeResult')}</Label>
                  <Value>
                      {exchangeAmount ? (
                        exchangeCurrency === "money"
                          ? `${(exchangeAmount / exchangeRate).toFixed(2)} ${t('unit.currency.usd')}`
                          : `${(exchangeAmount * exchangeRate).toLocaleString()} ${t('unit.currency.krw')}`
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
                  {t('account.manage.title')}
              </Button>
              <Button
                $variant="primary"
                onClick={handleExchange}
              >
                  <ArrowLeftRight size={20} />
                  {t('account.exchange.title')}
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

const CurrencyDropdown = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    border-color: #aaa;
  }
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 0 0 4px 4px;
  z-index: 1;
  overflow: hidden;
`;

const DropdownItem = styled.div`
  padding: 8px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #f5f5f5;
  }
`;