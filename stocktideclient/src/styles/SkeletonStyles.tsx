import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export interface SkeletonProps {
  $height: string;
  $width: string;
}


export const SkeletonBox = styled.div<SkeletonProps>`
    background: #f6f7f8 linear-gradient(
            to right,
            #f6f7f8 0%,
            #edeef1 20%,
            #f6f7f8 40%,
            #f6f7f8 100%
    ) no-repeat;
    background-size: 800px 104px;
    display: inline-block;
    position: relative;
    animation: ${shimmer} 1.2s ease-in-out infinite;
    height: ${props => props.$height || '20px'};
    width: ${props => props.$width || '100%'};
    border-radius: 4px;
    margin: 4px 0;
`;