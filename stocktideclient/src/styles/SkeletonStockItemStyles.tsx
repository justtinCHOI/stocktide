import styled from 'styled-components';

interface SkeletonItemProps {
  $isMobile: boolean;
}

export const SkeletonItem = styled.div<SkeletonItemProps>`
  display: flex;
  padding: ${({ $isMobile }) => ($isMobile ? '8px' : '12px')};
  margin-bottom: 8px;
  background: #f8f9fa;
  border-radius: 8px;
`;

export const SkeletonLogo = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
`;

export const SkeletonContent = styled.div`
  flex: 1;
  margin-left: 12px;
`;

export const SkeletonTitle = styled.div`
  width: 60%;
  height: 16px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  margin-bottom: 8px;
  border-radius: 4px;
`;

export const SkeletonSubtitle = styled.div`
  width: 40%;
  height: 12px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
`;

export const SkeletonPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: auto;
`;

export const SkeletonPriceMain = styled.div`
  width: 80px;
  height: 16px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  margin-bottom: 8px;
  border-radius: 4px;
`;

export const SkeletonPriceSub = styled.div`
  width: 60px;
  height: 12px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
`;

// profit
export const SkeletonHeader = styled.div`
  width: 100%;
  height: 43.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 14px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
`;

export const SkeletonHeaderContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6.5px;
`;

export const SkeletonHeaderText = styled.div`
  width: 120px;
  height: 16px;
  background: #f8f9fa;
  border-radius: 4px;
`;

export const SkeletonHeaderValue = styled.div`
  width: 100px;
  height: 16px;
  background: #f8f9fa;
  border-radius: 4px;
`;
export const SkeletonDetails = styled.div`
 display: flex;
 align-items: center;
 padding: 11px 0;
 width: 100%;
 border-bottom: 1px solid darkgray;
`;

export const SkeletonDetailSection01 = styled.div`
 flex: 1.4 0 0;
 display: flex;
 flex-direction: column;
 gap: 2px;
 padding-left: 12px;
`;

export const SkeletonDetailSection02 = styled.div`
 flex: 4 0 0;  
 display: flex;
 flex-direction: column;
 gap: 2px;
 padding-left: 3px;
`;

export const SkeletonDetailSection03 = styled.div`
 flex: 4 0 0;
 display: flex;
 flex-direction: column; 
 gap: 2px;
 padding-right: 12px;
 align-items: flex-end;
`;

export const SkeletonDetailData = styled.div`
 height: 14px;
 background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
 background-size: 200% 100%;
 animation: shimmer 1.5s infinite;
 border-radius: 4px;
 width: 80%;
`;

