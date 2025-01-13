import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaArrowRight } from 'react-icons/fa';
import { ActiveProps } from '@components/welcome/main/CountryNews';

const rankingData = [
    { rank: 1, company: '애플', value: '2.3조 달러' },
    { rank: 2, company: '마이크로소프트', value: '2.1조 달러' },
    { rank: 3, company: '사우디 아람코', value: '1.9조 달러' },
    { rank: 4, company: '아마존', value: '1.7조 달러' },
    { rank: 5, company: '알파벳', value: '1.6조 달러' },
    { rank: 6, company: '테슬라', value: '1.2조 달러' },
    { rank: 7, company: '버크셔 해서웨이', value: '8000억 달러' },
];

const StockRanking = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % rankingData.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Section>
            <Title>📈 종목 순위</Title>
            <RankingList>
                {rankingData.map((stock, index) => (
                    <RankingItem key={index} $active={index === currentIndex}>
                        <h3>Rank {stock.rank}: {stock.company}</h3>
                        <p>Market Value: {stock.value}</p>
                        <MoreLink>
                            더보기 <FaArrowRight />
                        </MoreLink>
                    </RankingItem>
                ))}
            </RankingList>
        </Section>
    );
};

export default StockRanking;

const Section = styled.section`
    margin-bottom: 20px;
`;

const Title = styled.h2`
    font-size: 1.2rem;
    margin-bottom: 10px;
    font-weight: bold;
`;

const RankingList = styled.div`
    height: 60px;
    overflow: hidden;
    position: relative;
    border-radius: 10px;
    border: 1px solid lightgray;
    padding: 10px;
`;

const RankingItem = styled.div<ActiveProps>`
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

const MoreLink = styled.div`
    position: absolute;
    bottom: 0;
    right: 20px;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    color: #007bff;
    cursor: pointer;
`;
