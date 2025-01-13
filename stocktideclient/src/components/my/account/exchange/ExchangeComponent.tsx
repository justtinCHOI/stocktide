import React, { FC, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import useCustomCash from "@hooks/useCustomCash";
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { ContentBottom } from "@assets/css/content";
import { RootState } from '@/store';
import { AccountState, ExchangeProps } from '@typings/account';
import { CashSliceState } from '@slices/cashSlice';
import { toast } from 'react-toastify';

const initAccountState: AccountState = {
    cashId: 0,
    accountNumber: '',
    money: 0,
    dollar: 0,
}

const exchangeRate  = 1386.83;

const ExchangeComponent: FC<ExchangeProps> = ({ cashId }) => {
    const cashState = useSelector((state: RootState) => state.cashSlice);
    const { doUpdateCash } = useCustomCash();
    const [account, setAccount] = useState(initAccountState);
    const [exchangeCurrency, setExchangeCurrency] = useState("money");
    const [exchangeAmount, setExchangeAmount] = useState(0);
    const [exchangedMoney, setExchangedMoney] = useState(0);
    const [exchangedDollar, setExchangedDollar] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const selectedAccount = cashState.cashList.find((cash: CashSliceState) => cash.cashId == cashId);
        if (selectedAccount) {
            setAccount(selectedAccount);
        }
    }, [cashState, cashId]);

    useEffect(() => {
        let newExchangedMoney = account.money;
        let newExchangedDollar = account.dollar;

        if (exchangeCurrency === "money") {
            newExchangedMoney = account.money - exchangeAmount;
            newExchangedDollar = account.dollar + (exchangeAmount / exchangeRate);
        } else if (exchangeCurrency === "dollar") {
            newExchangedMoney = account.money + (exchangeAmount * exchangeRate);
            newExchangedDollar = account.dollar - exchangeAmount;
        }

        if (newExchangedDollar > 0 && newExchangedDollar < 1) {
            setErrorMessage('외화량은 1보다 작을 수 없습니다.');
        } else if (newExchangedMoney < 0 || newExchangedDollar < 0) {
            setErrorMessage('환전 후의 금액은 0보다 작을 수 없습니다.');
        } else {
            setErrorMessage('');
        }

        setExchangedMoney(Math.floor(newExchangedMoney));
        setExchangedDollar(Math.floor(newExchangedDollar));
    }, [exchangeAmount, exchangeCurrency, account.money, account.dollar]);

    const handleExchangeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExchangeAmount(Number(e.target.value));
    };

    const handleExchangeCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setExchangeCurrency(e.target.value);
    };

    const handleManage = () => {
        navigate("../manage");
    };

    const handleExchange = () => {
        if (errorMessage) return;

        if (exchangedMoney < 0 || exchangedDollar < 0) {
            toast.error("환전 금액이 유효하지 않습니다");
            return;
        }

        doUpdateCash(cashId, exchangedMoney, exchangedDollar).then(() => {
            setExchangeAmount(0);
            toast.success("환전되었습니다");
        }).catch((error) => {
            toast.error("환전 처리 중 오류가 발생했습니다", error);
        });
    };

    return (
        <AppContainer>
            <AccountBox>
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
                <AccountRow>
                    <AccountLabel>환전 금액:</AccountLabel>
                    <ChargeInput type="number" value={exchangeAmount} onChange={handleExchangeAmountChange} />
                </AccountRow>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <AccountRow>
                    <AccountLabel>환전 화폐:</AccountLabel>
                    <select value={exchangeCurrency} onChange={handleExchangeCurrencyChange}>
                        <option value="money">원화에서 외화로</option>
                        <option value="dollar">외화에서 원화로</option>
                    </select>
                </AccountRow>
                <AccountRow>
                    <AccountLabel>환전 후 원화량:</AccountLabel>
                    <AccountValue>{exchangedMoney}원</AccountValue>
                </AccountRow>
                <AccountRow>
                    <AccountLabel>환전 후 외화량:</AccountLabel>
                    <AccountValue>{exchangedDollar}달러</AccountValue>
                </AccountRow>
                <ButtonContainer>
                    <Button onClick={handleManage}>계좌 관리</Button>
                    <Button onClick={handleExchange} disabled={Boolean(errorMessage)}>환전</Button>
                </ButtonContainer>
            </AccountBox>
            <ContentBottom />
        </AppContainer>
    );
};

export default ExchangeComponent;

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
`;

const AccountBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #ccc;
    padding: 10px;
    width: 100%;
    margin: 10px;
    border-radius: 5px;
    animation: ${fadeIn} 3s;
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

const ChargeInput = styled.input`
    width: 60%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const ErrorMessage = styled.div`
    color: red;
    font-size: 12px;
    margin-top: 5px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const Button = styled.button`
    height: 40px;
    width: 45%;
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

    &:disabled {
        background-color: gray;
        color: white;
        cursor: not-allowed;
    }
`;
