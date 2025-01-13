import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaArrowRight } from 'react-icons/fa';

const newsData = [
    { title: '미국 경제 성장 둔화', content: '미국 경제는 올해 첫 분기에 둔화되었습니다. 주요 지표에 따르면...' },
    { title: '일본 엔화 약세', content: '일본 엔화는 미국 달러 대비 약세를 보였습니다. 경제적 우려가...' },
    { title: '독일 주식 시장 사상 최고치', content: '독일 주식 시장이 오늘 사상 최고치를 기록했습니다. 투자자들의 낙관적인 전망...' },
    { title: '중국 경제 회복', content: '중국 경제가 팬데믹 이후 빠르게 회복하고 있습니다. 전문가들은...' },
    { title: '영국 브렉시트 영향', content: '영국의 브렉시트가 경제에 미치는 영향이 점차 명확해지고 있습니다...' },
    { title: '프랑스 경제 성장', content: '프랑스 경제는 올해 강한 성장세를 보였습니다. 소비 증가와 함께...' },
    { title: '캐나다 경제 회복', content: '캐나다 경제는 팬데믹 이후 회복세를 보이고 있습니다. 주요 지표들이...' },
];

const CountryNews = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % newsData.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);
    return (
        <Section>
            <Title>🛫 국가별 뉴스</Title>
            <NewsList>
                {newsData.map((news, index) => (
                    <NewsItem key={index} $active={index === currentIndex}>
                        <h3>{news.title}</h3>
                        <p>{news.content}</p>
                        <MoreLink>
                            더보기 <FaArrowRight />
                        </MoreLink>
                    </NewsItem>
                ))}
            </NewsList>
        </Section>
    );
};

export default CountryNews;

const Section = styled.section`
    margin-bottom: 20px;
`;

const Title = styled.h2`
    font-size: 1.2rem;
    margin-bottom: 10px;
    font-weight: bold;
`;

const NewsList = styled.div`
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

const NewsItem = styled.div<ActiveProps>`
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
    bottom: -18px;
    right: 20px;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    color: #007bff;
    cursor: pointer;
`;
