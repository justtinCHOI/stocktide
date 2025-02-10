import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import useCustomCash from "@hooks/useCustomCash"
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ContentBottom } from "@styles/content";
import {requestPay} from "@api/paymentApi";
import { AccountState, ChargeProps } from '@typings/account';
import { RootState } from '@/store';
import { toast } from 'react-toastify';
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

const initAccountState: AccountState = {
    cashId: 0,
    accountNumber: '',
    money: 0,
    dollar: 0,
}

const ChargeComponent: React.FC<ChargeProps> = ({ cashId }) => {
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
            ToastManager.error("충전 금액을 확인해주세요");
            return;
        }

        try {
            const finalAmount = calculateChargedMoney();
            await requestPay(finalAmount);
            await doUpdateCash(cashId, finalAmount, 0);
            ToastManager.success("충전이 완료되었습니다");
            setChargeAmount(''); // 초기화
        } catch (error) {
            setIsError(true);
            ToastManager.error("충전 처리 중 오류가 발생했습니다");
        }
    };

    if (isLoading) {
        return (
          <SkeletonChargeContainer>
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
      <>
          <Section>
              <TitleRow>
                  <Title>계좌 충전</Title>
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
                      <Label>현재 잔액</Label>
                      <Value>{account.money.toLocaleString()}원</Value>
                  </InfoRow>
                  <InfoRow $isMobile={isMobile}>
                      <Label>충전 금액</Label>
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
                      <Label>충전 후 잔액</Label>
                      <Value>{calculateChargedMoney().toLocaleString()}원</Value>
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
                    onClick={handleCharge}
                  >
                      <Wallet size={20} />
                      충전하기
                  </Button>
              </ButtonContainer>
          </Section>
          <ContentBottom />
      </>
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
