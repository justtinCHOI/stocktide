import { useSelector } from "react-redux";
import useGetStockInfo from "@hooks/useGetStockInfo";
import styled from "styled-components";
import StockPrice from "./StockPrice";
import {useParams} from "react-router";
import { OrderTypeProps } from '@components/stock/domestic/detail/buy/OrderDecisionBtn';
import { RootState } from '@/store';

const StockPriceList = () => {
    // const companyId = useSelector((state) => state.companyId);
    const {companyId} = useParams();
    const companyIdNumber = Number(companyId);

    const stockOrderType = useSelector((state: RootState) => state.stockOrderTypeSlice);
    const { stockInfo } = useGetStockInfo(companyIdNumber);

    if (!stockInfo || !stockInfo.stockInfResponseDto || !stockInfo.stockAsBiResponseDto) {
        return null;
    }

    // 전날 종가 계산
    const presentStockPrice = parseInt(stockInfo.stockInfResponseDto.stck_prpr, 10); // 현재가
    const priceChageAmountComparedYesterday = parseInt(stockInfo.stockInfResponseDto.prdy_vrss, 10); // 전날 종가대비 현재가 가격 차이
    const yesterDayStockClosingPrice = presentStockPrice - priceChageAmountComparedYesterday; // 전날종가 = 현재가 - 전날 종가대비 현재가 가격 차이


    // 1) 당일 매도/매수호가 및 거래량
    const sellingPrice = [];
    const buyingPrice = [];

    //높은 가격 ---------------------------------------------------------------------------------------------------------> 낮은가격
    //매도호가                                                      | 매수호가
    // askp10 askp9 askp8 askp7 askp6 askp5 askp4 askp3 askp2 askp1 bidp1 bidp2 bidp3 bidp4 bidp5 bidp6 bidp7 bidp8 bidp9 bidp10
    //                                                   unshift ->| <- push
    for (let i = 1; i < 11; i++) {
        const sellingPriceProp = `askp${i}`; // 매도 호가
        const sellingVolumeProp = `askp_rsqn${i}`; // 해당 매도호가 거래량
        const buyingPriceProp = `bidp${i}`; // 매수 호가
        const buyingVolumeProp = `bidp_rsqn${i}`; // 해당 매수호가 거래량

        const sellingInfo = {
            price: parseInt(stockInfo.stockAsBiResponseDto[sellingPriceProp]),
            volume: parseInt(stockInfo.stockAsBiResponseDto[sellingVolumeProp]),
        };

        const buyingInfo = {
            price: parseInt(stockInfo.stockAsBiResponseDto[buyingPriceProp]),
            volume: parseInt(stockInfo.stockAsBiResponseDto[buyingVolumeProp]),
        };

        sellingPrice.unshift(sellingInfo);
        buyingPrice.push(buyingInfo);
    }

    // price 0인 경우 제외
    const existSellingPrice = sellingPrice.filter((selling) => selling.price !== 0);
    const existBuyingPrice = buyingPrice.filter((buyingPrice) => buyingPrice.price !== 0);

    // 더미 데이터 추가 로직
    //1. 가장 낮은 매도호가, 가장 높은 매수호가 차이
    const priceInterval = existSellingPrice[existSellingPrice.length - 1].price - existBuyingPrice[0].price;

    //2. 단위호가만큼 가장 높은 매도호가에 더하기
    for (let i = 0; existSellingPrice.length < 10; i++) {
        const dummySellingData = { price: existSellingPrice[0].price + priceInterval, volume: 0 };
        existSellingPrice.unshift(dummySellingData);
    }

    //3. 단위호가만큼 가장 낮은 매수호가에서 빼기
    for (let i = 0; existBuyingPrice.length < 10; i++) {
        const dummyBuyingData = { price: existBuyingPrice[existBuyingPrice.length - 1].price - priceInterval, volume: 0 };
        existBuyingPrice.push(dummyBuyingData);
    }

    // 1) 매도/매수호가 종합
    const sellingAndBuyingPrice = [...existSellingPrice, ...existBuyingPrice];
    // 2) 매수/매도호가 거래량 종합
    const totalSellingVolume = existSellingPrice.reduce((acc, cur) => {
        return (acc = acc + cur.volume);
    }, 0);
    const totalBuyingVolume = existBuyingPrice.reduce((acc, cur) => {
        return (acc = acc + cur.volume);
    }, 0);

    return (
        <Container $orderType={stockOrderType}>
            <PriceList>
                {sellingAndBuyingPrice.map((item, idx) => {
                    const changeRate = (((item.price - yesterDayStockClosingPrice) / yesterDayStockClosingPrice) * 100).toFixed(2); // 전날 종가대비 주가 변동률
                    return <StockPrice key={item.price} index={idx} price={item.price} volume={item.volume} changeRate={changeRate} totalSellingVolume={totalSellingVolume} totalBuyingVolume={totalBuyingVolume} />;
                })}
            </PriceList>
        </Container>
    );
};

export default StockPriceList;

const Container = styled.div<OrderTypeProps>`
    width: 40%;
    height: 100%;
    margin-right: 16px;

    .priceIndicator {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 32px;
        font-size: 13px;
        padding-left: 15px;

        & div {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
`;

const PriceList = styled.ul`
    width: 100%;
    height: 100%;
    padding: 0;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`;
