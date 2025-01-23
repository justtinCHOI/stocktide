import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const SkeletonBuyContainer = styled.div`
  padding: 20px;
`;

export const SkeletonStockHeader = styled.div`
  width: 100%;
  height: 64px;
  background: #f8f9fa;
  padding: 7px 16px 8px;
  display: flex;
  align-items: center;
  gap: 9px;
`;

export const SkeletonLogo = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

export const SkeletonInfo = styled.div`
  height: 40px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SkeletonTitle = styled.div`
  width: 120px;
  height: 16px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

export const SkeletonSubtitle = styled.div`
  width: 80px;
  height: 12px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

export const SkeletonPrice = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SkeletonPriceValue = styled.div`
  width: 100px;
  height: 19px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;