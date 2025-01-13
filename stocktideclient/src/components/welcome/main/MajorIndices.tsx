import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaArrowRight } from 'react-icons/fa';
import { ActiveProps } from '@components/welcome/main/CountryNews';

const indicesData = [
    { name: 'S&P 500', value: '4,300' },
    { name: 'Dow Jones', value: '34,000' },
    { name: 'NASDAQ', value: '13,500' },
    { name: 'Nikkei 225', value: '29,000' },
    { name: 'DAX', value: '15,500' },
    { name: 'FTSE 100', value: '7,200' },
    { name: 'CAC 40', value: '6,500' },
];

const MajorIndices = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % indicesData.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Section>
            <Title>📊 주요지수</Title>
            <IndicesList>
                {indicesData.map((index, idx) => (
                    <IndexItem key={idx} $active={idx === currentIndex}>
                        <h3>{index.name}</h3>
                        <p>{index.value}</p>
                        <MoreLink>
                            더보기 <FaArrowRight />
                        </MoreLink>
                    </IndexItem>
                ))}
            </IndicesList>
        </Section>
    );
};

export default MajorIndices;

const Section = styled.section`
    margin-bottom: 20px;
`;

const Title = styled.h2`
    font-size: 1.2rem;
    margin-bottom: 10px;
    font-weight: bold;
`;

const IndicesList = styled.div`
    height: 60px;
    overflow: hidden;
    position: relative;
    border-radius: 10px;
    border: 1px solid lightgray;
    padding: 10px;
`;

const IndexItem = styled.div<ActiveProps>`
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
