import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import useCustomCash from "@hooks/useCustomCash"
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { ContentBottom } from "@styles/content";
import {requestPay} from "@api/paymentApi";
import { AccountState, ChargeProps } from '@typings/account';
import { RootState } from '@/store';
import { toast } from 'react-toastify';
import { Cash } from '@typings/entity';

const initAccountState: AccountState = {
    cashId: 0,
    accountNumber: '',
    money: 0,
    dollar: 0,
}

const ChargeComponent: React.FC<ChargeProps> = ({ cashId }) => {
    const cashState = useSelector((state: RootState) => state.cashSlice);
    const { doUpdateCash } = useCustomCash();
    const [account, setAccount] = useState<AccountState>(initAccountState);
    const [chargeAmount, setChargeAmount] = useState<number | undefined>(0);
    const [chargedMoney, setChargedMoney] = useState<number>(0);
    const [isCharged, setIsCharged] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const accountMoneyNumber = account.money || 0;
        const chargeAmountNumber = chargeAmount || 0;
        setChargedMoney(accountMoneyNumber + chargeAmountNumber);
    }, [chargeAmount])


    useEffect(() => {
        const selectedAccount = cashState.cashList.find((cash: Cash) => cash.cashId == cashId);
        if (selectedAccount) {
            setAccount(selectedAccount);
        }
    }, [cashState, cashId]);

    const handleChargeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.value) {
            setChargeAmount(undefined);
        }else{
            setChargeAmount(Number(e.target.value));
        }
    };

    const handleCharge = () => {
        if (chargeAmount == undefined || chargeAmount <= 0) {
            toast.error("충전 금액을 확인해주세요");
            return;
        }else{
            doUpdateCash(cashId, chargedMoney, 0).then(() => {
                setIsCharged(true);
                setChargeAmount(0);
                try {
                    requestPay(chargedMoney);
                    toast.success("충전되었습니다");
                } catch (error) {
                    toast.error("결제 모듈 초기화에 실패했습니다");
                }
            }).catch(() => {
                toast.error("충전 처리 중 오류가 발생했습니다");
            });
        }
    };

    const handleManage = () => {
        navigate("../manage");
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
                  <AccountLabel>충전 금액:</AccountLabel>
                  <ChargeInput type="number" value={(chargeAmount || '')} onChange={handleChargeAmountChange}/>
              </AccountRow>
              <AccountRow>
                  <AccountLabel>충전 후 금액:</AccountLabel>
                  <AccountValue style={{color: isCharged ? 'black' : 'gray'}}>{chargedMoney}원</AccountValue>
              </AccountRow>
              <ButtonContainer>
                  <Button onClick={handleManage}>계좌 관리</Button>
                  <Button onClick={handleCharge}>충전</Button>
              </ButtonContainer>
          </AccountBox>
          <ContentBottom/>
      </AppContainer>
    );
};

export default ChargeComponent;

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
    margin: 10px;
    width: 100%;
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
