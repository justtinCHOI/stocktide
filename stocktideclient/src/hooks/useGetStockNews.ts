import { useQuery } from '@tanstack/react-query';
import jwtAxios from '@utils/jwtUtil.tsx';
import { StockNewsDto } from '@typings/company';

const fetchStockNews = async (companyId: number): Promise<StockNewsDto> => {
  const response = await jwtAxios.get(`${import.meta.env.VITE_API_URL}/api/company/news/${companyId}`);
  return response.data;
};

const useGetStockNews = (companyId: number) => {
  return useQuery({
    queryKey: ['stockNews', companyId],
    queryFn: () => fetchStockNews(companyId),
    staleTime: 1000 * 60 * 5, // 5분 캐시
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export default useGetStockNews;