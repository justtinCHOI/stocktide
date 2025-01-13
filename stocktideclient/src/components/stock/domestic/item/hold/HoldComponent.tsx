// import { useState } from "react";
// import styled from "styled-components";
// import StockItem from "./StockItem";
// import useGetHoldingStock from "@hooks/useGetHoldingStock";
// import useCompanyData from "@hooks/useCompanyData";
// import LoginRequestIndicator from "@common/LoginRequestIndicator";
// import useCustomMember from "@hooks/useCustomMember";
//
// const evaluationProfitText = "평가 수익금";
// const profitUnit = "원";

const HoldingComponent = () => {

    // const isLogin = useCustomMember();
    //
    // // const [isMenuOpen, setMenuOpen] = useState(false);
    //
    // const [showChangePrice, setShowChangePrice] = useState(false);
    //
    // const {stockHolds, stockHoldsLoading: isLoading, stockHoldsError: isError,
    // } = useGetHoldingStock();
    //
    // const {data: companyData, isLoading: isCompanyDataLoading, isError: isCompanyDataError,
    // } = useCompanyData(2, 15);
    //
    // // let totalEvaluationProfit = 0;
    // //
    // // if (Array.isArray(stockHolds) && stockHolds.length > 0) {
    // //     totalEvaluationProfit = stockHolds.reduce(
    // //         (sum, stockHold) => sum + stockHold.stockReturn,
    // //         0
    // //     );
    // // }

    return (
        <></>
        // <WatchListContainer>
        //     {/*<Header2Container>*/}
        //     {/*    <EvaluationProfit profit={totalEvaluationProfit}>*/}
        //     {/*        <div className="profitText">{evaluationProfitText}</div>*/}
        //     {/*        <div className="profit">*/}
        //     {/*            {totalEvaluationProfit.toLocaleString()} {profitUnit}*/}
        //     {/*        </div>*/}
        //     {/*    </EvaluationProfit>*/}
        //     {/*</Header2Container>*/}
        //     <StockList>
        //         {isLogin === 0 ? (
        //             <LoginRequestIndicator/>
        //         ) : isLoading || isCompanyDataLoading ? (
        //             <div></div>
        //         ) : isError || isCompanyDataError ? (
        //             <div>Error fetching data</div>
        //         ) : (
        //             Array.isArray(stockHolds) &&
        //             stockHolds.length > 0 &&
        //             stockHolds.map((stockHold) => {
        //                 const matchedCompany = companyData
        //                     ? companyData.find(
        //                         (company) => company.companyId === stockHold.companyId
        //                     )
        //                     : undefined;
        //
        //                 return matchedCompany ? (
        //                     <StockItem
        //                         key={stockHold.companyId}
        //                         stockData={stockHold}
        //                         companyData={matchedCompany}
        //                         setShowChangePrice={setShowChangePrice}
        //                         showChangePrice={showChangePrice}
        //                     />
        //                 ) : null;
        //             })
        //         )}
        //     </StockList>
        // </WatchListContainer>
    );
};

export default HoldingComponent;
//
// const WatchListContainer = styled.div`
//   width: 100%;
//   height: calc(100vh - 53px);
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
// `;
//
// // const Header2Container = styled.div`
// //   width: 100%;
// //   height: 43.5px;
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// // `;
//
// // const EvaluationProfit = styled.div`
// //     width: 100%;
// //     height: 100%;
// //     display: flex;
// //     flex-direction: row;
// //     align-items: center;
// //     font-size: 0.95em;
// //     font-weight: 570;
// //     gap: 6.5px;
// //     padding-left: 14px;
// //     text-align: "center";
// //     color: ${(props) =>
// //             props.profit === 0 ? "#000" : props.profit > 0 ? "#e22926" : "#2679ed"};
// //     border-bottom: 1px solid black;
// //
// //     .profitText {
// //         color: black;
// //     }
// //
// //     .profit {
// //         color: #2f4f4f;
// //     }
// // `;
//
// const StockList = styled.div`
//     height: 100%;
//     width: 100%;
//     overflow-y: auto;
//
//     &::-webkit-scrollbar {
//         display: none;
//     }
// `;
