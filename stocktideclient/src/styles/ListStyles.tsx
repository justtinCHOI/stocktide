import styled from 'styled-components';

export const ListContainer = styled.div`
  height: calc(100vh - 53px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const StockList = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto; /* 세로 스크롤을 활성화합니다 */

  &::-webkit-scrollbar {
    display: none;
  }
`;

