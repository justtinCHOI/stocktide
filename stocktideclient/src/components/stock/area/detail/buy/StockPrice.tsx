import { useState, useEffect, useRef, FC } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { setStockOrderPrice } from "@slices/stockOrderPriceSlice.ts";
import { RootState } from '@/store';

const changeRateUnit = `%`;

interface StockPriceProps {
    key: number;
    index: number;
    price: number;
    volume: number;
    changeRate: string;
    totalSellingVolume: number;
    totalBuyingVolume: number;
}

const StockPrice: FC<StockPriceProps> = ({ index, price, volume, changeRate, totalSellingVolume, totalBuyingVolume } ) => {

    const dispatch = useDispatch();
    const orderPrice = useSelector((state: RootState) => state.stockOrderPriceSlice);
    const ref = useRef<HTMLInputElement>(null);

    const handleSetOrderPrice = () => {
        dispatch(setStockOrderPrice(price));
    };

    useEffect(() => {
        if (index === 9 && ref.current) {
            ref.current.focus();
            ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [ref, index]);

    return (
        <Container $index={index} ref={index === 9 ? ref : null} $price={price} $orderPrice={orderPrice} onClick={handleSetOrderPrice}>
            <Price $changeRate={parseFloat(changeRate)}>
                <div className="price">{price.toLocaleString()}</div>
                <div className="changeRate">
                    {changeRate}
                    {changeRateUnit}
                </div>
            </Price>
            <Volume $index={index}>
                <div className="volume">{volume.toLocaleString()}</div>
                <VolumePercentage index={index} volume={volume} upperPriceVolumeSum={totalSellingVolume} lowerPriceVolumeSum={totalBuyingVolume} />
            </Volume>
        </Container>
    );
};

export default StockPrice;

interface VolumePercentageProps {
    index: number;
    volume: number;
    upperPriceVolumeSum: number;
    lowerPriceVolumeSum: number;
};

// 전체 매도/도수 거래량 대비 개별가격 매도/매수 거래량 비율
const VolumePercentage: FC<VolumePercentageProps>= (props) => {
    const { index, volume, upperPriceVolumeSum, lowerPriceVolumeSum } = props;
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth((volume / (index < 10 ? upperPriceVolumeSum : lowerPriceVolumeSum)) * 100);
    }, [volume, index, upperPriceVolumeSum, lowerPriceVolumeSum]);

    return <StockVolumePercentage $index={index} $volume={volume} $upperPriceVolumeSum={upperPriceVolumeSum} $lowerPriceVolumeSum={lowerPriceVolumeSum} style={{ width: `${width}%` }} />;
};

export interface PriceProps {
    $price: boolean;
}

export interface ChangeRateProps {
    $changeRate: number;
}

export interface IndexProps {
    $index: number;
}

export interface OrderPriceProps {
    $orderPrice: number;
}

interface ContainerProps {
    $price: number;
    $orderPrice: number;
    $index: number;
}

const Container = styled.div<ContainerProps>`
    width: 100%;
    height: 46px;
    margin-bottom: 2px;
    background-color: ${(props) => (props.$price === props.$orderPrice ? (props.$index > 9 ? "#e9c2bf" : "#bed1eb") : props.$index > 9 ? "#FDE8E7" : "#E7F0FD")};
    border-left: ${(props) => (props.$price === props.$orderPrice ? "3px solid red" : props.$index > 9 ? "3px solid #FDE8E7" : "3px solid #E7F0FD")};
    display: flex;
    flex-direction: row;
    transition: border 0.8s ease, background-color 0.8s ease;

    &:hover {
        cursor: pointer;
    }
`;

const Price = styled.div<ChangeRateProps>`
    width: 50%;
    display: flex;
    padding-right: 11px;
    flex-direction: column;
    align-items: flex-end;

    .price {
        font-size: 14px;
        font-weight: 400;
        padding-top: 1px;
    }

    .changeRate {
        font-size: 12px;
        font-weight: 400;
        color: ${(props) => (props.$changeRate > 0 ? "#ed2926" : props.$changeRate === 0 ? "black" : "#3177d7")};
    }
`;

const Volume = styled.div<IndexProps>`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 12px;
    color: ${(props) => (props.$index < 10 ? "#2679ed" : "#e22926")};

    .volume {
        height: 100%;
        display: flex;
        align-items: center;
        padding-right: 8px;
    }
`;

const StockVolumePercentage = styled.span<{ $index: number; $volume: number; $upperPriceVolumeSum: number; $lowerPriceVolumeSum: number }>`
    height: 2px;
    background-color: ${(props) => (props.$index < 10 ? "#2679ed" : "#e22926")};
    transition: width 0.5s ease;
`;