import { useSelector, useDispatch } from "react-redux";
import { orderTypeBuying, orderTypeSelling } from "@slices/stockOrderTypeSlice"
import styled from "styled-components";
import {useParams} from "react-router";
import VolumeSetting from "./VolumeSetting";
import OrderDecisionBtn, { OrderTypeProps } from './OrderDecisionBtn';
import { RootState } from '@/store';
import useGetStockInfo from '@hooks/useGetStockInfo';
import PriceSetting from '@components/stock/area/detail/buy/PriceSetting';
import { useTranslation } from 'react-i18next';

const StockOrderSetting = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const orderType = useSelector((state: RootState) => state.stockOrderTypeSlice);
  const {companyId} = useParams();
  const companyIdNumber = Number(companyId); // 숫자로 변환
  const { stockInfo, stockInfoLoading, stockInfoError } = useGetStockInfo(companyIdNumber);

  if (!stockInfo) {
    return null;
  }

  if (stockInfoLoading) { return <></>; }

  if (stockInfoError) { return <></>;  }

    const handleSetBuying = () => {
        dispatch(orderTypeBuying());
    };

    const handleSetSelling = () => {
        dispatch(orderTypeSelling());
    };

    return (
        <Container>
            <div className="OrderType">
              <Buying onClick={handleSetBuying} $orderType={orderType}>
                {t('order.type.buy')}
              </Buying>
              <Selling onClick={handleSetSelling} $orderType={orderType}>
                {t('order.type.sell')}
              </Selling>
            </div>
            <OrderTypeChangeEffectLine />
            <PriceSetting stockInfo={stockInfo.stockAsBiResponseDto} companyId={Number(companyId)} />
            <VolumeSetting />
            <OrderDecisionBtn />
        </Container>
    );
};

export default StockOrderSetting;

const OrderTypeChangeEffectLine = () => {
    const orderType = useSelector((state: RootState) => state.stockOrderTypeSlice);

    return (
        <DividingContainer >
            <DefaultLine $orderType={orderType}>
                <DividingLine $orderType={orderType} />
            </DefaultLine>
        </DividingContainer>
    );
};

const Container = styled.div`
    width: 51%;
    height: 100%;

    .OrderType {
        width: 100%;
        height: 31px;
        display: flex;
        flex-direction: row;
        color: #9999;
    }
`;

const Buying = styled.div<OrderTypeProps>`
    flex: 1 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 31px;
    font-size: 14px;
    color: ${(props) => !props.$orderType && "#e22926"};
    transition: color 0.5s;
`;

const Selling = styled.div<OrderTypeProps>`
    flex: 1 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 31px;
    font-size: 14px;
    color: ${(props) => props.$orderType && "#2679ed"};
    transition: color 0.5s;
`;

const DividingContainer = styled.div`
    background-color: darkgray;
`;

const DefaultLine = styled.div<OrderTypeProps>`
    transform: translateX(${(props) => (props.$orderType ? "50%" : "0")});
    transition: transform 0.3s ease-in-out;
    width: 100%;
    height: 2px;
`;

const DividingLine = styled.div<OrderTypeProps>`
    width: 50%;
    height: 2px;
    background-color: ${(props) => (props.$orderType ? "#2679ed" : "#e22926")};
`;
