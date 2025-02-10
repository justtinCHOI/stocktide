import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import useCustomCash from "@hooks/useCustomCash"
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {requestPay} from "@api/paymentApi";
import { AccountState, ChargeProps } from '@typings/account';
import { RootState } from '@/store';
import { Cash } from '@typings/entity';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { RefreshCw, Wallet, AlertTriangle, ArrowLeft } from 'lucide-react';
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
    SkeletonChargeContainer,
    SkeletonChargeSection,
    SkeletonChargeRow,
    SkeletonChargeLabel,
    SkeletonChargeValue,
} from '@styles/SkeletonAccountStyles';
import ToastManager from '@utils/toastUtil';
import { useTranslation } from 'react-i18next';

const initAccountState: AccountState = {
    cashId: 0,
    accountNumber: '',
    money: 0,
    dollar: 0,
}

const ChargeComponent: React.FC<ChargeProps> = ({ cashId }) => {
    const { t } = useTranslation();

    const isMobile = useMediaQuery('(max-width: 768px)');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const cashState = useSelector((state: RootState) => state.cashSlice);
    const { doUpdateCash } = useCustomCash();
    const [account, setAccount] = useState<AccountState>(initAccountState);
    const [chargeAmount, setChargeAmount] = useState<string>(''); // 문자열로 변경

    useEffect(() => {
        const selectedAccount = cashState.cashList.find((cash: Cash) => cash.cashId === cashId);
        if (selectedAccount) {
            setAccount(selectedAccount);
            setIsLoading(false);
        } else {
            setIsError(true);
        }
    }, [cashState, cashId]);

    const calculateChargedMoney = () => {
        const accountMoneyNumber = account.money || 0;
        const chargeAmountNumber = Number(chargeAmount) || 0;
        return accountMoneyNumber + chargeAmountNumber;
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        // 실제 새로고침 로직 구현
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    const handleCharge = async () => {
        const chargeAmountNumber = Number(chargeAmount);
        if (!chargeAmountNumber || chargeAmountNumber <= 0) {
            ToastManager.error(t('account.charge.errors.invalidAmount'));
            return;
        }

        try {
            const finalAmount = calculateChargedMoney();
            await requestPay(finalAmount);
            await doUpdateCash(cashId, finalAmount, 0);
            ToastManager.error(t('account.charge.success.chargingSuccess'));
            setChargeAmount(''); // 초기화
        } catch (error) {
            setIsError(true);
            ToastManager.error(t('account.charge.errors.chargeFailed'));
        }
    };

    if (isLoading) {
        return (
          <SkeletonChargeContainer>
              <TitleRow>
                  <Title>{t('account.charge.title')}</Title>
              </TitleRow>
              <SkeletonChargeSection>
                  {[...Array(5)].map((_, index) => (
                    <SkeletonChargeRow key={index}>
                        <SkeletonChargeLabel />
                        <SkeletonChargeValue />
                    </SkeletonChargeRow>
                  ))}
              </SkeletonChargeSection>
          </SkeletonChargeContainer>
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
              <Title>{t('account.charge.title')}</Title>
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
                  <Label>{t('account.charge.chargeAmount')}</Label>
                  <input
                    type="number"
                    value={chargeAmount || ''}
                    onChange={(e) => setChargeAmount(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ddd'
                    }}
                  />
              </InfoRow>
              <InfoRow $isMobile={isMobile}>
                  <Label>{t('account.charge.afterBalance')}</Label>
                  <Value>{calculateChargedMoney().toLocaleString()}{t('unit.currency.krw')}</Value>
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
                onClick={handleCharge}
              >
                  <Wallet size={20} />
                  {t('account.charge.title')}
              </Button>
          </ButtonContainer>
      </Section>
    );
};

export default ChargeComponent;


const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 20px;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
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
