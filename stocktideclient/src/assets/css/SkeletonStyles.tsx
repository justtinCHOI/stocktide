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