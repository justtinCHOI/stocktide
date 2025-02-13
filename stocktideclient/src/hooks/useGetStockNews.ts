import { useQuery } from '@tanstack/react-query';
import jwtAxios from '@utils/jwtUtil.tsx';

const useGetStockNews = (companyId: number) => {
  return useQuery({
    queryKey: ['stockNews', companyId],
    queryFn: async () => {
      try {
        const response = await jwtAxios.get(`${import.meta.env.VITE_API_URL}/api/company/news/${companyId}`, {
          timeout: 10000, // 10초로 증가
        });
        return response.data;
      } catch (error) {
        console.error('News fetch error:', error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5분 캐시
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export default useGetStockNews;
