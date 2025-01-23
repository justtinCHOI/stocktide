import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
`;

interface SkeletonProps {
  $isMobile: boolean;
}

export const SkeletonAccountContainer = styled.div`
    padding: 20px;
`;

export const SkeletonAccountCard = styled.div<SkeletonProps>`
    margin-bottom: 16px;
    padding: ${({ $isMobile }) => ($isMobile ? '12px' : '16px')};
    background: #f8f9fa;
    border-radius: 8px;
`;

export const SkeletonAccountInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const SkeletonAccountNumber = styled.div`
    height: 20px;
    width: 60%;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: ${shimmer} 1.5s infinite;
    border-radius: 4px;
`;

export const SkeletonBalance = styled.div`
    height: 24px;
    width: 40%;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: ${shimmer} 1.5s infinite;
    border-radius: 4px;
`;

export const SkeletonButtons = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 16px;
`;

export const SkeletonButton = styled.div`
    height: 36px;
    flex: 1;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: ${shimmer} 1.5s infinite;
    border-radius: 4px;
`;

// ChargeComponent

// SkeletonAccountStyles.tsx에 추가
export const SkeletonChargeContainer = styled.div`
  padding: 20px;
`;

export const SkeletonChargeSection = styled.div`
  margin-bottom: 16px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const SkeletonChargeRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
`;

export const SkeletonChargeLabel = styled.div`
  width: 30%;
  height: 24px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

export const SkeletonChargeValue = styled.div`
  width: 60%;
  height: 24px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;


// ExchangeComponent

export const SkeletonExchangeContainer = styled.div`
  padding: 20px;
`;

export const SkeletonExchangeSection = styled.div`
  margin-bottom: 16px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const SkeletonExchangeRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
`;

export const SkeletonExchangeLabel = styled.div`
  width: 30%;
  height: 24px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

export const SkeletonExchangeValue = styled.div`
  width: 60%;
  height: 24px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;