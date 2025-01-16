import { FC } from 'react';
import styled from 'styled-components';

interface StockBasicComponentProps {
  companyId: number;
}

const StockBasicComponent: FC<StockBasicComponentProps> = ({companyId}) => {

  const {data: data, isLoading, isError} = useGetStockBasic();

  return (
    <Section>
      <Title>TODO StockBasicComponent {companyId}</Title>
      <NewsList>
        <NewsItem $active={true}>
            <h3>{data.title}</h3>
            <p>{data.content}</p>
        </NewsItem>
      </NewsList>
    </Section>
  );
}

export default StockBasicComponent;

export const Section = styled.section`
    margin-bottom: 20px;
`;

export const Title = styled.h2`
    font-size: 1.2rem;
    margin-bottom: 10px;
    font-weight: bold;
`;

export const NewsList = styled.div`
    height: 80px;
    overflow: hidden;
    position: relative;
    border-radius: 10px;
    border: 1px solid lightgray;
    padding: 10px;
`;

export interface ActiveProps {
  $active: boolean;
}

export const NewsItem = styled.div<ActiveProps>`
    position: absolute;
    width: 100%;
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transition: opacity 1s ease-in-out;
    h3 {
        font-size: 1rem;
    }
    p {
        font-size: 0.7rem;
    }
`;