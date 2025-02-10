import { useSelector, useDispatch } from "react-redux";
import { setStockOrderVolume } from "@slices/stockOrderVolumeSlice";
import { closeDecisionWindow } from "@slices/decisionWindowSlice";
import { styled } from "styled-components";
import { toast } from "react-toastify";
import useTradeStock from "@hooks/useTradeStock";
import StockPriceList from "./StockPriceList";
import StockOrderSetting from "./StockOrderSetting";

import {dummyLogo, logoList} from "@utils/companyLogos";
import { FC } from 'react';
import { RootState } from '@/store';
import { OrderTypeProps } from '@components/stock/area/detail/buy/OrderDecisionBtn';
import { useTranslation } from 'react-i18next';

interface StockOrderProps {
    corpName: string;
}

const StockOrder: FC<StockOrderProps> = ({ corpName }) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const orderType = useSelector((state: RootState) => state.stockOrderTypeSlice);
    const orderVolume = useSelector((state: RootState) => state.stockOrderVolumeSlice);
    const orderPrice = useSelector((state: RootState) => state.stockOrderPriceSlice);
    const decisionWindow = useSelector((state: RootState) => state.decisionWindowSlice);

    const orderTypeText = !orderType ? t('order.type.buy') : t('order.type.sell');
    const price = orderPrice.toLocaleString();
    const volume = orderVolume.toLocaleString();
    const totalPrice = (orderPrice * orderVolume).toLocaleString();

    const logos = {
        ...logoList
    };

    const companyLogo = logos[corpName] || dummyLogo;

    const handleCloseDecisionWindow = () => {
        dispatch(closeDecisionWindow());
    };

    const orderRequest = useTradeStock();

    // StockOrder.tsx 수정
    const handleOrderConfirm = async () => {
        try {
            // 1. 주문 처리 완료 대기
            await orderRequest.mutateAsync();

            // 2. 주문 성공 시 처리
            toast(
              <ToastMessage $orderType={orderType}>
                  <div className="overview">
                      <img src={companyLogo} alt="stock logo" />
                      <div className="orderInfo">
                          {corpName} {volume}
                          {t('unit.shares')}
                      </div>
                  </div>
                  <div>
                      <span className="orderType">✓ {orderTypeText}</span>
                      <span>{t('toast.completed')}</span>
                  </div>
              </ToastMessage>,
              {
                  hideProgressBar: true,
              }
            );

            // 3. 주문 완료 후 상태 초기화
            dispatch(setStockOrderVolume(0));
            handleCloseDecisionWindow();

        } catch (error) {
            // 4. 에러 처리
            console.error('Order failed:', error);
            toast.error('주문 처리 중 오류가 발생했습니다');
        }
    };

    const orderFailureCase01 = false;
    const orderFailureCase02 = orderPrice === 0 || orderVolume === 0;

    return (
      <>
          <Container>
              <StockPriceList />
              <StockOrderSetting />
          </Container>

          {decisionWindow ? (
            orderFailureCase01 || orderFailureCase02 ? (
              <OrderFailed>
                  <div className="Container">
                      <div className="message01">
                          {orderFailureCase01
                            ? t('order.failure.outsideTradeTime')
                            : t('order.failure.basic')}
                      </div>
                      <div className="message02">
                          {orderFailureCase01
                            ? t('order.openingTimeIndicator')
                            : orderPrice !== 0
                              ? t('order.failure.noVolume')
                              : t('order.failure.invalidPrice')}
                      </div>
                      <button onClick={handleCloseDecisionWindow}>{t('dialog.confirm')}</button>
                  </div>
              </OrderFailed>
            ) : (
              <OrderConfirm $orderType={orderType}>
                  <div className="Container">
                      <img className="CorpLogo" src={companyLogo} alt="stock logo" />
                      <div className="OrderOverview">
                          <span className="CorpName">{corpName}</span>
                          <span className="OrderType">{orderTypeText}</span>
                      </div>
                      <div className="OrderContent">
                          <div className="Price">
                              <span className="text">{t('order.price')}</span>
                              <span>{price} {t('unit.currency.krw')}</span>
                          </div>
                          <div className="Volume">
                              <span className="text">{t('order.volume')}</span>
                              <span>{volume} {t('unit.shares')}</span>
                          </div>
                          <div className="TotalOrderAmout">
                              <span className="text">{t('order.totalAmount')}</span>
                              <span>{totalPrice} {t('unit.currency.krw')}</span>
                          </div>
                          <div className="ButtonContainer">
                              <button className="cancel" onClick={handleCloseDecisionWindow}>{t('dialog.cancel')}</button>
                              <button className="confirm" onClick={handleOrderConfirm}>{t('dialog.confirm')}</button>
                          </div>
                      </div>
                  </div>
              </OrderConfirm>
            )
          ) : null}
      </>
    );
};

export default StockOrder;

const Container = styled.div`
    height: calc(100vh - 275px);
    display: flex;
    flex-direction: row;
`;

const OrderFailed = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 400;
    display: flex;
    justify-content: center;
    align-items: center;

    .Container {
        z-index: 100;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 8px;

        width: 360px;
        height: 148px;
        padding: 16px;
        background-color: white;
        border-radius: 0.5rem;

        .message01 {
            font-size: 18.5px;
            font-weight: 500;
        }

        .message02 {
            font-size: 16.5px;
            font-weight: 400;
        }

        & button {
            width: 100%;
            height: 36px;
            border: none;
            border-radius: 0.5rem;
            font-size: 14.5px;
            color: white;
            background-color: #2f4f4f;
            margin-top: 12px;
        }
    }
`;

const OrderConfirm = styled.div<OrderTypeProps>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 400;
    display: flex;
    justify-content: center;
    align-items: center;

    & div {
        z-index: 400;
    }

    .Container {
        z-index: 500;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 328px;
        height: 345px;
        background-color: white;
        border: none;
        border-radius: 0.5rem;

        padding-left: 20px;
        padding-right: 20px;
        padding-top: 24px;

        .CorpLogo {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }

        .OrderOverview {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 6px;
            font-size: 18px;
            font-weight: 500;
            padding-top: 18px;
            padding-bottom: 28px;

            .OrderType {
                color: ${(props) => (props.$orderType ? "#2679ed" : "#e22926")};
            }
        }

        .OrderContent {
            width: 100%;
            font-size: 15px;

            & div {
                height: 24px;

                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding-bottom: 40px;
            }

            .text {
                color: #292828;
            }

            .Volume {
                border-bottom: 0.1px solid #d3cece99;
            }

            .TotalOrderAmout {
                padding-top: 20px;
                padding-bottom: 45px;
            }
        }

        .ButtonContainer {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding-top: 20px;
            gap: 12px;

            & button {
                width: 50%;
                height: 32px;
                border: none;
                border-radius: 0.25rem;
            }

            .cancel {
                color: ${(props) => (!props.$orderType ? "#e22926" : "#2679ed")};
                background-color: ${(props) => (!props.$orderType ? "#fcdddb" : "#dce9fc")};
            }

            .confirm {
                color: white;
                background-color: ${(props) => (!props.$orderType ? "#e22926" : "#2679ed")};
            }
        }
    }
`;

const ToastMessage = styled.div<OrderTypeProps>`
    display: flex;
    flex-direction: column;
    gap: 7px;
    font-size: 14px;

    .overview {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-weight: 700;
        gap: 6px;
    }

    & img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        padding-bottom: 3px;
    }

    .orderType {
        color: ${(props) => (!props.$orderType ? "#e22926" : "#2679ed")};
    }
`;
