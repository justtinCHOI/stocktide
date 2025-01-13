import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaArrowRight } from 'react-icons/fa';
import { ActiveProps } from '@components/welcome/main/CountryNews';

const earningsData = [
    { company: '애플', quarter: '2024년 1분기', earnings: '1050억 달러' },
    { company: '테슬라', quarter: '2024년 1분기', earnings: '250억 달러' },
    { company: '아마존', quarter: '2024년 1분기', earnings: '850억 달러' },
    { company: '삼성전자', quarter: '2024년 1분기', earnings: '650억 달러' },
    { company: '구글', quarter: '2024년 1분기', earnings: '900억 달러' },
    { company: '마이크로소프트', quarter: '2024년 1분기', earnings: '950억 달러' },
    { company: '페이스북', quarter: '2024년 1분기', earnings: '700억 달러' },
];

const QuarterlyEarnings = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % earningsData.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Section>
            <Title>💼 분기별 실적 발표</Title>
            <EarningsList>
                {earningsData.map((earning, index) => (
                    <EarningsItem key={index} $active={index === currentIndex}>
                        <h3>{earning.company}: {earning.quarter}</h3>
                        <p>{earning.earnings}</p>
                        <MoreLink>
                            더보기 <FaArrowRight />
                        </MoreLink>
                    </EarningsItem>
                ))}
            </EarningsList>
        </Section>
    );
};

export default QuarterlyEarnings;

const Section = styled.section`
    margin-bottom: 20px;
`;

const Title = styled.h2`
    font-size: 1.2rem;
    margin-bottom: 10px;
    font-weight: bold;
`;

const EarningsList = styled.div`
    height: 60px;
    overflow: hidden;
    position: relative;
    border-radius: 10px;
    border: 1px solid lightgray;
    padding: 10px;
`;

const EarningsItem = styled.div<ActiveProps>`
    position: absolute;
    width: 100%;
    opacity: ${({ $active }) => ($active? 1 : 0)};
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
    bottom: 0px;
    right: 20px;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    color: #007bff;
    cursor: pointer;
`;
