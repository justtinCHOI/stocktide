import { useQuery } from "@tanstack/react-query";
import jwtAxios from "@utils/jwtUtil";
import { API_SERVER_HOST } from "@api/memberApi";
import { StockHoldResponseDto } from '@typings/dto'
import useCustomMember from '@hooks/useCustomMember';

const host = `${API_SERVER_HOST}/api/stock`;

const getHoldingStock = async (companyId: number): Promise<StockHoldResponseDto[]> => {
    const response = await jwtAxios.get(`${host}/stockholds`, { params: { companyId } });
    return response.data;
};

const useGetHoldingStock = (companyId: number) => {
    const { isLogin } = useCustomMember();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['holdingStocks', companyId],
        queryFn: () => getHoldingStock(companyId),
        enabled: isLogin,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: true
    });

    return { holdingStockData: data, holdingStockLoading: isLoading, holdingStockError: isError };
};

export default useGetHoldingStock;
