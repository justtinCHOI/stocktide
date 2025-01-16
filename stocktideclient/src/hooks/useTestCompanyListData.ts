import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface ApiResponse {
  stck_shrn_iscd: string;
  hts_kor_isnm: string;
  crdt_rate: string;
}

const BASE_URL = import.meta.env.VITE_API_URL;

function useTestCompanyListData() {
  return useQuery({
    queryKey: ['allCompanies'],
    queryFn: async () => {
      try {
        const { data } = await axios.get<ApiResponse[]>(`${BASE_URL}/api/company/domestic/all`);

        if (!data || !Array.isArray(data)) {
          throw new Error('Invalid data format received');
        }

        return data.map((item, index) => ({
          companyId: index + 1,
          code: item.stck_shrn_iscd,
          korName: item.hts_kor_isnm
        }));
      } catch (error) {
        console.error('Error fetching company data:', error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export default useTestCompanyListData;