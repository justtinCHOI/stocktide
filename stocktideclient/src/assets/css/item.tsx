import styled from 'styled-components';

export const WatchListContainer = styled.div`
  height: calc(100vh - 53px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

// /** @type {import('styled-components').StyledComponent<'div', any, Header2ContainerProps, never>} */
// export const Header2Container = styled.div`
//   width: 100%;
//   height: ${(props) => (props.isLogin === 0 ? "0px" : "43.5px")};
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border-bottom: ${(props) => (props.isLogin === 0 ? "" : "1px solid black")};
// `;
//
// /** @type {import('styled-components').StyledComponent<'div', any, HoldingsAmountProps, never>} */
// export const HoldingsAmount = styled.div`
//   width: 100%;
//   height: 100%;
//   display: ${(props) => (props.isLogin === 0 ? "none" : "flex")};
//   flex-direction: row;
//   padding-left: 14px;
//   align-items: center;
//   gap: 6.5px;
//   font-size: 0.95em;
//   font-weight: 570;
//   color: black;
//   .amount {
//     color: #2f4f4f;
//   }
// `;

export const StockList = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto; /* 세로 스크롤을 활성화합니다 */

  &::-webkit-scrollbar {
    display: none;
  }
`;

// const Header1Container = styled.div`
//   width: 100%;
//   height: 48px;
//   display: flex;
// `;

// export const Divider = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   /* border-bottom: 1px solid #2f4f4f; */
// `;
