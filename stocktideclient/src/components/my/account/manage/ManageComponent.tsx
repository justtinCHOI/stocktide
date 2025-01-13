import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ContentBottom } from "@assets/css/content";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { FaTimes } from "react-icons/fa";
import useCustomCash from "@hooks/useCustomCash";
import {useNavigate} from "react-router-dom";
import useCustomMember from '@hooks/useCustomMember';
import { toast } from 'react-toastify';

const ManageComponent = () => {
    const { cashState, doCreateCash, doGetCashList, doDeleteCash, doUpdateCashId } = useCustomCash();
    const [accounts, setAccounts] = useState(cashState?.cashList || []);
    const [accountId, setAccountId] = useState<number>( cashState?.cashId || 0);
    const { loginState } = useCustomMember();
    const memberId = loginState.memberId;
    const navigate = useNavigate(); // 수정된 부분

    useEffect(() => {
        if (loginState.email) {
            doGetCashList(memberId).catch(error => {
                toast.error("계좌 정보를 가져오는 중 오류가 발생했습니다", error);
            });
        }
    }, [loginState.email]);

    useEffect(() => {
        setAccounts(cashState.cashList);
        setAccountId(cashState.cashId);
    }, [cashState]);

    const deleteAccount = (cashId: number) => {
        doDeleteCash(cashId).then(() => {
            toast.success("계좌가 삭제되었습니다");
        }).catch((error) => {
            toast.error("계좌 삭제에 실패했습니다", error);
        });
    };

    const addAccount = () => {
        doCreateCash(memberId).then(() => {
            toast.success("새 계좌가 생성되었습니다");
        }).catch((error) => {
            toast.error("계좌 생성 중 오류가 발생했습니다", error);
        });
    };

    const handleAccountClick = (cashId: number) => {
        doUpdateCashId(cashId);
    };

    const handleChargeClick = (cashId: number) => {
        navigate(`../charge/${cashId}`);
    };
    const handleExchangeClick = (cashId: number) => {
        navigate(`../exchange/${cashId}`);
    };

    if (!accounts || accounts.length === 0) {
        return (
          <AppContainer>
              <AddButton onClick={addAccount}>
                  계좌 추가
              </AddButton>
              <ContentBottom />
          </AppContainer>
        );
    }

    return (
        <AppContainer>
            <TransitionGroup>
                {accounts.map((account, index) => (
                    <CSSTransition
                        key={index}
                        timeout={3000}
                        classNames="fade"
                    >
                        <AccountBox $active={account.cashId === accountId} onClick={() => handleAccountClick(account.cashId)}>
                            <AccountRow>
                                <AccountLabel>계좌번호:</AccountLabel>
                                <AccountValue>{account.accountNumber}</AccountValue>
                            </AccountRow>
                            <AccountRow>
                                <AccountLabel>원화량:</AccountLabel>
                                <AccountValue>{account.money}원</AccountValue>
                            </AccountRow>
                            <AccountRow>
                                <AccountLabel>외화량:</AccountLabel>
                                <AccountValue>{account.dollar}달러</AccountValue>
                            </AccountRow>
                            <ButtonContainer>
                                <Button onClick={() => handleExchangeClick(account.cashId)}>환전</Button>
                                <Button onClick={() => handleChargeClick(account.cashId)}>충전</Button>
                                <DeleteButton onClick={() => deleteAccount(account.cashId)}><FaTimes /></DeleteButton>
                            </ButtonContainer>
                        </AccountBox>
                    </CSSTransition>
                ))}
            </TransitionGroup>
            <AddButton onClick={addAccount}>
                계좌 추가
            </AddButton>
            <ContentBottom />
        </AppContainer>
    );
};

export default ManageComponent;

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
`;

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
  
    .fade-enter {
        opacity: 0;
        transform: scale(0.9);
    }
    .fade-enter-active {
        opacity: 1;
        transform: scale(1);
        transition: opacity 3000ms, transform 3000ms;
    }
    .fade-exit {
        opacity: 1;
        transform: scale(1);
    }
    .fade-exit-active {
        opacity: 0;
        transform: scale(0.9);
        transition: opacity 3000ms, transform 3000ms;
    }
`;

interface AccountBoxProps {
    $active: boolean;
}

const AccountBox = styled.div<AccountBoxProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid ${({ $active }) => ($active ? '#83b9f4' : '#ccc')};
    padding: 10px;
    margin: 10px;
    width: 100%;
    border-radius: 5px;
    animation: ${fadeIn} 3s;
    cursor: pointer; // 클릭 가능한 영역 표시
`;

const AccountRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 5px 0;
`;

const AccountLabel = styled.div`
    font-weight: bold;
    margin-right: 10px;
`;

const AccountValue = styled.div`
    margin-left: auto;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const Button = styled.button`
    height: 40px;
    width: 40%;
    margin: 5px;
    padding: 5px;
    border: 2px solid #0056b3;
    color: #0056b3;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
        background-color: #0056b3;
        color: white;
    }
`;

const DeleteButton = styled.button`
    width: 40px;
    margin: 5px;
    padding: 5px;
    border: 2px solid red;
    color: red;
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        background-color: red;
        color: white;
    }
`;

const AddButton = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    margin: 10px;
    width: 300px;
    border-radius: 5px;
    border: 2px solid #0056b3;
    color: #0056b3;
    cursor: pointer;
`;
