import styled from 'styled-components';

export const Section = styled.section`
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
`;

export const TitleRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

export const Title = styled.h2`
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
`;

export const InfoContainer = styled.div<{ $isMobile?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: ${({ $isMobile }) => ($isMobile ? '8px' : '16px')};
`;

export const InfoRow = styled.div<{ $isMobile?: boolean }>`
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #eee;
    flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
    gap: ${({ $isMobile }) => ($isMobile ? '4px' : '0')};
`;

export const Label = styled.span`
    color: #666;
    font-size: 0.9rem;
`;

export const Value = styled.span`
    color: #333;
    font-weight: 500;
    text-align: right;
`;

export const ErrorContainer = styled.div`
    text-align: center;
    padding: 20px;
    background-color: #fff3f3;
    border-radius: 8px;
    border: 1px solid #ffcdd2;
`;

export const ErrorMessage = styled.p`
    color: #e74c3c;
    margin-bottom: 12px;
`;

interface RefreshButtonProps {
  $isRefreshing?: boolean;
}

export const RefreshButton = styled.button<RefreshButtonProps>`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    background-color: #f5f5f5;
    color: #666;
    cursor: pointer;
    transition: all 0.2s ease;

    svg {
        animation: ${({ $isRefreshing }) =>
  $isRefreshing ? 'spin 1s linear infinite' : 'none'};
    }

    &:hover {
        background-color: #eeeeee;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.7;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;


export const ChartContainer = styled.div`
  margin: 20px 0;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 8px;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
`;

export const AnalysisContainer = styled.div`
  margin-top: 20px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
`;

export const AnalysisTitle = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 12px;
`;

export const AnalysisGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
`;

export const AnalysisItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StatusBadge = styled.span<{ $status: string }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  background-color: ${({ $status }) =>
  $status === 'high' ? '#e6ffe6' :
    $status === 'medium' ? '#fff3e6' :
      $status === 'low' ? '#ffe6e6' : '#f8f9fa'};
  color: ${({ $status }) =>
  $status === 'high' ? '#2e7d32' :
    $status === 'medium' ? '#ed6c02' :
      $status === 'low' ? '#d32f2f' : '#666'};
`;

export const RecommendationList = styled.div`
  margin-top: 16px;
`;

export const RecommendationItem = styled.div`
  padding: 8px 0;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
`;



export const NoDataMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
  background: #f8f9fa;
  border-radius: 8px;
  margin: 20px 0;
`;