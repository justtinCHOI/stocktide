import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { StockBalanceDto } from '@typings/company';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const fetchStockBalance = async (companyId: number): Promise<StockBalanceDto> => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/company/balance/${companyId}`
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch balance data: ${error.response?.data?.message || error.message}`);
    }
    throw error;
  }
};

const useStockBalance = (companyId: number) => {
  const query = useQuery({
    queryKey: ['stockBalance', companyId],
    queryFn: () => fetchStockBalance(companyId),
    staleTime: 1000 * 60 * 5, // 5분 캐시
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  useEffect(() => {
    if (query.error) {
      toast.error(`데이터 로딩 실패: ${query.error.message}`);
    }
  }, [query.error]);

  return query;
};

export default useStockBalance;