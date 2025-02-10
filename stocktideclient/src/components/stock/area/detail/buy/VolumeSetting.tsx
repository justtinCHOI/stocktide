import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "styled-components";
import {useParams} from "react-router";
import {
    minusStockOrderVolume,
    plusStockOrderVolume,
    setStockOrderVolume
} from "@slices/stockOrderVolumeSlice";
import useGetCash from "@hooks/useGetCash";
import useGetHoldingStock from "@hooks/useGetHoldingStock";
import { RootState } from '@/store';
import { OrderTypeProps } from '@components/stock/area/detail/buy/OrderDecisionBtn';
import { useTranslation } from 'react-i18next';

const volumePercentage01 = 10;
const volumePercentage02 = 25;
const volumePercentage03 = 50;
const volumePercentage04 = 100;

const VolumeSetting = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const {companyId} = useParams();
    const companyIdNumber = Number(companyId);
    const orderType = useSelector((state: RootState) => state.stockOrderTypeSlice);
    const orderPrice = useSelector((state: RootState) => state.stockOrderPriceSlice);
    const orderVolume = useSelector((state: RootState) => state.stockOrderVolumeSlice);

    let availableSellingStock = 0;

    const { cashData } = useGetCash();
    const { holdingStockData } = useGetHoldingStock();

    let maximumBuyingVolume = 0;

    if (cashData && holdingStockData) {
        maximumBuyingVolume = orderPrice !== 0 ? Math.trunc(cashData / orderPrice) : Math.trunc(cashData);
        const holdingCompanyStock = holdingStockData.filter((stock) => stock.companyId === companyIdNumber);

        if (holdingCompanyStock.length !== 0) {
            availableSellingStock = holdingCompanyStock[0].stockCount;
        }
    }

    // 매수 -> 최대구매가능주식수 보다 작으면 매수
    // 매도 -> 최대매도가능주식수 보다 작으면 매도
    const handlePlusOrderVolume = () => {
        if (!orderType) {
            orderVolume < maximumBuyingVolume && dispatch(plusStockOrderVolume());
        }
        if (orderType) {
            orderVolume < availableSellingStock && dispatch(plusStockOrderVolume());
        }
    };

    const handleMinusOrderVolume = () => {
        if (0 < orderVolume) {
            dispatch(minusStockOrderVolume());
        }
    };

    const handleInputArrowBtn = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "ArrowUp") {
            handlePlusOrderVolume();
        } else if (event.code === "ArrowDown") {
            handleMinusOrderVolume();
        }
    };

    const handleWriteOrderVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const numberInputValue = parseInt(inputValue, 10);

        if (numberInputValue < 0 || isNaN(numberInputValue)) {
            if (inputValue === "") {
                dispatch(setStockOrderVolume(0));
            }
            return;
        }

        if (!orderType) {
            if (maximumBuyingVolume < numberInputValue) {
                return;
            } else {
                dispatch(setStockOrderVolume(numberInputValue));
            }
        }

        if (orderType) {
            if (availableSellingStock < numberInputValue) {
                return;
            } else {
                dispatch(setStockOrderVolume(numberInputValue));
            }
        }
    };

    // 매수 -> 최대구매가능주식수 의 일정 비율만큼 매수
    // 매도 -> 최대매도가능주식수 의 일정 비율만큼 매도
    const handleSetVolumePercentage = (volumePercentage: number) => {
        if (!orderType) {
            const orderVolume = Math.trunc(maximumBuyingVolume * (volumePercentage / 100));
            dispatch(setStockOrderVolume(orderVolume));
        }

        if (orderType) {
            const orderVolume = Math.trunc(availableSellingStock * (volumePercentage / 100));
            dispatch(setStockOrderVolume(orderVolume));
        }
    };

    useEffect(() => {
        if (maximumBuyingVolume < orderVolume) {
            dispatch(setStockOrderVolume(maximumBuyingVolume));
        }
    }, [maximumBuyingVolume]);

    useEffect(() => {
        dispatch(setStockOrderVolume(0));
    }, [companyId]);

    return (
        <Container>
            <TitleContainer $orderType={orderType}>
                <div className="Title">{t('dialog.volume')}</div>
                <div className="MaximumVolumeContainer">
                    <span>{t('dialog.max')}</span>
                    <span className="maximumVolume">{orderType ? availableSellingStock : maximumBuyingVolume}</span>
                    <span>{t('unit.shares')}</span>
                </div>
            </TitleContainer>
            <VolumeSettingBox>
                <VolumeController  value={orderVolume} onChange={handleWriteOrderVolume} onKeyDown={handleInputArrowBtn} />
                <UnitContent>{t('unit.shares')}</UnitContent>
                <div className="DirectionContainer">
                    <button className="VolumeUp" onClick={handlePlusOrderVolume}>
                        &#8896;
                    </button>
                    <button className="VolumeDown" onClick={handleMinusOrderVolume}>
                        &#8897;
                    </button>
                </div>
            </VolumeSettingBox>
            <PercentageBox>
                <button onClick={() => handleSetVolumePercentage(volumePercentage01)}>
                    {volumePercentage01}
                    {t('unit.percent')}
                </button>
                <button onClick={() => handleSetVolumePercentage(volumePercentage02)}>
                    {volumePercentage02}
                    {t('unit.percent')}
                </button>
                <button onClick={() => handleSetVolumePercentage(volumePercentage03)}>
                    {volumePercentage03}
                    {t('unit.percent')}
                </button>
                <button onClick={() => handleSetVolumePercentage(volumePercentage04)}>
                    {volumePercentage04}
                    {t('unit.percent')}
                </button>
            </PercentageBox>
        </Container>
    );
};

export default VolumeSetting;

const Container = styled.div`
    width: 100%;
    margin-top: 16px;
    margin-bottom: 56px;
`;

const TitleContainer = styled.div<OrderTypeProps>`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 8px;

    .Title {
        padding-left: 5px;
        font-size: 13px;
        color: #999999;
    }

    .MaximumVolumeContainer {
        display: flex;
        flex-direction: row;
        gap: 3px;

        & span {
            font-size: 14px;
            color: #999999;
        }

        .maximumVolume {
            color: ${(props) => (props.$orderType ? "#3177d7" : "#ed2926")};
        }
    }
`;

const VolumeSettingBox = styled.div`
    display: flex;
    flex-direction: row;

    .DirectionContainer {
        display: flex;
        flex-direction: column;

        & button {
            width: 31px;
            height: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 10px;
            border: 1px solid darkgray;
            border-radius: 0;

            &.VolumeUp {
                border-bottom: none;
                border-radius: 0 0.2rem 0 0;
            }

            &.VolumeDown {
                border-radius: 0 0 0.2rem 0;
            }
        }
    }
`;

const VolumeController = styled.input`
    width: 100%;
    flex: 1 0 0;
    height: 30px;
    border: 1px solid darkgray;
    border-right: none;
    border-radius: 0.2rem 0 0 0.2rem;
    font-size: 15px;
    font-weight: 500;
    text-align: right;
    padding-bottom: 3px;
`;

const PercentageBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 8px;
    gap: 8px;

    & button {
        width: 56px;
        height: 28px;
        border: none;
        border-radius: 0.2rem;
    }
`;

const UnitContent = styled.div`
    height: 30px;
    color: #999999;
    font-size: 13px;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 8px;
    border-top: 1px solid darkgray;
    border-bottom: 1px solid darkgray;
    background-color: #ffffff;
`;
