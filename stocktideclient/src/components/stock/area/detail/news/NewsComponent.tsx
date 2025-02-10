import { FC, useState, useMemo } from 'react';
import useGetStockNews from '@hooks/useGetStockNews';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import styled from 'styled-components';
import { SkeletonBox } from '@styles/SkeletonStyles';
import { useTranslation } from 'react-i18next';

interface NewsComponentProps {
  companyId: number;
}

const NewsComponent: FC<NewsComponentProps> = ({companyId}) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading, isError, error, refetch } = useGetStockNews(companyId);

  const newsPerPage = 5;
  const paginatedNews = useMemo(() => {
    if (!data?.output) return [];
    const startIndex = currentPage * newsPerPage;
    return data.output.slice(startIndex, startIndex + newsPerPage);
  }, [data, currentPage]);

  const totalPages = useMemo(() =>
      Math.ceil((data?.output?.length || 0) / newsPerPage),
    [data]
  );

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  if (isLoading) return <LoadingContainer>
    {[...Array(5)].map((_, index) => (
      <SkeletonBox key={index} $height="80px" $width="100%" />
    ))}
  </LoadingContainer>;

  if (isError) return <ErrorContainer>
    <AlertTriangle size={24} color="red" />
    <p>{error?.message || t('news.error.loadFail')}</p>
    <RefreshButton onClick={() => refetch()}>
      <RefreshCw size={16} /> {t('news.error.retry')}
    </RefreshButton>
  </ErrorContainer>;

  return (
    <NewsContainer>
      <NewsHeader>
        <h2>{t('news.title')}</h2>
        <RefreshButton onClick={() => refetch()}>
          <RefreshCw size={16} />
        </RefreshButton>
      </NewsHeader>
      <ScrollContainer>
        {paginatedNews.map((news, index) => (
          <NewsItem key={index}>
            <NewsTitle>{news.hts_pbnt_titl_cntt}</NewsTitle>
            <NewsDetails>
              <span>{news.dorg} &nbsp;  {formatDate(news.data_dt)}</span>
              {/*<ExternalLink size={16} />*/}
              {/*<MoreLink>{t('news.readMore')}</MoreLink>*/}
            </NewsDetails>
          </NewsItem>
        ))}
      </ScrollContainer>

      <PaginationContainer>
        <PaginationButton
          disabled={currentPage === 0}
          onClick={handlePrevPage}
        >
          {t('news.pagination.prev')}
        </PaginationButton>
        <PageIndicator>
          {currentPage + 1} / {totalPages}
        </PageIndicator>
        <PaginationButton
          disabled={currentPage === totalPages - 1}
          onClick={handleNextPage}
        >
          {t('news.pagination.next')}
        </PaginationButton>
      </PaginationContainer>
    </NewsContainer>
  );
};

// 날짜 포맷 함수
const formatDate = (dateString: string) => {
  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);
  return `${year}-${month}-${day}`;
};

const NewsContainer = styled.div`
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
`;

const ScrollContainer = styled.main`
    height: calc(100vh - 340px);
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const NewsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`;

const NewsItem = styled.div`
    background-color: white;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.02);
    }
`;

const NewsTitle = styled.h3`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
`;

const NewsDetails = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #666;
    font-size: 12px;
    margin-bottom: 8px;
`;

const PaginationContainer = styled.div`
    position: relative;
    //bottom: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
`;

const PaginationButton = styled.button`
    background-color: #f0f0f0;
    border: none;
    padding: 8px 16px;
    margin: 0 10px;
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const PageIndicator = styled.span`
    font-size: 14px;
    color: #666;
`;

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
`;

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #fff0f0;
    border-radius: 8px;
`;

const RefreshButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
`;

export default NewsComponent;