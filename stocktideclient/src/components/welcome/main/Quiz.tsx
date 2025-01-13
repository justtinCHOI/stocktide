import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaArrowRight } from 'react-icons/fa';
import { ActiveProps } from '@components/welcome/main/CountryNews';

const quizData = [
    { question: '주식 시장은 언제 개장합니까?', answer: '주식 시장은 월요일부터 금요일까지 오전 9시에 개장합니다.' },
    { question: '주식이란 무엇입니까?', answer: '주식은 회사의 소유권을 나타내는 증권입니다.' },
    { question: 'ETF란 무엇입니까?', answer: 'ETF는 상장지수펀드로, 주식처럼 거래되는 투자 펀드입니다.' },
    { question: '배당금이란 무엇입니까?', answer: '배당금은 회사가 주주들에게 분배하는 이익의 일부입니다.' },
    { question: 'IPO란 무엇입니까?', answer: 'IPO는 기업이 최초로 주식을 공개하는 것을 의미합니다.' },
    { question: '포트폴리오란 무엇입니까?', answer: '포트폴리오는 투자자가 보유한 다양한 자산들의 조합입니다.' },
    { question: '우선주란 무엇입니까?', answer: '우선주는 배당금이나 자산 분배에서 우선권을 가지는 주식입니다.' },
];

const Quiz = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % quizData.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Section>
            <Title>❓ OX 퀴즈 도전하기</Title>
            <QuizList>
                {quizData.map((quiz, index) => (
                    <QuizItem key={index} $active={index === currentIndex}>
                        <h3>{quiz.question}</h3>
                        <p>{quiz.answer}</p>
                        <MoreLink>
                            더보기 <FaArrowRight />
                        </MoreLink>
                    </QuizItem>
                ))}
            </QuizList>
        </Section>
    );
};

export default Quiz;

const Section = styled.section`
    margin-bottom: 20px;
`;

const Title = styled.h2`
    font-size: 1.2rem;
    margin-bottom: 10px;
    font-weight: bold;
`;

const QuizList = styled.div`
    height: 75px;
    overflow: hidden;
    position: relative;
    border-radius: 10px;
    border: 1px solid lightgray;
    padding: 10px;
`;

const QuizItem = styled.div<ActiveProps>`
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
    bottom: -18px;
    right: 20px;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    color: #007bff;
    cursor: pointer;
`;
