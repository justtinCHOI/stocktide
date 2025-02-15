import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { RefreshCw, Plus, Wallet2, ArrowLeftRight, AlertTriangle } from 'lucide-react';
import useCustomCash from "@hooks/useCustomCash";
import {useNavigate} from "react-router-dom";
import useCustomMember from '@hooks/useCustomMember';
import {
    Section,
    TitleRow,
    Title,
    ErrorContainer,
    ErrorMessage,
    RefreshButton,
} from '@styles/CustomStockTideStyles';
import {
    SkeletonAccountCard,
    SkeletonAccountInfo,
    SkeletonAccountNumber,
    SkeletonBalance,
    SkeletonButtons,
    SkeletonButton,
} from '@styles/SkeletonAccountStyles';
import { useMediaQuery } from '@hooks/useMediaQuery';
import ToastManager from '@utils/toastUtil';
import { useTranslation } from 'react-i18next';

const ManageComponent = () => {
  const { t } = useTranslation();

  const isMobile = useMediaQuery('(max-width: 768px)');
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { cashState, doCreateCash, doGetCashList, doDeleteCash, doUpdateCashId } = useCustomCash();
    const { loginState } = useCustomMember();
    const [accounts, setAccounts] = useState(cashState?.cashList || []);
    const [accountId, setAccountId] = useState<number>( cashState?.cashId || 0);
    const navigate = useNavigate(); // 수정된 부분

    useEffect(() => {
        if (loginState.email) {
            setIsLoading(true);
            setIsError(false);
            doGetCashList(loginState.memberId)
              .catch(error => {
                  setIsError(true);
                ToastManager.error(t('account.errors.accountGettingFailed'));
                console.log(error);
              })
              .finally(() => {
                  setIsLoading(false);
              });
        }
    }, [loginState.email]);

    useEffect(() => {
        setAccounts(cashState.cashList);
        setAccountId(cashState.cashId);
    }, [cashState]);

    const handleDeleteeAccount = (cashId: number) => {
        doDeleteCash(cashId).then(() => {
          ToastManager.error(t('account.manage.success.accountDeletionSuccess'));
        }).catch((error) => {
          ToastManager.error(t('account.manage.success.accountDeletionFailed', error));
        });
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await doGetCashList(loginState.memberId);
        setIsRefreshing(false);
    };

    const handleAddAccount = async () => {
        try {
            await doCreateCash(loginState.memberId);
          ToastManager.error(t('account.manage.success.accountCreationSuccess'));
        } catch (error) {
          ToastManager.error(t('account.manage.success.accountCreationFailed', error));
        }
    };

    const handleAccountClick = (cashId: number) => {
        doUpdateCashId(cashId);
    };

    if (isLoading) {
        return (
          <Section>
              <TitleRow>
                <Title>{t('account.manage.title')}</Title>
              </TitleRow>
              <AccountList $isMobile={isMobile}>
                  {[...Array(2)].map((_, index) => (
                    <SkeletonAccountCard key={index} $isMobile={isMobile}>
                        <SkeletonAccountInfo>
                            <SkeletonAccountNumber />
                            <SkeletonBalance />
                            <SkeletonBalance />
                        </SkeletonAccountInfo>
                        <SkeletonButtons>
                            <SkeletonButton />
                            <SkeletonButton />
                        </SkeletonButtons>
                    </SkeletonAccountCard>
                  ))}
              </AccountList>
          </Section>
        );
    }

    if (isError) {
        return (
          <Section>
              <TitleRow>
                <Title>{t('account.manage.title')}</Title>
              </TitleRow>
              <ErrorContainer>
                  <AlertTriangle size={24} />
                  <ErrorMessage>계좌 정보를 불러올 수 없습니다.</ErrorMessage>
                  <RefreshButton onClick={() => {
                      setIsLoading(true);
                      setIsError(false);
                      doGetCashList(loginState.memberId)
                        .catch(() => setIsError(true))
                        .finally(() => setIsLoading(false));
                  }}>
                      <RefreshCw size={16} />{t('error.retry')}
                  </RefreshButton>
              </ErrorContainer>
          </Section>
        );
    }

    if (!accounts || accounts.length === 0) {
        return (
          <Section>
              <EmptyStateContainer>
                  <Wallet2 size={48} color="#666" />
                  <EmptyStateText>{t('account.manage.empty')}</EmptyStateText>
                  <AddAccountButton onClick={handleAddAccount}>
                      <Plus size={20} />
                    {t('account.manage.addAccount')}
                  </AddAccountButton>
              </EmptyStateContainer>
          </Section>
        );
    }

    return (
      <Section>
          <TitleRow>
            <Title>{t('account.manage.title')}</Title>
              <RefreshButton
                onClick={handleRefresh}
                disabled={isRefreshing}
                $isRefreshing={isRefreshing}
              >
                  <RefreshCw size={16} />
              </RefreshButton>
          </TitleRow>

          <AccountList $isMobile={isMobile}>
              {accounts.map((account) => (
                <AccountCard key={account.cashId}
                             $isMobile={isMobile}
                             $active={account.cashId === accountId}
                             onClick={() => handleAccountClick(account.cashId)}>
                    <AccountHeader>
                        <AccountNumber>{account.accountNumber}</AccountNumber>
                        <DeleteButton
                          onClick={() => {
                              handleDeleteeAccount(account.cashId);
                          }}
                        >
                            <FaTimes />
                        </DeleteButton>
                    </AccountHeader>

                    <BalanceInfo>
                        <BalanceItem>
                            <BalanceLabel>{t('account.balance.krw')}</BalanceLabel>
                            <BalanceValue>{account.money.toLocaleString()}{t('unit.currency.krw')}</BalanceValue>
                        </BalanceItem>
                        <BalanceItem>
                            <BalanceLabel>{t('account.balance.usd')}</BalanceLabel>
                            <BalanceValue>{account.dollar.toLocaleString()}{t('unit.currency.usd')}</BalanceValue>
                        </BalanceItem>
                    </BalanceInfo>

                    <AccountActions>
                        <ActionButton
                          onClick={() => navigate(`../charge/${account.cashId}`)}
                          $variant="primary"
                        >
                            <Wallet2 size={16} />
                          {t('account.manage.actions.charge')}
                        </ActionButton>
                        <ActionButton
                          onClick={() => navigate(`../exchange/${account.cashId}`)}
                          $variant="secondary"
                        >
                            <ArrowLeftRight size={16} />
                          {t('account.manage.actions.exchange')}
                        </ActionButton>
                    </AccountActions>
                </AccountCard>
              ))}
          </AccountList>

          <AddAccountButton onClick={handleAddAccount}>
              <Plus size={20} />
            {t('account.manage.addAccount')}
          </AddAccountButton>
      </Section>
    );
};

export default ManageComponent;

const EmptyStateContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 0;
    gap: 16px;
`;

const EmptyStateText = styled.p`
    color: #666;
    font-size: 1.1rem;
`;

const AccountList = styled.div<{ $isMobile: boolean }>`
    display: flex;
    flex-direction: column;
    gap: ${({ $isMobile }) => ($isMobile ? '12px' : '16px')};
    margin-bottom: 20px;
`;

const AccountCard = styled.div<{ $isMobile: boolean; $active: boolean }>`
    background: white;
    border-radius: 12px;
    padding: ${({ $isMobile }) => ($isMobile ? '16px' : '20px')};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
    border: 2px solid ${({ $active }) => ($active ? '#4A90E2' : 'transparent')};

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
`;
const AccountHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

const AccountNumber = styled.h3`
    font-size: 1.1rem;
    font-weight: 500;
    color: #333;
`;

const DeleteButton = styled.button`
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    padding: 4px;
    border-radius: 50%;
    transition: all 0.2s ease;

    &:hover {
        background: #f5f5f5;
        color: #e74c3c;
    }
`;

const BalanceInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
`;

const BalanceItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const BalanceLabel = styled.span`
    color: #666;
    font-size: 0.9rem;
`;

const BalanceValue = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #333;
`;

const AccountActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const ActionButton = styled.button<{ $variant: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  background: ${({ $variant }) =>
  $variant === 'primary' ? '#4A90E2' : '#f8f9fa'};
  color: ${({ $variant }) =>
  $variant === 'primary' ? 'white' : '#333'};

  &:hover {
    background: ${({ $variant }) =>
  $variant === 'primary' ? '#357ABD' : '#eee'};
  }
`;

const AddAccountButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  border: 2px dashed #ccc;
  border-radius: 12px;
  background: none;
  color: #666;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #4A90E2;
    color: #4A90E2;
  }
`;