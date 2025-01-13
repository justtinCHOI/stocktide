import React, { useState, useEffect, FC } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { styled } from "styled-components";
import {
    minusStockOrderPrice,
    plusStockOrderPrice,
    setStockOrderPrice
} from "@slices/stockOrderPriceSlice.ts";
import { StockAsBiResponseDto } from '@typings/dto';
import { RootState } from '@/store';

const priceSettingTitle = "가격";
const unitText = "원";

const noVolumeNotification = " [거래량 없음] 주문 시 대기 처리 됩니다";
const existVolumeNotification = " [거래량 있음] 주문 시 체결 처리 됩니다";

interface PriceSettingProps {
    stockInfo: StockAsBiResponseDto;
    companyId: number;
}

const PriceSetting: FC<PriceSettingProps> = ({ stockInfo, companyId } ) => {

    const dispatch = useDispatch();
    const orderPrice = useSelector((state: RootState) => state.stockOrderPriceSlice);

    const [priceChangeTimer, setPriceChangeTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

    const { askp1, askp2, askp3, askp4, askp5, askp6, askp7, askp8, askp9, askp10 } = stockInfo;
    const sellingInfo = [askp1, askp2, askp3, askp4, askp5, askp6, askp7, askp8, askp9, askp10];
    const sellingPrice = sellingInfo.map((price) => parseInt(price));
    const existSellingPrice = sellingPrice.filter((price) => price !== 0);
    const defaultPrice = existSellingPrice[0]; //매도 호가중 첫번째
    const priceInterval = existSellingPrice[1] - existSellingPrice[0]; //단위 호가

    const orderType = useSelector((state: RootState) => state.stockOrderTypeSlice);
    const [orderPossibility, setOrderPossibility] = useState(true);

    const { bidp1, bidp2, bidp3, bidp4, bidp5, bidp6, bidp7, bidp8, bidp9, bidp10 } = stockInfo;
    const buyingInfo = [bidp1, bidp2, bidp3, bidp4, bidp5, bidp6, bidp7, bidp8, bidp9, bidp10];
    const buyingPrice = buyingInfo.map((price) => parseInt(price));
    const existBuyingPrice = buyingPrice.filter((price) => price !== 0);

    //호가 중에 있어야 거래 가능
    const handleCheckTradePossibility = () => {
        if (orderType) {
            if (orderPrice !== 0 && !existBuyingPrice.includes(orderPrice)) {
                setOrderPossibility(false);
            } else {
                setOrderPossibility(true);
            }
        } else {
            if (orderPrice !== 0 && !existSellingPrice.includes(orderPrice)) {
                setOrderPossibility(false);
            } else {
                setOrderPossibility(true);
            }
        }
    };

    useEffect(() => {
        handleCheckTradePossibility();
    }, [orderPrice, orderType]);

    //단위 호가만큼 증가
    const handlePlusOrderPrice = () => {
        dispatch(plusStockOrderPrice(priceInterval));
    };

    //단위 호가만큼 감소
    const handleMinusOrderPrice = () => {
        dispatch(minusStockOrderPrice(priceInterval));
    };

    const handleInputArrowBtn = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "ArrowUp") {
            handlePlusOrderPrice();
        } else if (event.code === "ArrowDown") {
            handleMinusOrderPrice();
        }
    };

    const handleWriteOrderPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputPrice = event.target.value;
        const numberInputPrice = parseInt(inputPrice, 10);

        if (numberInputPrice < 0 || isNaN(numberInputPrice)) {
            if (inputPrice === "") {
                dispatch(setStockOrderPrice(0));
            }
            return;
        }

        if (priceChangeTimer !== null) {
            clearTimeout(priceChangeTimer);
        }

        dispatch(setStockOrderPrice(numberInputPrice));

        if (numberInputPrice > priceInterval && numberInputPrice % priceInterval !== 0) {
            const newTimer = setTimeout(() => {
                const remainder = numberInputPrice % priceInterval;
                const modifiedInputValue = numberInputPrice - remainder;
                dispatch(setStockOrderPrice(modifiedInputValue));
            }, 800);

            setPriceChangeTimer(newTimer);
        }
    };

    useEffect(() => {
        dispatch(setStockOrderPrice(defaultPrice));
    }, [companyId]);

    return (
        <Container>
            <div className="PriceCategoryBox">
                <div className="Title">{priceSettingTitle}</div>
            </div>
            <div className="PriceSettingBox">
                <PriceController  value={orderPrice} onChange={handleWriteOrderPrice} onKeyDown={handleInputArrowBtn} onFocus={handleCheckTradePossibility} />
                <UnitContent>{unitText}</UnitContent>
                <div className="DirectionBox">
                    <button className="PriceUp" onClick={handlePlusOrderPrice}>
                        &#8896;
                    </button>
                    <button className="PriceDown" onClick={handleMinusOrderPrice}>
                        &#8897;
                    </button>
                </div>
            </div>
            <CheckTradingVolume $orderPossibility={orderPossibility}>
                <div>&#10004; {orderPossibility ? `${existVolumeNotification}` : `${noVolumeNotification}`}</div>
            </CheckTradingVolume>
        </Container>
    );
};

export default PriceSetting;

const Container = styled.div`
    position: relative;
    width: 100%;
    margin-top: 21px;
    margin-bottom: 34px;

    .PriceCategoryBox {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 8px;

        .Title {
            padding-left: 5px;
            font-size: 13px;
            color: #999999;
        }

        .ButtonContainer {
            position: relative;
            width: 100px;
            height: 25px;
            background-color: #f2f2f2;
            border-radius: 0.3rem;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 2px;
        }
    }

    .PriceSettingBox {
        display: flex;
        flex-direction: row;
        

        .DirectionBox {
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

                &.PriceUp {
                    border-bottom: none;
                    border-radius: 0 0.2rem 0 0;
                }

                &.PriceDown {
                    border-radius: 0 0 0.2rem 0;
                }
            }
        }
    }
`;

const PriceController = styled.input`
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

export interface OrderPossibilityProps {
    $orderPossibility: boolean;
}

const CheckTradingVolume = styled.div<OrderPossibilityProps>`
    position: absolute;
    top: 61px;
    left: 2px;
    font-size: 0.77em;
    color: ${(props) => (props.$orderPossibility ? "#2679ed" : "#e22926")};
    transition: color 0.3s ease-in-out;
`;
